import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UserDataDetails from '../Views/ProfileDetails';
import './CommentSection.css';
import Api from '../../Api';

const CommentSection = ({ placeName }) => {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const placeId = useSelector((state) => state.place.placeId);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    // Clear previous comments
    setComments([]);

    try {
      const response = await axios.get(`${Api}/comments`, {
        params: { placeId }
      });

      if (response.status === 200) {
        setComments(response.data);
      } else {
        throw new Error('Failed to fetch comments');
      }
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        setError('Network error. Please try again later.');
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [placeId]);

  useEffect(() => {
    // Fetch comments when the component mounts or when placeId changes
    if (placeId) {
      fetchComments();
    }
  }, [fetchComments, placeId]);

  const handlePostComment = async () => {
    if (!newComment) return;
  
    setIsLoading(true);
    setError(null);
  
    const newCommentObj = {
      text: newComment,
      userId: userData._id,
      placeId,
    };
  
    // Optimistically update the comments state
    const optimisticComment = {
      _id: Date.now(), // Temporary ID for optimistic UI
      ...newCommentObj,
      avatarUrl: userData.profileImage || 'defaultImage.jpg',
      fullName: userData.name || 'Unknown User',
    };
  
    setComments(prevComments => [...prevComments, optimisticComment]);
    setNewComment('');
  
    try {
      const response = await axios.post(`${Api}/comments`, newCommentObj);
  
      if (response.status === 201) {
        // Use the complete data returned from the server
        const serverComment = response.data; // Assuming the server returns the full comment object
        setComments(prevComments => prevComments.map(comment => 
          comment._id === optimisticComment._id ? serverComment : comment
        ));
        // Refresh comments to ensure the latest data
        fetchComments();
      } else {
        throw new Error('Failed to post comment');
      }
    } catch (error) {
      setError(error.message);
      // Roll back optimistic update in case of error
      setComments(prevComments => prevComments.filter(comment => comment._id !== optimisticComment._id));
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData || !placeName || !placeId) {
    return <div>Loading...</div>;
  }

  const handleCommentClick = (comment) => {
    setSelectedUser(comment);
    setOverlayVisible(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOverlayVisible(false);
  };

  return (
    <div>
      <div className="comment-section">
        {isLoading && <div>Loading...</div>}
        {error && <div className="error">Error: {error}</div>}

        <div className="comment-input">
          <img src={userData.profileImage} alt="User avatar" />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            aria-label="Comment input"
          />
          <button onClick={handlePostComment} disabled={isLoading}>
            Post Comment
          </button>
        </div>

        {overlayVisible && (
          <UserDataDetails user={selectedUser} onClose={handleClose} />
        )}
      </div>
      <div className="comments-list">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="comment"
            onClick={() => handleCommentClick(comment)}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && handleCommentClick(comment)}
          >
            <img src={comment.user?.profileImage || 'defaultImage.jpg'} alt="avatar" />
            <div className="comment-content">
              <div className="comment-author">{comment.user?.name || 'Unknown User'}</div>
              <div className="comment-text">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
