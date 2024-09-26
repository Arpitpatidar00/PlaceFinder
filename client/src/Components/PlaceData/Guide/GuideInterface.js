
// import React, { useState } from "react";
// import axios from "axios";
// import "../Place.css"; // Ensure you have a CSS file for styles
// import { useSelector } from "react-redux";
// import { useAuth } from "../../../Context/AuthContext";

// const GuideInterface = () => {
//   const [time, setTime] = useState("");
//   const [price, setPrice] = useState("");
//   const [hours, setHours] = useState("");
//   const [customPlace, setCustomPlace] = useState("");

//   const { placedataId, setPlaceId } = useAuth(); // Using the useAuth hook to get placeId
//   const placeId = useSelector((state) => state.place.placeId);
//   const { userData } = useSelector((state) => state.auth);

//   const submitData = async () => {
//     try {
//       const response = await axios.post("https://travelling-backend.onrender.com/submit/submit", {
//         placeId: placeId,
//         time,
//         price,
//         hours,
//         customPlace,
//         userData,
//       });
//       setPlaceId(response.data.guideData._id);
//       return response.data.dataId; // Return the ID from the response
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     submitData();
//     setTime("");
//     setPrice("");
//     setHours("");
//     setCustomPlace("");
//   };

//   return (
//     <>
//       <div className="guide-interface">
//         <h1>Guide Interface</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="customPlace">Custom Place:</label>
//             <input
//               type="text"
//               id="customPlace"
//               value={customPlace}
//               onChange={(e) => setCustomPlace(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="time">Time:</label>
//             <input
//               type="time"
//               id="time"
//               value={time}
//               onChange={(e) => setTime(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="hours">Hours:</label>
//             <input
//               type="number"
//               id="hours"
//               value={hours}
//               onChange={(e) => setHours(e.target.value)}
//             />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default GuideInterface;

import React, { useState } from "react";
import axios from "axios";
import "../Place.css"; // Ensure you have a CSS file for styles
import { useAuth } from "../../../Context/AuthContext";
import { useSelector } from "react-redux";
import Api from "../../../Api";
const GuideInterface = ({ onDataSubmitted }) => {
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [hours, setHours] = useState("");
  const [customPlace, setCustomPlace] = useState("");

  const {setPlaceId } = useAuth(); // Using the useAuth hook to get placeId
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;  const placeId = useSelector((state) => state.place.placeId);

  const submitData = async () => {
    try {
      const response = await axios.post(`${Api}/guide/guide`, {
        placeId,
        time,
        price,
        hours,
        customPlace,
        userData,

      });
      setPlaceId(response.data.guideData._id);
      console.log(response.data.guideData._id);

      onDataSubmitted(response.data.dataId);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitData();
    setTime("");
    setPrice("");
    setHours("");
    setCustomPlace("");
  };

  return (
    <>
      <div className="guide-interface">
        <h1>Guide WorkPlace</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customPlace">Custom Place:</label>
            <input
              type="text"
              id="customPlace"
              value={customPlace}
              onChange={(e) => setCustomPlace(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hours">Hours:</label>
            <input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default GuideInterface;
