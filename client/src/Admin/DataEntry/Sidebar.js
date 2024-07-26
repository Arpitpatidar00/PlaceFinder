// import React from "react";
// import { useAdmin } from "../../Context/AdminContext";

// import "./admin.css";
// import { useAuth } from "../../Context/AuthContext";

// function Sidebar() {
//   const {
//     placedata,
//     setPlacedata,
//     userdata,
//     setUserdata,
//     videos,
//     setVideos,
//     items,
//     setItems,
//   } = useAdmin();
//   const { commentData, setCommentData } = useAuth();
  
//   function userdataon() {
//     setPlacedata(false);
//     setUserdata(true);
//     setVideos(false);
//     setItems(false);
//     setCommentData(false);
//   }

//   function placedataon() {
//     setPlacedata(true);
//     setUserdata(false);
//     setVideos(false);
//     setItems(false);
//     setCommentData(false);
//   }

//   function videouploadon() {
//     setPlacedata(false);
//     setUserdata(false);
//     setVideos(true);
//     setItems(false);
//     setCommentData(false);
//   }

//   function placeentry() {
//     setPlacedata(false);
//     setUserdata(false);
//     setVideos(false);
//     setItems(true);
//     setCommentData(false);
//   }
//   function Commenton() {
//     setPlacedata(false);
//     setUserdata(false);
//     setVideos(false);
//     setItems(false);
//     setCommentData(true);
//   }

//   return (
//     <div className="app">
//       <div className="sidebar bg-green-500">
//         <h2 className="mt-10 mb-10 text-2xl text-center text-white">
//           <b>Welcome Admin Panel</b>
//         </h2>
//         <div id="hrdiv">
//           <hr />
//         </div>
//         <ul className="buttonsdiv">
//           <button
//             onClick={placedataon}
//             className={`button text-white ${placedata ? "active" : ""}`}
//           >
//             <b>Place Control</b>
//           </button>
//           <button
//             onClick={userdataon}
//             className={`button text-white ${userdata ? "active" : ""}`}
//           >
//             <b>User Control</b>
//           </button>
//           <button
//             onClick={videouploadon}
//             className={`button text-white ${videos ? "active" : ""}`}
//           >
//             <b>Video Upload</b>
//           </button>
//           <button
//             onClick={placeentry}
//             className={`button text-white ${items ? "active" : ""}`}
//           >
//             <b>Item Control</b>
//           </button>
//           <button
//             onClick={Commenton}
//             className={`button text-white ${commentData ? "active" : ""}`}
//           >
//             <b>Comment Control</b>
//           </button>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import React from "react";
import { useAdmin } from "../../Context/AdminContext";
import { useAuth } from "../../Context/AuthContext";
import "./admin.css";

function Sidebar() {
  const {
    placedata,
    setPlacedata,
    userdata,
    setUserdata,
    videos,
    setVideos,
    items,
    setItems,
  } = useAdmin();
  const { commentData, setCommentData } = useAuth();
  
  function setExclusiveState(target) {
    setPlacedata(false);
    setUserdata(false);
    setVideos(false);
    setItems(false);
    setCommentData(false);

    target(true);
  }

  return (
    <div className="app">
      <div className="sidebar bg-green-500">
        <h2 className="mt-10 mb-10 text-2xl text-center text-white">
          <b>Welcome Admin Panel</b>
        </h2>
        <div id="hrdiv">
          <hr />
        </div>
        <ul className="buttonsdiv">
          <button
            onClick={() => setExclusiveState(setPlacedata)}
            className={`button text-white ${placedata ? "active" : ""}`}
          >
            <b>Place Control</b>
          </button>
          <button
            onClick={() => setExclusiveState(setUserdata)}
            className={`button text-white ${userdata ? "active" : ""}`}
          >
            <b>User Control</b>
          </button>
          <button
            onClick={() => setExclusiveState(setVideos)}
            className={`button text-white ${videos ? "active" : ""}`}
          >
            <b>Video Upload</b>
          </button>
          <button
            onClick={() => setExclusiveState(setItems)}
            className={`button text-white ${items ? "active" : ""}`}
          >
            <b>Item Control</b>
          </button>
          <button
            onClick={() => setExclusiveState(setCommentData)}
            className={`button text-white ${commentData ? "active" : ""}`}
          >
            <b>Comment Control</b>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
