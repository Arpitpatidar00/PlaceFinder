import React, { useEffect } from "react";
import axios from "axios";
import { TERipple } from 'tw-elements-react';
import "./admin.css";
import { useAdmin } from "../../Context/AdminContext";
import Api from '../../Api.js';

function Feedbackcontroller() {
  const { feedback, setFeedback } = useAdmin();

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await axios.get(`${Api}/Feedback`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchFeedback();
  }, [setFeedback]);

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
    try {
      await axios.delete(`${Api}/Feedback/${id}`);
      const updatedfeedback = feedback.filter((feedback) => feedback._id !== id);
      setFeedback(updatedfeedback);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
  };

  return (
    <>
      <h1 className="m-3">Feedback</h1>
      <hr className="bg-black m-3" />
   
      <div id="allcommentscontainer" className="comment-container-wrapper">
        {Array.isArray(feedback) &&
          feedback.length > 0 &&
          feedback.map((feedback) => (
            <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mt-6 w-96" key={feedback._id}>
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {feedback.feedback}
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {feedback.feedback}
              </p>
              <TERipple>
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => handleDeleteComment(feedback._id)}
                >
                  Delete
                </button>
              </TERipple>
            </div>
          ))}
      </div>
    </>
  );
}

export default Feedbackcontroller;
