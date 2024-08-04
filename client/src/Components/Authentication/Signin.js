
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../actions/authActions";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "../Views/Screen.css";

// function Signin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       navigate("/home");
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;
//     try {
//       const response = await axios.post("http://localhost:4000/auth/login", {
//         email,
//         password,
//       });
//       toast.success("Login successful!");
//       dispatch(loginSuccess(response.data.data._doc, response.data.token));
//       navigate("/home");
//     } catch (error) {
//       console.error("Error logging in:", error);
//       toast.error("Failed to login. Please try again.");
//       setError("Failed to login. Please try again.");
//     }
//   };

//   return (
//     <section className="vh-100">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-sm-6 text-black">
//             <div className="px-5 ms-xl-4">
//               <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: "#709085" }}></i>
//               <span className="h1 fw-bold mb-0">PlaceFinder</span>
//             </div>
//             <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
//               <form style={{ maxWidth: "23rem", width: "100%" }} onSubmit={handleSubmit}>
//                 <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
//                   Log in
//                 </h3>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     className="form-control form-control-lg"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-label" htmlFor="email">
//                     Email address
//                   </label>
//                 </div>
//                 <div className="form-outline mb-4">
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     className="form-control form-control-lg"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <label className="form-label" htmlFor="password">
//                     Password
//                   </label>
//                 </div>
//                 <div className="pt-1 mb-4">
//                   <button className="btn btn-info btn-lg btn-block" type="submit">
//                     Login
//                   </button>
//                 </div>
//                 {error && <p>{error}</p>}
//                 <p className="small mb-5 pb-lg-2"></p>
//                 <p>
//                   Don't have an account? <Link to="/Signup">Register here</Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//           <div className="col-sm-6 px-0 d-none d-sm-block">
//             <img
//               src="https://globalgrasshopper.com/wp-content/uploads/2011/01/Gadi-Sagar.jpg"
//               alt="Login image"
//               className="w-100 vh-100"
//               style={{ objectFit: "cover", objectPosition: "left" }}
//             />
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </section>
//   );
// }

// export default Signin;
// Signin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../actions/authActions";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Views/Screen.css";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      toast.success("Login successful!");
      dispatch(loginSuccess(response.data.data._doc, response.data.token));
      navigate("/home");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to login. Please try again.");
      setError("Failed to login. Please try again.");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-black">
            <div className="px-5 ms-xl-4">
              <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: "#709085" }}></i>
              <span className="h1 mb-0">PlaceFinder</span>
            </div>
            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ maxWidth: "23rem", width: "100%" }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                  Log in
                </h3>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="pt-1 mb-4">
                  <button className="btn btn-info btn-lg btn-block" type="submit">
                    Login
                  </button>
                </div>
                {error && <p>{error}</p>}
                <p className="small mb-5 pb-lg-2"></p>
                <p>
                  Don't have an account? <Link to="/Signup">Register here</Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block px-0">
            <img
              src="https://globalgrasshopper.com/wp-content/uploads/2011/01/Gadi-Sagar.jpg"
              alt="Login image"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Signin;
