import React, { useEffect, useState } from "react";
import axios from "axios";
import { TERipple } from 'tw-elements-react';
import "./admin.css";
import { useAdmin } from "../../Context/AdminContext";
import Api from '../../Api.js';
import Loader from '../../Components/Loader/Loader.js' 
function Feedbackcontroller() {
  const { feedback, setFeedback } = useAdmin(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeedback() {
      setLoading(true);
      try {
        const response = await axios.get(`${Api}/Feedback`);
        setFeedback(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load feedback. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchFeedback();
  }, [setFeedback]);

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios.delete(`${Api}/Feedback/${id}`);
        const updatedFeedback = feedback.filter((item) => item._id !== id);
        setFeedback(updatedFeedback);
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete feedback. Please try again.");
      }
    }
  };

  if (loading) return <div><Loader/> feedback...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="m-3">Feedback</h1>
      <hr className="bg-black m-3" />
      <div id="allcommentscontainer" className="comment-container-wrapper">
        {Array.isArray(feedback) && feedback.length > 0 ? (
          feedback.map((item) => (
            <div className="block rounded-lg bg-white p-6 shadow-md dark:bg-neutral-700 mt-6 w-96" key={item._id}>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {item.feedback}
              </h5>
              <TERipple>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700"
                  onClick={() => handleDeleteComment(item._id)}
                  aria-label="Delete feedback"
                >
                  Delete Feedback
                </button>
              </TERipple>
            </div>
          ))
        ) : (
          <p>No feedback available at the moment.</p>
        )}
      </div>
    </>
  );
}

export default Feedbackcontroller;
