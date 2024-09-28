import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import Api from '../../../Api';
import Loader from '../../Loader/Loader';

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${Api}/video/video`); // Ensure URL is correct
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const SampleNextArrow = ({ onClick }) => (
    <button className="carousel-button next" onClick={onClick}>
      Next
    </button>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <button className="carousel-button prev" onClick={onClick}>
      Prev
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    cssEase: 'ease-in-out',
  };

  return (
    <div className="carousel-container">
      {videos.length > 0 ? (
        <Slider {...settings}>
          {videos.map((video) => (
            <div key={video._id} className="relative">
              <video className="w-full" autoPlay loop muted>
                <source
                  src={`${Api}/video/video/${video._id}`} // Ensure this URL is correct
                  type={video.contentType}
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-white">
                <h5 className="text-xl">{video.metadata.title}</h5>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="loading-message"><Loader/></div> // Optional loading state
      )}
    </div>
  );
};

export default VideoSlider;
