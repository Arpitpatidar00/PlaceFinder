
// import React, { useState, useEffect } from "react";
// import { IoIosCall } from "react-icons/io";
// import { IoAddSharp } from "react-icons/io5";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "../Guide/Guide.css";
// import DriverInterface from "./DriverInterface";
// import { useAuth } from "../../../Context/AuthContext.js";

// const Driver = () => {
//   const placeId = useSelector((state) => state.place.placeId);
//   const userData = useSelector((state) => state.auth.userData);
//   const { PlacedelectId } = useAuth(); // Corrected the context variable name

//   const [showCallDescription, setShowCallDescription] = useState(false);
//   const [showAddDescription, setShowAddDescription] = useState(false);
//   const [isImageHovered, setIsImageHovered] = useState(false);
//   const [guides, setGuides] = useState([]);
//   const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
//   const [isToggled, setIsToggled] = useState(false);
//   const [isAvailable, setIsAvailable] = useState(true); // New state for availability

//   useEffect(() => {
//     const fetchGuideData = async () => {
//       try {
//         const response = await axios.get("https://travelling-backend.onrender.com/driver/driver");
//         setGuides(response.data.driverData);
//       } catch (error) {
//         console.error("Error fetching guide data:", error);
//       }
//     };

//     fetchGuideData();
//   }, []);

//   const filteredGuides = guides.filter((guide) => guide.placeId === placeId);

//   const toggleCallDescription = () => {
//     setShowCallDescription((prev) => !prev);
//     setShowAddDescription(false);
//   };

//   const toggleAddDescription = () => {
//     setShowAddDescription((prev) => !prev);
//     setShowCallDescription(false);
//   };

//   const handleImageHover = () => {
//     setIsImageHovered(true);
//   };

//   const handleImageLeave = () => {
//     setIsImageHovered(false);
//   };

//   const handleNextGuide = () => {
//     setCurrentGuideIndex((prevIndex) =>
//       prevIndex === filteredGuides.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePreviousGuide = () => {
//     setCurrentGuideIndex((prevIndex) =>
//       prevIndex === 0 ? filteredGuides.length - 1 : prevIndex - 1
//     );
//   };

//   const currentGuide = filteredGuides[currentGuideIndex];

//   // Function to delete guide data by ID
//   const deleteGuideData = async () => {
//     if (!isToggled) {
//       try {
//         await axios.delete(
//           `https://travelling-backend.onrender.com/driver/delete/${PlacedelectId}`
//         );
//         // After deletion, fetch updated guide data
//         const response = await axios.get("https://travelling-backend.onrender.com/submit/driver");
//         setGuides(response.data.guideData);
//         setIsAvailable(false); // Set availability to false after successful deletion
//       } catch (error) {
//         console.error("Error deleting guide data:", error);
//       }
//     }
//   };

//   return (
//     <div>
//        {userData.role === "user" && (
//       <div className="guide-navigation">
//         <button className="guide-button" onClick={handlePreviousGuide}>
//           Previous
//         </button>
//         <button className="guide-button" onClick={handleNextGuide}>
//           Next
//         </button>
        
//       </div>
//     )}
//       {userData.role === "user" && (
//       <div className="guide-container">
//         {filteredGuides.length > 0 ? (
//           <div>
//             <div className="guide-content">
//               <div
//                 className="guide-image"
//                 onMouseEnter={handleImageHover}
//                 onMouseLeave={handleImageLeave}
//               >
//                 <ReactRoundedImage
//                   image={`data:image/png;base64,${currentGuide.userData.image}`}
//                   imageWidth={isImageHovered ? 250 : 150}
//                   imageHeight={isImageHovered ? 250 : 150}
//                 />
//                 <h1 className="guide-username">
//                   {currentGuide.userData.username}
//                 </h1>
//               </div>

//               {userData.role === "user" && (
//                 <div className="user-content">
//                   <div className="guide-options">
//                     <div className="guide-option">
//                       <IoIosCall
//                         onClick={toggleCallDescription}
//                         size={40}
//                         style={{ cursor: "pointer" }}
//                       />
//                       {showCallDescription && (
//                         <div className="guide-description">
//                           <p>This is the Call Description content.</p>
//                           <h1>Email: {currentGuide.userData.email}</h1>
//                           <h1>
//                             Phone NO: {currentGuide.userData.mobileNumber}
//                           </h1>
//                         </div>
//                       )}
//                     </div>
//                     <div className="guide-option">
//                       <IoAddSharp
//                         onClick={toggleAddDescription}
//                         size={40}
//                         style={{ cursor: "pointer" }}
//                       />
//                       {showAddDescription && (
//                         <div className="guide-description">
//                           <p>This is the Add Description content.</p>
//                           <h1>
//                             Achievements: {currentGuide.certificationAddress}
//                           </h1>
//                           <h1>licenceNumber : {currentGuide.userData.licenceNumber}</h1>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <div className="guide-details">
//                     <p>Custom Place: {currentGuide.customPlace}</p>
//                     <p>Hours: {currentGuide.hours}</p>
//                     <p>Price: {currentGuide.price}</p>
//                     <p>Time: {currentGuide.time}</p>
//                     <p>Place ID: {currentGuide.placeId}</p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <p>No drivers available.</p>
//         )}
//       </div>
//       )}
//       {userData.role === "driver" && (
//         <div className="guide-additional-details">
//           <Toggle
//             checked={isToggled}
//             onClick={() => {
//               setIsToggled(!isToggled);
//               deleteGuideData(); // Call delete function when toggled
//             }}
//           />

//           {isToggled && <DriverInterface />}
//         </div>
//       )}

//       {userData.role === "driver" && (
//         <p>{isAvailable ? "You are available." : "You are not available."}</p>
//       )}
//     </div>
//   );
// };

