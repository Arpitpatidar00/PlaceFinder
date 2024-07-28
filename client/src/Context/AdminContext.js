// AdminContext.js
import React, { createContext, useState, useContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [placedata, setPlacedata] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const [videos, setVideos] = useState(false);
  const [comments, setComments] = useState([]); // Changed to empty array
  const [items, setItems] = useState([]); // Changed to empty array

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
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
