import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setPlaceId } from "../../actions/placeActions";
import Api from '../../Api';
import Loader from "../Loader/Loader";
import "../Card.css";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // State to track component visibility
  const [loading, setLoading] = useState(false); // State for loading

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const searchComponent = document.getElementById("searchComponent");
      if (searchComponent) {
        const { top } = searchComponent.getBoundingClientRect();
        const isVisible = top < window.innerHeight - 100;
        setIsVisible(isVisible);
      }
    };

    // Event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      if (query.trim() !== "") {
        setLoading(true); // Set loading to true before API call
  
        // Make the API call to search for images
        const response = await axios.get(`${Api}/add/search?query=${query.trim()}`);
  
        // Update state with the received images
        setImages(response.data);
  
        // Log the retrieved images (for debugging purposes)
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error searching:", error);
    } finally {
      // Set loading to false after the API call is complete, regardless of success or failure
      setLoading(false);
    }
  };
  
  const handleCardClick = (placeId) => {
    dispatch(setPlaceId(placeId));
  };

  const renderCardData = images.map((image) => (
    <div key={image._id}>
      <Link
        to={`/details/${image._id}`}
        className="search-card-link"
        onClick={() => handleCardClick(image._id)}
      >
        <motion.div
          key={image._id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className={`card ${isVisible ? "visible" : ""}`} 
        >
          <img className="search-img" src={image.image} alt={image.placeName || image.cityName} />
          <div className="container-card">
          </div>
        </motion.div>
      </Link>
    </div>
  ));
  


  return (
    <div className="search-container" id="searchComponent">
      <div className="searchComponent">
        <input value={query} placeholder="Search" onChange={handleQueryChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading ? (
        <Loader /> // Show loader when loading
      ) : (
        <div id='search-card'>{renderCardData}</div>
      )}
    </div>
  );
};

export default Search;