
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setPlaceId } from "../../actions/placeActions.js";
import "../.././Components/Card.css";
import { useAdmin } from "../../Context/AdminContext.js";
import axios from 'axios';
import Api from '../../Api.js';

const CardData = () => {

  const { items, setItems } = useAdmin(false);
  const [selectedId, setSelectedId] = useState(null);
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetch(`${Api}/add/`);
        const data = await response.json();
        const shuffledData = data.sort(() => 0.5 - Math.random());
        setItems(shuffledData.slice(0, 200)); // Limit to 15 items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setItems]);

  const handleCardClick = (id) => {
    dispatch(setPlaceId(id));
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    // Ask for confirmation
    if (window.confirm("Are you sure you want to delete this place?")) {
      try {
        await axios.delete(`https://travelling-backend.onrender.com/add/${id}`);
        await axios.delete(`${Api}/add/${id}`);
        // Remove the deleted item from state
        setItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Ensure the field matches
      } catch (error) {
        console.error("Error deleting place:", error);
      }
    }
  };

  return (
    <div ref={ref} className={`card-container ${inView ? "visible" : ""}`}>
      {(Array.isArray(items) ? items : []).map((item) => (
        <div key={item._id} className="card-link" onClick={() => handleCardClick(item._id)}>
          <motion.div
            layoutId={item._id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="max-w-sm rounded overflow-hidden shadow-lg m-4 relative card"
          >
            <img className="w-full img" src={item.image} alt={item.placeName} />
            <div className="px-6 py-4 container-card">
              <motion.h5 className="font-bold text-xl mb-2 placename">{item.placeName}</motion.h5>
            </div>
            <button
              className="delete-button absolute top-2 right-2 bg-red-600 text-white p-2 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                handleDelete(item._id); // Ensure item._id is the correct ID
              }}
            >
              Delete
            </button>
          </motion.div>
        </div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="w-full img"
                src={items.find((item) => item._id === selectedId)?.image}
                alt={items.find((item) => item._id === selectedId)?.placeName}
              />
              <div className="px-6 py-4">
                <motion.h5 className="font-bold text-xl mb-2">
                  {items.find((item) => item._id === selectedId)?.placeName}
                </motion.h5>
                <motion.p className="text-gray-700 text-base">
                  {items.find((item) => item._id === selectedId)?.description}
                </motion.p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <motion.button
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  onClick={() => setSelectedId(null)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardData;
