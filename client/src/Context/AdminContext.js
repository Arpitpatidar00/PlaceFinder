// AdminContext.js
import React, { createContext, useState, useContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [placedata, setPlacedata] = useState(false);
  const [userdata, setUserdata] = useState(false);
  const [videos, setVideos] = useState(false);
  const [items, setItems] = useState([]); 

  return (
    <AdminContext.Provider
      value={{
        placedata,
        setPlacedata,
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
