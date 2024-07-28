import React, { useEffect, useState, useRef } from 'react';
import { TECarousel, TECarouselItem } from 'tw-elements-react';
import axios from 'axios';
import './style.css';

export default function Slider() {
  const [videos, setVideos] = useState([]);
  const carouselRef = useRef(null); // Create a ref for the carousel

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/video/video');
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrevious = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  return (
    <div className="carousel-container">x
      <TECarousel
        showControls
        showIndicators
        crossfade
        ride="carousel"
        ref={carouselRef} // Attach the ref to the carousel
      >
        {videos.map((video, index) => (
          <TECarouselItem
            key={video._id}
            itemID={index + 1}
            className="relative float-left -mr-[100%] hidden w-full !transform-none transition-opacity duration-[600ms] ease-in-out motion-reduce:transition-none"
          >
            <video className="w-full" autoPlay loop muted>
              <source
                src={`http://localhost:4000/video/video/${video._id}`}
                type={video.contentType}
              />
            </video>
            <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
              <h5 className="text-xl">{video.title}</h5>
              {/* Uncomment if description is needed */}
              {/* <p>{video.description}</p> */}
            </div>
          </TECarouselItem>
        ))}
      </TECarousel>
      <button className="carousel-button prev" onClick={handlePrevious}>Previous</button>
      <button className="carousel-button next" onClick={handleNext}>Next</button>
    </div>
  );
}
