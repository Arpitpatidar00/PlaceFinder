// AdminContext.js
import React, { createContext, useState, useContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [placedata, setPlacedata] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const [videos, setVideos] = useState(false);
  const [comments, setComments] = useState(false);
  const [items, setItems] = useState(false);
  const [feedback, setFeedback] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        placedata,
        setPlacedata,
        comments,
        setComments,
        userdata,
        setUserdata,
        videos,
        setVideos,
        items,
        setItems,
        feedback,
        setFeedback,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
