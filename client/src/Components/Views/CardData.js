import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { setPlaceId } from "../../actions/placeActions.js";
import "../Card.css";
import { useAuth } from "../../Context/AuthContext.js";
import Api from '../../Api.js';
import Loader from "../Loader/Loader.js";

const CardData = () => {
  const { items, setItems } = useAuth();
  const [selectedId, setSelectedId] = useState(null);
  const [ref, inView] = useInView();
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => { 

    const fetchData = async () => {
      setLoading(true); // Activate loader

      try {

        const response = await fetch(`${Api}/add/`);
        const data = await response.json(); 
        setItems(data); // Set items directly without using slice
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false); // Deactivate loader after the process is complete
      }
    };

    fetchData();
  }, [setItems]);

  const handleCardClick = (_id) => {
    setSelectedId(_id);
    dispatch(setPlaceId(_id));
    navigate(`/details/${_id}`);
  };

  return (
    <>
    {loading ? <Loader /> : (
    <div ref={ref} className={`card-container ${inView ? "visible" : ""}`}>
      {items.map((item) => (
        <div key={item._id} className="card-link" onClick={() => handleCardClick(item._id)}>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <motion.div
                  layoutId={item._id}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="max-w-sm rounded overflow-hidden shadow-lg relative card"
                >
                  <img className="w-full img" src={item.image} alt={item.placeName} />
                  <div className="container-card">
                    <motion.h5 className="font-bold text-xl mb-2 placename">{item.placeName}</motion.h5>
                  </div>
                </motion.div>
              </div>
              <div className="flip-card-back">
                <p className="card-title">{item.placeName},{item.cityName}</p>
                <p>{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedId && (
          <motion.div
            layoutId={selectedId}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixedtop-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
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
    )}</>
  );
};

export default CardData;
