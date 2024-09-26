// AuthContext.js
import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext({
  commentData:false
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [PlacedelectId, setPlaceId] = useState([]);
  const [items, setItems] = useState([]);
  const [islogin,setIsLogin]=useState(false);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        searchData,
        setSearchData,
        commentData,
        setCommentData,
        PlacedelectId,
        setPlaceId,
        items, setItems,
        islogin,setIsLogin,
        isMobile, setIsMobile,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
