import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './Startpage.css';
import { ToastContainer, toast } from 'react-toastify';

const StartPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleStartClick = () => {
    if (!isAuthenticated) {
      toast("Login to explore");
    } else {
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="container my-12 mx-auto md:px-6">
        <section className="mb-15 text-center lg:text-left">
          <div className="px-6 py-5 md:px-6">
            <div className="grid items-center lg:grid-cols-2 lg:gap-x-12">
              <div className="mb-8 lg:mb-0">
                <h2 className="my-12 text-5xl font-bold leading-tight tracking-tight">
                  Are you ready <br />
                  <span className="text-success dark:text-success-400">
                    for an adventure?
                  </span>
                </h2>
                <button
                className="start-page-btn"
                  onClick={handleStartClick}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Get started
                </button>
                <a
                  href="#!"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                </a>
              </div>

              <div className="mb-0 lg:mb-0">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/051.jpg"
                  className="w-full rounded-lg shadow-lg dark:shadow-black/20"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StartPage;
