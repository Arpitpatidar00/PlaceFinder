import React, { useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import axios from "axios";
import { useSelector } from "react-redux";

const DefaultComponent = ({ placeName }) => {
  const { userData } = useSelector((state) => state.auth);
  const placeId = useSelector((state) => state.place.placeId);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!userData || !placeName || !placeId) {
    return <div>Loading...</div>;
  }

  const handlePostComment = async (commentData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Extract necessary data from the commentData
      const { text, userId, comId, avatarUrl, userProfile, fullName } = commentData;

      const response = await axios.post("http://localhost:4000/comments", {
        text,
        userId,
        comId,
        avatarUrl,
        userProfile,
        fullName,
        placeName, // Include placeName in the payload
        placeId,   // Include placeId in the payload
      });

      if (response.status !== 201) {
        throw new Error("Failed to post comment");
      }

      // Optionally, handle the successful post here
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <CommentSection
        currentUser={{
          currentUserId: userData.userId,
          currentUserImg: `data:image/jpeg;base64,${userData.image}`, // Display base64 image correctly
          currentUserProfile: `data:image/jpeg;base64,${userData.image}`, // Display base64 image correctly
          currentUserFullName: userData.username,
        }}
        logIn={{
          loginLink: "http://localhost:3001/login",
          signupLink: "http://localhost:3001/",
        }}
        onSubmitAction={handlePostComment}
      />
    </div>
  );
};

export default DefaultComponent;