// const Toggle = ({ checked, onClick }) => {
//   return (
//     <div className="toggle-container" onClick={onClick}>
//       <input
//         type="checkbox"
//         className="toggle-input"
//         checked={checked}
//         onChange={() => {}} // Empty handler to satisfy React warning
//       />
//       <div className="toggle-slider"></div>
//     </div>
//   );
// };

// export default Driver;

import React, { useState, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import "../Guide/Guide.css";
import DriverInterface from "./DriverInterface";
import { useAuth } from "../../../Context/AuthContext.js";
import Api from '../../../Api.js';


const Driver = () => {
  const placeId = useSelector((state) => state.place.placeId);
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
    const { PlacedelectId } = useAuth(); // Corrected the context variable name

  const [showCallDescription, setShowCallDescription] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [guides, setGuides] = useState([]);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true); // New state for availability

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const response = await axios.get(`${Api}/driver/driver`);
        setGuides(response.data.driverData);
      } catch (error) {
        console.error("Error fetching guide data:", error);
      }
    };

    fetchGuideData();
  }, []);

  const filteredGuides = guides.filter((guide) => guide.placeId === placeId);

  const toggleCallDescription = () => {
    setShowCallDescription((prev) => !prev);
    setShowAddDescription(false);
  };

  const toggleAddDescription = () => {
    setShowAddDescription((prev) => !prev);
    setShowCallDescription(false);
  };

  const handleImageHover = () => {
    setIsImageHovered(true);
  };

  const handleImageLeave = () => {
    setIsImageHovered(false);
  };

  const handleNextGuide = () => {
    setCurrentGuideIndex((prevIndex) =>
      prevIndex === filteredGuides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousGuide = () => {
    setCurrentGuideIndex((prevIndex) =>
      prevIndex === 0 ? filteredGuides.length - 1 : prevIndex - 1
    );
  };

  const currentGuide = filteredGuides[currentGuideIndex];

  // Function to delete guide data by ID
  const deleteGuideData = async () => {
    if (!isToggled) {
      try {
        // Delete the guide data using the ID
        await axios.delete(`https://travelling-backend.onrender.com/driver/delete/${PlacedelectId}`);
  
        // After deletion, fetch updated driver data
        const response = await axios.get("https://travelling-backend.onrender.com/submit/driver");
  
        // Set the updated driver data
        setGuides(response.data.guideData);
  
        // Set availability to false after successful deletion
        setIsAvailable(false);
      } catch (error) {
        console.error("Error deleting guide data:", error);
      }
    }
  };
  
  return (
    <div>
      {userData.role === "user" && (
        <div className="guide-navigation">
          <button className="guide-button" onClick={handlePreviousGuide}>
            Previous
          </button>
          <button className="guide-button" onClick={handleNextGuide}>
            Next
          </button>
        </div>
      )}
      {userData.role === "user" && (
        <div className="guide-container">
          {filteredGuides.length > 0 ? (
            <div>
              <div className="guide-content">
                <div
                  className="guide-image"
                  onMouseEnter={handleImageHover}
                  onMouseLeave={handleImageLeave}
                >
                  <img
                    src={`data:image/png;base64,${currentGuide.userData.image}`}
                    alt="Guide"
                    style={{
                      width: isImageHovered ? 250 : 150,
                      height: isImageHovered ? 250 : 150,
                      borderRadius: "50%",
                    }}
                  />
                  <h1 className="guide-username">
                    {currentGuide.userData.username}
                  </h1>
                </div>

                {userData.role === "user" && (
                  <div className="user-content">
                    <div className="guide-options">
                      <div className="guide-option">
                        <IoIosCall
                          onClick={toggleCallDescription}
                          size={40}
                          style={{ cursor: "pointer" }}
                        />
                        {showCallDescription && (
                          <div className="guide-description">
                            <p>This is the Call Description content.</p>
                            <h1>Email: {currentGuide.userData.email}</h1>
                            <h1>
                              Phone NO: {currentGuide.userData.mobileNumber}
                            </h1>
                          </div>
                        )}
                      </div>
                      <div className="guide-option">
                        <IoAddSharp
                          onClick={toggleAddDescription}
                          size={40}
                          style={{ cursor: "pointer" }}
                        />
                        {showAddDescription && (
                          <div className="guide-description">
                            <p>This is the Add Description content.</p>
                            <h1>
                              Achievements: {currentGuide.certificationAddress}
                            </h1>
                            <h1>licenceNumber : {currentGuide.userData.licenceNumber}</h1>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="guide-details">
                      <p>Custom Place: {currentGuide.customPlace}</p>
                      <p>Hours: {currentGuide.hours}</p>
                      <p>Price: {currentGuide.price}</p>
                      <p>Time: {currentGuide.time}</p>
                      <p>Place ID: {currentGuide.placeId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p>No drivers available.</p>
          )}
        </div>
      )}
      {userData.role === "driver" && (
        <div className="guide-additional-details">
          <Toggle
            checked={isToggled}
            onClick={() => {
              setIsToggled(!isToggled);
              deleteGuideData(); // Call delete function when toggled
            }}
          />

          {isToggled && <DriverInterface />}
        </div>
      )}

      {userData.role === "driver" && (
        <p>{isAvailable ? "You are available." : "You are not available."}</p>
      )}
    </div>
  );
};

const Toggle = ({ checked, onClick }) => {
  return (
    <div className="toggle-container" onClick={onClick}>
      <input
        type="checkbox"
        className="toggle-input"
        checked={checked}
        onChange={() => {}} // Empty handler to satisfy React warning
      />
      <div className="toggle-slider"></div>
    </div>
  );
};

export default Driver;
