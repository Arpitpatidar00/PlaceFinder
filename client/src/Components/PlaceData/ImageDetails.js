import React, { useState, useEffect } from "react";
import Comment from "./Comment.js";
import "./Placedata.css";
import { RiImageAddFill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import Driver from "./Driver/Driver.js";
import Guide from "./Guide/Guide.js";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAuth } from "../../Context/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from '../../Api.js';
import Loader from '../Loader/Loader.js'

const ImageDetails = () => {
  const { searchData, setCommentData } = useAuth();
  const navigate = useNavigate();

  const placeId = useSelector((state) => state.place.placeId);
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [ setSelectedImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [showGuideProfile, setShowGuideProfile] = useState(false);
  const [showDriverProfile, setShowDriverProfile] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [imagesLoading, setImagesLoading] = useState(true); // For uploaded images

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${Api}/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch comment data");
        }
        const data = await response.json();
        setCommentData(data);
        setLoading(false); // Turn off loader after fetching comments
      } catch (error) {
        console.error("Error fetching comment data:", error);
        setLoading(false); // Handle error state
      }
    };
    fetchData();
  }, [placeId, setCommentData]);

  useEffect(() => {
    const selectedImageData = searchData.find((image) => image._id === placeId);
    setSelectedData(selectedImageData);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${Api}/add/${placeId}`);
        if (response.data) {
          setSelectedData(response.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
        setLoading(false); // Turn off loader after fetching place data
      } catch (error) {
        console.error("Error fetching data for selected id:", error);
        setLoading(false); // Handle error state
      }
    };

    fetchData();
  }, [placeId, searchData]);

  useEffect(() => {
    const fetchUploadedImages = async () => {
      try {
        setImagesLoading(true); // Show loader for uploaded images
        const response = await axios.get(`${Api}/upload/uploadedImages`);
        setUploadedImages(response.data);
        setImagesLoading(false); // Hide loader after images load
      } catch (error) {
        console.error("Error fetching uploaded images:", error);
        setImagesLoading(false); // Handle error state
      }
    };

    fetchUploadedImages();
  }, []);

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        try {
          const response = await axios.post(`${Api}/upload`, {
            imageString: base64Image,
            placeId: placeId,
            userData: userData,
          });
          if (response.status === 200) {
            setSelectedImage(base64Image); 
            const updatedImages = await axios.get(`${Api}/upload/uploadedImages`);
            setUploadedImages(updatedImages.data); // Update uploaded images
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    localStorage.removeItem("placeId");
    navigate("/home");
  };

  const handleGuideClick = () => {
    if (userData.role === "driver") {
      toast.error("Login as user to view guide profile");
    } else {
      setShowGuideProfile(!showGuideProfile);
    }
  };

  const handleDriverClick = () => {
    if (userData.role === "guide") {
      toast.error("Login as user to view driver profile");
    } else {
      setShowDriverProfile(!showDriverProfile);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="placecontainer">
        <div id="back" onClick={handleBack}>
          <IoIosArrowRoundBack />
        </div>

        <div className="image-container">
          {loading ? (
            <Loader />
          ) : (
            <img src={selectedData.image} alt="Cardimage" className="card-image" />
          )}
          <h1 className="place-name">
            {loading ? <Loader /> : selectedData.placeName}
          </h1>
        </div>

        <div id="place">
          <h1 className="cityname">
            {loading ? <Loader /> : selectedData.cityName}
          </h1>
          <h1 className="title">
            {loading ? <Loader /> : selectedData.title}
          </h1>
          <h1 className="description">
            {loading ? <Loader /> : selectedData.description}
          </h1>

          <div id="guide-driver">
            <div className="Guide">
              <h1 onClick={handleGuideClick}>Guide</h1>
              {showGuideProfile && (
                <div className="profile-box">
                  <Guide />
                  <button onClick={() => setShowGuideProfile(false)}>
                    <GrFormClose />
                  </button>
                </div>
              )}
            </div>

            <div className="Driver">
              <h1 onClick={handleDriverClick}>Driver</h1>
              {showDriverProfile && (
                <div className="profile-box">
                  <Driver />
                  <button onClick={() => setShowDriverProfile(false)}>
                    <GrFormClose />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <h1>Add Your Experience</h1>
        <div id="experience">
          <div className="experience-share">
            <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
              <RiImageAddFill size={30} />
            </label>
            <h1>Happy Customers Images</h1>
          </div>
          <div id="placeuploadedimages">
            {imagesLoading ? (
              <Loader />
            ) : (
              uploadedImages
                .filter((image) => image.placeId === placeId)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image.imageString}
                    alt="Uploaded"
                    className="bd-placeholder-img img-thumbnail"
                    style={{ maxWidth: 200, maxHeight: 150 }}
                    onMouseOver={(e) => {
                      e.target.style.maxWidth = "400px";
                      e.target.style.maxHeight = "300px";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.maxWidth = "200px";
                      e.target.style.maxHeight = "150px";
                    }}
                  />
                ))
            )}
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{ display: "none" }}
          />
        </div>

        <div>
          <h1>Comments</h1>
          <Comment
            userData={userData}
            placeName={selectedData ? selectedData.placeName : ""}
          />
        </div>
      </div>
    </>
  );
};

export default ImageDetails;
