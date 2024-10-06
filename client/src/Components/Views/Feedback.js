import React, { useState } from 'react';
import './feedbackComplite.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../../Api';
import { useAuth } from '../../Context/AuthContext';

const Feedback = ({ onFeedbackSubmit }) => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;    
    const [feedbackText, setFeedbackText] = useState('');
    const { setfeedback } = useAuth(false); // Ensure this is used correctly

    const handleFeedbackChange = (event) => {
        setFeedbackText(event.target.value);
    };

    const handleSubmitFeedback = async () => {
        if (!feedbackText) {
            toast.error('Feedback cannot be empty!');
            return;
        }

        try {
            const response = await fetch(`${Api}/Feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedback: feedbackText, userData }),
            });

            if (response.ok) {
                const newFeedback = await response.json(); // Assuming the API returns the new feedback object
                toast.success('Feedback sent successfully!');
                setFeedbackText(''); // Clear the textarea
                onFeedbackSubmit(newFeedback); // Update feedback list
                setfeedback(true); // Update context or state as needed
            } else {
                console.error('Failed to send feedback');
                toast.error('Failed to send feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            toast.error('Error sending feedback. Please check your connection.');
        }
    };

    return (
        <div className="feedback-container">
            <div className="image-section">
                <img
                    src='https://media.istockphoto.com/id/1096035138/photo/beautiful-young-couple-relaxing-after-hiking-and-taking-a-break.jpg?s=612x612&w=0&k=20&c=iwNan7K7gbiIl2unv-9EuE5Yej-h_l1OrLNMel0husU='
                    alt="Feedback"
                />
            </div>
            <div className="feedback-section">
                <h1 className="feedback-title">Send Feedback</h1>
                <textarea
                    placeholder="Your feedback..."
                    className="feedback-textarea"
                    value={feedbackText}
                    onChange={handleFeedbackChange}
                />
                <button className="send-btn" onClick={handleSubmitFeedback}>Send Feedback</button>
            </div>
        </div>
    );
};

export default Feedback;
