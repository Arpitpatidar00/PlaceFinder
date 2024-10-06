import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./FeedbackDetails.css";
import Api from '../../Api.js';
import Loader from "../Loader/Loader.js"; // Assuming you have a Loader component

export default function UserDataDetails({ user, onClose }) {
  const [userData, setUserData] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await fetch(`${Api}/Feedback/onlyone${user}`);

        if (response.ok) {
          const data = await response.json();
          setUserData(data.userData);

          if (data.userData._id) {
            const imageResponse = await axios.get(`${Api}/upload/user/${data.userData._id}`);
            setUserImages(imageResponse.data);
          }
        } else {
          console.error("Failed to fetch feedback details");
        }
      } catch (error) {
        console.error("Error fetching feedback details:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleModal = () => {
    setSelectedImage(null);
  };

  const displayedImages = useMemo(
    () => (showAllImages ? userImages : userImages.slice(0, 5)),
    [showAllImages, userImages]
  );

  // If loading, show the Loader component
  if (loading) {
    return <Loader />; // Display Loader component while fetching data
  }

  // Return null if no user data exists after loading is complete
  if (!userData) {
    return null;
  }

  return (
    <>
      <div className="btn-close" onClick={onClose}></div>

      <div className="container-profile">
        <div className="profile-header items-center mb-8">
          <div className="profile-image mr-40">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="profile-info flex-grow">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <div className="stats mt-2">
              <div className="stat text-lg">
                <span className="font-bold">{userImages.length}</span>
                <span> Photos</span>
              </div>
              <h1 className="text-2xl font-bold">{userData.bio}</h1>
            </div>
          </div>
        </div>
        <div className="photos-section">
          <div className="photos-header mb-2">
            <button className="show-all-link text-blue-500" onClick={handleShowAllImages}>
              {showAllImages ? "Show less" : "Show all"}
            </button>
          </div>
          <div className="photos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedImages.map((image) => (
              <div key={image.id} className="photo-item">
                <img
                  src={image.imageString}
                  alt="User Upload"
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content">
            <div className="btn-close" onClick={toggleModal}></div>
            <img src={selectedImage.url} alt="Selected" className="w-full h-auto object-cover" />
          </div>
        </div>
      )}
    </>
  );
}
