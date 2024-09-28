// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { motion } from "framer-motion"; // Import motion from framer-motion
// import { setPlaceId } from "../../actions/placeActions";
// import Api from '../../Api';
// import Loader from "../Loader/Loader";
// import "../Card.css";

// const Search = () => {
//   const dispatch = useDispatch();
//   const [query, setQuery] = useState("");
//   const [images, setImages] = useState([]);
//   const[loading,setLoading]=useState(false)
//   // const [ setSearchClicked] = useState(false);
//   const [isVisible, setIsVisible] = useState(false); // State to track component visibility

//   useEffect(() => {
//     // Function to handle scroll event
//     const handleScroll = () => {
//       const searchComponent = document.getElementById("searchComponent");
//       if (searchComponent) {
//         const { top } = searchComponent.getBoundingClientRect();
//         const isVisible = top < window.innerHeight - 100;
//         setIsVisible(isVisible);
//       }
//     };

//     // Event listener for scroll
//     window.addEventListener("scroll", handleScroll);

//     // Cleanup function
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleQueryChange = (e) => {
//     setQuery(e.target.value);
//   };

//   const handleSearch = async () => {
//     setLoading(true)
//     try {
//       // setSearchClicked(true); // Trigger search on button click
//       if (query.trim() !== "") {
//         const response = await axios.get(
//           `${Api}/add/search?query=${query.trim()}`
//         );
//         setImages(response.data);
//       }
//     } catch (error) {
//       console.error("Error searching:", error);
//     }finally{
//       setLoading(false)
//     }
//   };

//   const handleCardClick = (placeId) => {
//     dispatch(setPlaceId(placeId));
//   };

//   const renderCardData = images.map((image) =>
//     (image.placeName &&
//       image.placeName.toLowerCase() === query.trim().toLowerCase()) ||
//     (image.cityName &&
//       image.cityName.toLowerCase() === query.trim().toLowerCase()) ? (
//       <div>
       
//             <Link
//               to={`/details/${image._id}`}
//               key={image._id}
//               className="search-card-link"
//               onClick={() => handleCardClick(image._id)}
//             >
//               <motion.div
//                 key={image._id}
//                 initial={{ opacity: 0, y: -50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className={`card ${isVisible ? "visible" : ""}`} 
//               >
//                 <img className="search-img" src={image.image} alt={image.placeName} />
//                 <div className="container-card">
//                   {/* <h2 className="placename">{image.placeName}</h2> */}
//                 </div>
//               </motion.div>
//             </Link>
//           </div>
       
//     ) : null
//   );

//   return (
//     <div className="search-container">
//       <div className="searchComponent">
//         <input  value={query} placeholder="Search" onChange={handleQueryChange} />
//         <button onClick={handleSearch}>Search</button>
//       </div>
      
//       {loading?(
//         <>
//       <div id='search-card'>{renderCardData}</div>
//       </>
//     )}
//     </div>
//   );
// };

// export default Search;
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
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to track component visibility

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
    setLoading(true);
    setImages([]); // Clear previous results
    try {
      if (query.trim() !== "") {
        const response = await axios.get(
          `${Api}/add/search?query=${query.trim()}`
        );
        setImages(response.data);
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (placeId) => {
    dispatch(setPlaceId(placeId));
  };

  const renderCardData = images.map((image) =>
    (image.placeName &&
      image.placeName.toLowerCase() === query.trim().toLowerCase()) ||
    (image.cityName &&
      image.cityName.toLowerCase() === query.trim().toLowerCase()) ? (
      <div key={image._id}> {/* Added key here */}
        <Link
          to={`/details/${image._id}`}
          className="search-card-link"
          onClick={() => handleCardClick(image._id)}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className={`card ${isVisible ? "visible" : ""}`}
          >
            <img className="search-img" src={image.image} alt={image.placeName} />
            <div className="container-card">
              {/* <h2 className="placename">{image.placeName}</h2> */}
            </div>
          </motion.div>
        </Link>
      </div>
    ) : null
  );

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
