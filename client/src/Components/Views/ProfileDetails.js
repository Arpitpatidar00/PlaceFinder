
// export default function UserDataDetails({ feedbackId, onClose }) {
//   const [userData, setUserData] = useState(null);
//   const [userImages, setUserImages] = useState([]);
//   const [showAllImages, setShowAllImages] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`https://travelling-backend.onrender.com/Feedback/onlyone${feedbackId}`);
//         if (response.ok) {
//           const data = await response.json();
//           setUserData(data.userData);
// setTimeout(() => {
//   if (userData._id) {
//     const imageResponse = await axios.get(`https://travelling-backend.onrender.com/upload/user/${userData._id}`);
//     setUserImages(imageResponse.data);
   
//   }
// } else {
//   console.error("Failed to fetch feedback details");
// }
// }, timeout);

          
        
//       } catch (error) {
//         console.error("Error fetching feedback details:", error);
//       }
//     };
//     console.log(userData._id)

//     if (feedbackId) {
//       fetchUserData();
//     }
//   }, [feedbackId]);

//   const handleShowAllImages = () => {
//     setShowAllImages(!showAllImages);
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const toggleModal = () => {
//     setSelectedImage(null);
//   };

//   const displayedImages = useMemo(
//     () => (showAllImages ? userImages : userImages.slice(0, 5)),
//     [showAllImages, userImages]
//   );

//   if (!userData) {
//     return null;
//   }

//   return (
//     <>
//       <div className="btn-close" onClick={onClose}></div>

//       <div className="container-profile">
//         <div className="profile-header items-center mb-8">
//           <div className="profile-image mr-40">
//             <img
//               src={`data:image/png;base64,${userData.image}`}
//               alt="Profile"
//               className="w-24 h-24 rounded-full"
//             />
//           </div>
//           <div className="profile-info flex-grow">
//             <h1 className="text-2xl font-bold">{userData.username}</h1>
//             <div className="stats mt-2">
//               <div className="stat text-lg">
//                 <span className="font-bold">{userImages.length}</span>
//                 <span> Photos</span>
//               </div>
//               <h1 className="text-2xl font-bold">{userData.bio}</h1>
//             </div>
//           </div>
//         </div>
//         <div className="photos-section">
//           <div className="photos-header mb-2">
//             <button className="show-all-link text-blue-500" onClick={handleShowAllImages}>
//               {showAllImages ? "Show less" : "Show all"}
//             </button>
//           </div>
//           <div className="photos-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {displayedImages.map((image) => (
//               <div key={image.id} className="photo-item">
//                 <img
//                   src={image.url}
//                   alt="User Upload"
//                   className="w-full h-auto object-cover cursor-pointer"
//                   onClick={() => handleImageClick(image)}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <button onClick={onClose}>Close</button>

//       {selectedImage && (
//         <div className="modal" onClick={toggleModal}>
//           <div className="modal-content">
//             <div className="btn-close" onClick={toggleModal}></div>
//             <img src={selectedImage.url} alt="Selected" className="w-full h-auto object-cover" />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./FeedbackDetails.css";
import Api from '../../Api.js';


export default function UserDataDetails({ user, onClose }) {
  const [userData, setUserData] = useState(null);
  const [userImages, setUserImages] = useState([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
              src={`data:image/png;base64,${userData.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="profile-info flex-grow">
            <h1 className="text-2xl font-bold">{userData.username}</h1>
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
            {displayedImages.map((userImages) => (
              <div key={userImages.id} className="photo-item">
                <img
                  src={userImages.imageString}
                  alt="User Upload"
                  className="w-full h-auto object-cover cursor-pointer"
                  onClick={() => handleImageClick(userImages)}
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
