import React, { useEffect, useState } from "react";
import Search from "../Views/Search.js";
import Slider from "../Views/Sliderimg/Slider.js";
import Feedback from "./Feedbackshow.js";
import { useNavigate, Link } from "react-router-dom";

import "./Screen.css";
import CardData from "./CardData.js";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const [places] = useState([]);
  const [isVisibleAbout, setIsVisibleAbout] = useState(false);
  const [isVisibleFeatured, setIsVisibleFeatured] = useState(false);
  const [isVisibleFeedback, setIsVisibleFeedback] = useState(false);

  useEffect(() => {
    const accessToken = !localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const aboutText = document.getElementById("aboutText");
      const featuredText = document.getElementById("featuredText");
      const feedbackText = document.getElementById("feedbackText");

      if (aboutText) {
        const { top } = aboutText.getBoundingClientRect();
        setIsVisibleAbout(top < window.innerHeight - 100);
      }

      if (featuredText) {
        const { top } = featuredText.getBoundingClientRect();
        setIsVisibleFeatured(top < window.innerHeight - 100);
      }

      if (feedbackText) {
        const { top } = feedbackText.getBoundingClientRect();
        setIsVisibleFeedback(top < window.innerHeight - 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div id="maindiv">
        <div id="slider">
          <Slider />
        </div>

        {/* Search Container */}
        <div >
          {/* Render the Search component */}
          <Search />
        </div>

        {/* About Text */}
        <div
          id="aboutText"
          className={`abouttext ${isVisibleAbout ? "visible" : ""}`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            KNOW ABOUT SOME PLACES BEFORE YOUR TRAVEL
          </motion.h1>
        </div>

        <div>
          <CardData />
        </div>

        {/* Featured Places */}
        <div
          id="featuredText"
          className={`featuredtext ${isVisibleFeatured ? "visible" : ""}`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            FEATURED PLACES
          </motion.h1>
        </div>

        {/* Card Container */}
        <div className="card-container">
          {places.map((place, index) => (
            <Link to={`/places/${place._id}`} key={index} className="card-link">
              <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 card">
                <a href="#!" data-twe-ripple-init data-twe-ripple-color="light">
                  <img
                    className="rounded-t-lg card-image"
                    src={place.image}
                    alt=""
                  />
                </a>
                <div className="p-6 card-content">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 card-title">
                    {place.title}
                  </h5>
                  <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 card-description">
                    {place.description}
                  </p>
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    Button
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          id="feedbackText"
          className={`feedbacktext ${isVisibleFeedback ? "visible" : ""}`}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Feedback
          </motion.h1>
        </div>
        <div>
          <Feedback />
        </div>
      </div>
    </>
  );
};

export default Home;
