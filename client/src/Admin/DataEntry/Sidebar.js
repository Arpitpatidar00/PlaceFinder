import React from "react";
import { useAdmin } from "../../Context/AdminContext";
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
    comments,
    setComments,
    feedback,
    setFeedback,
  } = useAdmin();

  // Function to deactivate all states and activate the target
  function setExclusiveState(targetSetter) {
    // Deactivate all states
    setPlacedata(false);
    setUserdata(false);
    setVideos(false);
    setItems(false);
    setComments(false);
    setFeedback(false);

    // Activate the target state
    targetSetter(true);
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
            onClick={() => setExclusiveState(setComments)}
            className={`button text-white ${comments ? "active" : ""}`}
          >
            <b>Comment Control</b>
          </button>

          <button
            onClick={() => setExclusiveState(setFeedback)}
            className={`button text-white ${feedback ? "active" : ""}`}
          >
            <b>Feedback Control</b>
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
