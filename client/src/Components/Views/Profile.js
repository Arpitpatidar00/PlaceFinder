import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Api from "../../Api.js";

// Utility function to convert file to base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function Profile() {
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const [userImages, setUserImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userStatus, setUserStatus] = useState("Online");
  const [editMode, setEditMode] = useState(false);
  const [editOption, setEditOption] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`${Api}/upload/user/${userData._id}`);
        setUserImages(response.data);
      } catch (error) {
        console.error("Error fetching user images:", error);
      }
    };

    fetchUserImages();
  }, [userData._id]);

  const handleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const toggleModal = () => {
    setSelectedImage(null);
  };

  const toggleUserStatus = async () => {
    try {
      const newStatus = userStatus === "Online" ? "Offline" : "Online";
      setUserStatus(newStatus);

      if (newStatus === "Offline") {
        await axios.delete(`${Api}/guide/delete/${userData._id}`);
        await axios.delete(`${Api}/driver/delete/${userData._id}`);
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
      setUserStatus(userStatus === "Online" ? "Online" : "Offline");
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
    setEditOption("");
  };

  const handleOptionChange = (e) => {
    setEditOption(e.target.value);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    if (editOption === "photo" && newImage) {
      try {
        const base64Image = await fileToBase64(newImage);
        formData.append("image", base64Image); // Append base64 string
      } catch (error) {
        console.error("Error converting image to base64:", error);
        return;
      }
    } else if (editOption === "password") {
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);
    } else if (editOption === "name") {
      formData.append("name", newName);
    } else if (editOption === "number") {
      formData.append("mobileNumber", newNumber);
    } else if (editOption === "bio") {
      formData.append("bio", newBio);
    }

    try {
      await axios.put(`${Api}/auth/profileupdate/${userData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setEditMode(false);
      setEditOption("");
    }
  };
  return (
    <>
      <div>
        <div className="container">
          <div className="container-profile">
            <button
              className="edit-profile-btn mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={handleEditClick}
            >
              Edit profile
            </button>
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
                </div>
                <h1 className="text-2xl font-bold">{userData.bio}</h1>

                {(userData.role === "guide" || userData.role === "driver") && (
                  <button
                    className="status-btn mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
                    onClick={toggleUserStatus}
                  >
                    {userStatus === "Online" ? "Go Offline" : "Go Online"}
                  </button>
                )}
              </div>
            </div>
            <div className="photos-section">
              <div className="photos-header mb-2">
                <button
                  className="show-all-link text-blue-500"
                  onClick={handleShowAllImages}
                >
                  {showAllImages ? "Show less" : "Show all"}
                </button>
              </div>
              <div className="photos-grid grid grid-cols-3 gap-2">
                {(showAllImages ? userImages : userImages.slice(0, 6)).map(
                  (image, index) => (
                    <div
                      key={index}
                      className="photo-item cursor-pointer"
                      onClick={() => handleImageClick(image.imageString)}
                    >
                      <img
                        src={image.imageString}
                        alt={`User-uploaded profile ${index + 1}`}
                        className="w-300px h-300px object-cover rounded-lg"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {selectedImage && (
              <div
                className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                onClick={toggleModal}
              >
                <div
                  className="modal-content bg-white p-4 rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="modal-close absolute top-2 right-2 text-gray-600"
                    onClick={toggleModal}
                  >
                    X
                  </button>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            )}
            {editMode && (
              <div className="edit-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="edit-modal-content bg-white  rounded-lg w-full max-w-md">
                  <button
                    className="modal-close absolute top-2 right-2 text-gray-600"
                    onClick={() => setEditMode(false)}
                  >
                    X
                  </button>
                  <h2 className="text-xl font-semibold mb-4">
                    Select what to edit
                  </h2>
                  <form className="space-y-4">
                    <label
                      htmlFor="edit-options"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select an option
                    </label>
                    <select
                      id="edit-options"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={editOption}
                      onChange={handleOptionChange}
                    >
                      <option value="">Select option</option>
                      <option value="password">Change Password</option>
                      <option value="photo">Change Photo</option>
                      <option value="name">Change Name</option>
                      <option value="number">Change Mobile Number</option>
                      <option value="bio">Add Bio</option>
                    </select>

                    {editOption === "password" && (
                      <div>
                        <input
                          type="password"
                          placeholder="Old Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                        />
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
                        />
                      </div>
                    )}

                    {editOption === "photo" && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setNewImage(e.target.files[0])}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    )}

                    {editOption === "name" && (
                      <input
                        type="text"
                        placeholder="New Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    )}

                    {editOption === "number" && (
                      <input
                        type="text"
                        placeholder="New Mobile Number"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    )}

                    {editOption === "bio" && (
                      <textarea
                        placeholder="Add Bio"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    )}

                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
