import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import UserDataDetails from "../Views/ProfileDetails.js"; // Ensure the path is correct
import "./Feedback.css";
import Api from "../../Api.js";
import Loader from "../Loader/Loader.js";


export default function Feedback() {
  const [isVisible, setIsVisible] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const handleScroll = () => {
      const feedbackSection = document.getElementById("Feedback");
      if (feedbackSection) {
        const { top } = feedbackSection.getBoundingClientRect();
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${Api}/Feedback`);
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          );
        } else {
          console.error("Failed to fetch feedback data");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }finally {
        setLoading(false); // Deactivate loader after the process is complete
      }
    };

    fetchFeedbackData();
  }, []);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const postedTime = new Date(timestamp);
    const timeDiff = now.getTime() - postedTime.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };

  const handleFeedbackClick = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setOverlayVisible(true);
  };

  const handleClose = () => {
    setSelectedFeedbackId(null);
    setOverlayVisible(false);
  };

  return (
    <>
    {loading ? <Loader /> : (
    <div id="Feedback">
      <section className={`feedback-section ${isVisible ? "visible" : ""}`}>
        <MDBContainer className="py-2">
          <MDBRow className="justify-content-center">
            <MDBCol  >
              <div className="feedback-grid">
                <div className="d-flex flex-wrap">
                  {feedbackData.map((feedbackItem) => (
                    <div
                      key={feedbackItem._id}
                      className="comment-card"
                      onClick={() => handleFeedbackClick(feedbackItem._id)}
                    >
                      <img
                        className="rounded-circle shadow-1-strong me-3"
                        src={`data:image/png;base64,${feedbackItem.userData.image}`}
                        alt="avatar"
                        width="65"
                        height="65"
                      />
                      <MDBCard className="w-100">
                        <MDBCardBody className="p-4">
                          <div>
                            <MDBTypography tag="h5">
                              {feedbackItem.userData.username}
                            </MDBTypography>
                            <p className="small">
                              {getTimeAgo(feedbackItem.createdAt)}
                            </p>
                            <p>{feedbackItem.feedback}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <a href="#!" className="link-muted me-2">
                                  <MDBIcon fas icon="thumbs-up me-1" />
                                  {feedbackItem.likes}
                                </a>
                                <a href="#!" className="link-muted">
                                  <MDBIcon fas icon="thumbs-down me-1" />
                                  {feedbackItem.dislikes}
                                </a>
                              </div>
                              <a href="#!" className="link-muted">
                                <MDBIcon fas icon="reply me-1" /> Reply
                              </a>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    </div>
                  ))}
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      {overlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <UserDataDetails user={selectedFeedbackId} onClose={handleClose} />
          </div>
        </div>
      )}
    </div>
  )}
  </>
  );
}
