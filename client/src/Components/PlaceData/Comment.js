import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './CommentSection.css'; // Create a CSS file for styling

const CommentSection = ({ placeName }) => {
  const { userData } = useSelector((state) => state.auth);
  const placeId = useSelector((state) => state.place.placeId);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (placeId) {
      fetchComments();
    }
  }, [placeId]);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:4000/comments');
      const filteredComments = response.data.filter(comment => comment.placeId === placeId);
      setComments(filteredComments);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/comments', {
        text: newComment,
        userId: userData.userId,
        avatarUrl: `data:image/jpeg;base64,${userData.image}`,
        userProfile: `data:image/jpeg;base64,${userData.image}`,
        fullName: userData.username,
        placeName,
        placeId,
      });

      if (response.status !== 201) {
        throw new Error('Failed to post comment');
      }

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData || !placeName || !placeId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comment-section">
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      <div className="comment-input">
        <img src={`data:image/jpeg;base64,${userData.image}`} alt="User avatar" />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handlePostComment} disabled={isLoading}>
          Post Comment
        </button>
      </div>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <img src={comment.avatarUrl} alt="avatar" />
            <div className="comment-content">
              <div className="comment-author">{comment.fullName}</div>
              <div className="comment-text">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
