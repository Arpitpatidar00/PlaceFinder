import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";
import Loader from "../../Loader/Loader";

// Static video data (replace with your actual video data)
const videos = [
  {
    _id: "1",
    contentType: "video/mp4",
    src: "https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4",
    metadata: {
      title: "Video 1",
    },
  },
  {
    _id: "2",
    contentType: "video/mp4",
    src: "https://videos.pexels.com/video-files/18869378/18869378-uhd_2560_1440_60fps.mp4",
    metadata: {
      title: "Video 2",
    },
  },
  {
    _id: "3",
    contentType: "video/mp4",
    src: "https://videos.pexels.com/video-files/6662348/6662348-uhd_2560_1440_24fps.mp4",
    metadata: {
      title: "Video 3",
    },
  },
  // Add more videos as needed
];

// Memoized component for individual video items
const VideoItem = ({ video }) => (
  <div className="relative">
    <video className="w-full aspect-video" autoPlay loop muted>
      <source src={video.src} type={video.contentType} />
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-white"></div>
  </div>
);

const VideoSlider = () => {
  const SampleNextArrow = ({ onClick }) => (
    <button
      className="carousel-button next"
      onClick={onClick}
      aria-label="Next"
    >
      Next
    </button>
  );

  const SamplePrevArrow = ({ onClick }) => (
    <button
      className="carousel-button prev"
      onClick={onClick}
      aria-label="Previous"
    >
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
    cssEase: "ease-in-out",
  };

  return (
    <div className="carousel-container">
      {videos.length > 0 ? (
        <Slider {...settings}>
          {videos.map((video) => (
            <VideoItem key={video._id} video={video} />
          ))}
        </Slider>
      ) : (
        <div className="loading-message">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default VideoSlider;
