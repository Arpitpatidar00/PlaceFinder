// import React, { useState, useEffect } from "react";
// import ReactRoundedImage from "react-rounded-image";
// import { IoIosCall } from "react-icons/io";
// import { IoAddSharp } from "react-icons/io5";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "./Guide.css";
// import GuideInterface from "./GuideInterface.js";
// import { useAuth } from "../../../Context/AuthContext.js";

// const Guide = () => {
//   const placeId = useSelector((state) => state.place.placeId);
//   const userData = useSelector((state) => state.auth.userData);
//   const { PlacedelectId } = useAuth();

//   const [showCallDescription, setShowCallDescription] = useState(false);
//   const [showAddDescription, setShowAddDescription] = useState(false);
//   const [isImageHovered, setIsImageHovered] = useState(false);
//   const [guides, setGuides] = useState([]);
//   const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
//   const [isToggled, setIsToggled] = useState(false);
//   const [isAvailable, setIsAvailable] = useState(true);

//   useEffect(() => {
//     const fetchGuideData = async () => {
//       try {
//         const response = await axios.get("https://travelling-backend.onrender.com/guide/guide");
//         setGuides(response.data.guideData);
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

//   const deleteGuideData = async () => {
//     if (!isToggled) {
//       try {
//         await axios.delete(`https://travelling-backend.onrender.com/guide/delete/${PlacedelectId}`);
//         const response = await axios.get("https://travelling-backend.onrender.com/guide/guide");
//         setGuides(response.data.guideData);
//         setIsAvailable(false);
//       } catch (error) {
//         console.error("Error deleting guide data:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="guide-navigation">
//         {userData.role === "user" && (
//           <>
//             <button className="guide-button" onClick={handlePreviousGuide}>
//               Previous
//             </button>
//             <button className="guide-button" onClick={handleNextGuide}>
//               Next
//             </button>
//           </>
//         )}
//       </div>
//       {userData.role === "user" && (
//         <div className="guide-container">
//           {filteredGuides.length > 0 ? (
//             <div>
//               <div className="guide-content">
//                 <div
//                   className="guide-image"
//                   onMouseEnter={handleImageHover}
//                   onMouseLeave={handleImageLeave}
//                 >
//                   <ReactRoundedImage
//                     image={`data:image/png;base64,${currentGuide.userData.image}`}
//                     imageWidth={isImageHovered ? 250 : 150}
//                     imageHeight={isImageHovered ? 250 : 150}
//                   />
//                   <h1 className="guide-username">
//                     {currentGuide.userData.username}
//                   </h1>
//                 </div>

//                 {userData.role === "user" && (
//                   <div className="user-content">
//                     <div className="guide-options">
//                       <div className="guide-option">
//                         <IoIosCall
//                           onClick={toggleCallDescription}
//                           size={40}
//                           style={{ cursor: "pointer" }}
//                         />
//                         {showCallDescription && (
//                           <div className="guide-description">
//                             <p>This is the Call Description content.</p>
//                             <h1>Email: {currentGuide.userData.email}</h1>
//                             <h1>Phone NO: {currentGuide.userData.mobileNumber}</h1>
//                           </div>
//                         )}
//                       </div>
//                       <div className="guide-option">
//                         <IoAddSharp
//                           onClick={toggleAddDescription}
//                           size={40}
//                           style={{ cursor: "pointer" }}
//                         />
//                         {showAddDescription && (
//                           <div className="guide-description">
//                             <p>This is the Add Description content.</p>
//                             <h1>Achievements: {currentGuide.certificationAddress}</h1>
//                             <h1>Qualifications: {currentGuide.qualifications}</h1>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     <div className="guide-details">
//                       <p>Custom Place: {currentGuide.customPlace}</p>
//                       <p>Hours: {currentGuide.hours}</p>
//                       <p>Price: {currentGuide.price}</p>
//                       <p>Time: {currentGuide.time}</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : userData.role === "user" ? (
//             <p>No guides available.</p>
//           ) : null}
//         </div>
//       )}
//       {userData.role === "guide" && (
//         <div className="guide-additional-details">
//           <Toggle
//             checked={isToggled}
//             onClick={() => {
//               setIsToggled(!isToggled);
//               deleteGuideData();
//             }}
//           />

//           {isToggled && <GuideInterface />}
//         </div>
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

// export default Guide;
import React, { useState, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoAddSharp } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Guide.css";
import GuideInterface from "./GuideInterface.js";
import { useAuth } from "../../../Context/AuthContext.js";
import Api from '../../../Api.js';


const Guide = () => {
  const placeId = useSelector((state) => state.place.placeId);
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;  const { PlacedelectId } = useAuth();

  const [showCallDescription, setShowCallDescription] = useState(false);
  const [showAddDescription, setShowAddDescription] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [guides, setGuides] = useState([]);
  const [currentGuideIndex, setCurrentGuideIndex] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [ setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const response = await axios.get(`${Api}/guide/guide`);
        setGuides(response.data.guideData);
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

  const deleteGuideData = async () => {
    if (!isToggled) {
      try {
        await axios.delete(`${Api}/guide/delete/${PlacedelectId}`);
        const response = await axios.get(`${Api}guide/guide`);
        setGuides(response.data.guideData);
        setIsAvailable(false);
      } catch (error) {
        console.error("Error deleting guide data:", error);
      }
    }
  };

  return (
    <div>
      <div className="guide-navigation">
        {userData.role === "user" && (
          <>
            <button className="guide-button" onClick={handlePreviousGuide}>
              Previous
            </button>
            <button className="guide-button" onClick={handleNextGuide}>
              Next
            </button>
          </>
        )}
      </div>
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
                    alt={currentGuide.userData.username}
                    width={isImageHovered ? 250 : 150}
                    height={isImageHovered ? 250 : 150}
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
                            <h1>Phone NO: {currentGuide.userData.mobileNumber}</h1>
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
                            <h1>Achievements: {currentGuide.certificationAddress}</h1>
                            <h1>Qualifications: {currentGuide.qualifications}</h1>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="guide-details">
                      <p>Custom Place: {currentGuide.customPlace}</p>
                      <p>Hours: {currentGuide.hours}</p>
                      <p>Price: {currentGuide.price}</p>
                      <p>Time: {currentGuide.time}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : userData.role === "user" ? (
            <p>No guides available.</p>
          ) : null}
        </div>
      )}
      {userData.role === "guide" && (
        <div className="guide-additional-details">
          <Toggle
            checked={isToggled}
            onClick={() => {
              setIsToggled(!isToggled);
              deleteGuideData();
            }}
          />

          {isToggled && <GuideInterface />}
        </div>
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

export default Guide;
