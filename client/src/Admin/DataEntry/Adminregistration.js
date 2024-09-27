import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Components/Views/Screen.css";
import './admin.css';
import Api from "../../Api";

function AdminRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
  });

  const [preview, setPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = preview ? preview.split(",")[1] : "";

await axios.post(`${Api}/admin/register`, {
        ...formData,
        image: imageData,
      });

      toast.success("Successfully registered user.");
      navigate("/Adminhome");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Failed to register user. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setPreview(base64data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="main">
      <div
        id="container-login"
        style={{
          width: "90%",
          maxWidth: "500px",
          padding: "20px",
         
        }}
      >
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              id="input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address:</label>
            <input
              id="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              id="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number:</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>User Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}
          </div>

          <div className="form-group">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        <div className="link">
          <p>
            Already have an account? <Link to="/Adminhome">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistration;
