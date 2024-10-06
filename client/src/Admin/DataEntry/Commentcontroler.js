import React, { useEffect, useState } from "react";
import axios from "axios";
import { TERipple } from 'tw-elements-react';
import "./admin.css";
import { useAdmin } from "../../Context/AdminContext";
import Api from '../../Api.js';
import Loader from "../../Components/Loader/Loader.js";

function CommentControl() {
  const { comments, setComments } = useAdmin(); // Correct usage of useAdmin hook
  const [loading, setLoading] = useState(true); // useState import needed

  useEffect(() => {
    async function fetchComments() {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await axios.get(`${Api}/comments/all`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    }

    fetchComments();
  }, [setComments]);

  const handleDeleteComment = async (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await axios.delete(`${Api}/comments/${id}`);
        const updatedComments = comments.filter((comment) => comment._id !== id);
        setComments(updatedComments);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  return (
    <>
      <h1 className="m-3">Comments</h1>
      <hr className="bg-black m-3" />

      {/* Show loader while loading */}
      {loading ? (
        <Loader />
      ) : (
        <div id="allcommentscontainer" className="comment-container-wrapper">
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((comment) => (
              <div
                className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 mt-6 w-96"
                key={comment._id}
              >
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {comment.placeName}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  {comment.text}
                </p>
                <TERipple>
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </TERipple>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      )}
    </>
  );
}

export default CommentControl;
