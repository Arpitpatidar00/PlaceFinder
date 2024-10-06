import React, { useEffect, useState } from "react";

import * as Components from "./LoginData.js";
import "../Views/Screen.css";
import { useAuth } from "../../Context/AuthContext.js";
import { signUp, signInUser } from "../../Services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader.js";
import { loginSuccess } from "../../actions/authActions.js"; // Import your action creator
import { CiUser } from "react-icons/ci";
import { BiSolidUserDetail } from "react-icons/bi";
import { CiImageOn } from "react-icons/ci";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";

function Login() {
  const navigate = useNavigate();

  const [signIn, toggle] = React.useState(true);
  const [step, setStep] = React.useState(1);
  const [role, setRole] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [licenseNo, setLicenseNo] = React.useState("");
  const [licenseImage, setLicenseImage] = React.useState(null);
  const [aadharNo, setAadharNo] = React.useState("");
  const [aadharImage, setAadharImage] = React.useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { islogin, setIsLogin, isMobile, setIsMobile } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 && window.innerWidth > 360);
    };

    handleResize(); // Check the size on initial load
    window.addEventListener("resize", handleResize); // Attach resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, [setIsMobile]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const istoggleSignIn = () => {
    toggle(true);
    setIsLogin(false);
  };
  const istoggleSignUp = () => {
    toggle(false);
    setIsLogin(true);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Activate loader

    // Validation Functions

    try {
      // Image validation

      const userData = {
        name,
        email,
        password,
        role,
        profileImage: image ? await convertToBase64(image) : null,
      };

      // Add role-specific fields
      if (role === "driver") {
        userData.licenseNo = licenseNo || null;
        if (licenseImage) {
          userData.licenseImage = await convertToBase64(licenseImage);
        }
      } else if (role === "guide") {
        userData.aadharNo = aadharNo || null;
        if (aadharImage) {
          userData.aadharImage = await convertToBase64(aadharImage);
        }
      }

      // Call the signUp function
      const response = await signUp(userData);
      if (response.token && response.user) {
        dispatch(loginSuccess(response.user, response.token));
        toast.success("Signup successful!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error during signup. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Deactivate loader after the process is complete
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Activate loader

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await signInUser(loginData); // Send login data

      if (response.token && response.user) {
        // Dispatch the login success action
        dispatch(loginSuccess(response.user, response.token));

        // Show success notification
        toast.success("Login successful! Welcome back!");

        // Redirect to the home page or another dashboard
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      // Show error notification
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false); // Deactivate loader after the process is complete
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file instanceof Blob) {
        // Check if file is a Blob
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      } else {
        reject(new Error("Parameter is not of type Blob"));
      }
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the file object directly
    } else {
      console.error("No file selected or file is not valid");
    }
  };

  const handleLicenseImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLicenseImage(file); // Set the file object directly
    } else {
      console.error("No license file selected or file is not valid");
    }
  };

  const handleAadharImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadharImage(file); // Set the file object directly
    } else {
      console.error("No Aadhar file selected or file is not valid");
    }
  };

  const renderRoleInputs = () => {
    if (role === "driver") {
      return (
        <>
          <Components.Input
            type="text"
            placeholder="License Number"
            value={licenseNo}
            onChange={(e) => setLicenseNo(e.target.value)}
          />
          <Components.Input
            type="file"
            placeholder="License Image"
            onChange={handleLicenseImageChange}
          />
        </>
      );
    } else if (role === "guide") {
      return (
        <>
          <Components.Input
            type="text"
            placeholder="Aadhar Card Number"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
          />
          <Components.Input
            type="file"
            placeholder="Aadhar Image"
            onChange={handleAadharImageChange}
          />
        </>
      );
    }
    return null;
  };
  const handleNext = () => {
    // Validation Functions
    const validateImageSize = (file) => file.size < 5 * 1024 * 1024; // 5 MB
    const validateDocumentSize = (file) => file.size < 500 * 1024; // 500 KB
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email regex
    const validatePassword = (password) => password.length >= 5; // At least 5 characters
    const validateAadharNo = (aadharNo) => /^\d{12}$/.test(aadharNo); // Exactly 12 digits
    const validateLicenseNo = (licenseNo) => /^\d{16}$/.test(licenseNo); // Exactly 16 digits

    // Step 0 Validation
    if (step === 0) {
      if (!role) {
        toast.warning("Please select a role.");
        return; // Role must be selected
      }
    }

    // Step 1 Validation
    if (step === 1) {
      if (!name || !email || !password) {
        toast.warning("Please fill in all fields.");
        return; // All fields must be filled
      }
      if (!validateEmail(email)) {
        toast.warning("Please enter a valid email address.");
        return; // Validate email format
      }
      if (!validatePassword(password)) {
        toast.warning("Password must be at least 5 characters long.");
        return; // Validate password length
      }
    }

    // Step 2 Validation
    if (step === 2) {
      if (!image) {
        toast.error("Please upload a profile image.");
        return; // Profile image must be uploaded
      }
      if (!validateImageSize(image)) {
        toast.error("Profile image size must be less than 5 MB.");
        return; // Validate image size
      }
    }

    // Step 3 Validation (if needed)
    if (step === 3) {
      // You can add additional fields to validate here if necessary
      if (role === "guide" && !validateAadharNo(aadharNo)) {
        toast.error("Aadhar number must be exactly 12 digits.");
        return;
      }
      if (role === "driver" && !validateLicenseNo(licenseNo)) {
        toast.error("License number must be exactly 16 digits.");
        return;
      }
      if (licenseImage && !validateDocumentSize(licenseImage)) {
        toast.error("License image size must be less than 500 KB.");
        return;
      }
      if (aadharImage && !validateDocumentSize(aadharImage)) {
        toast.error("Aadhar image size must be less than 500 KB.");
        return;
      }
    }

    // Move to the next step if all validations pass
    if (step < 4) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Components.Container>
          {islogin && (
            <Components.SignUpContainer signinIn={signIn}>
              <Components.Form onSubmit={handleSignUp}>
                <Components.SliderContainer>
                  {/* Step Indicators */}
                  <div className="step-indicators">
                    {[
                      <CiUser />,
                      <BiSolidUserDetail />,
                      <CiImageOn />,
                      <IoDocumentAttachOutline />,
                      <SiGnuprivacyguard />,
                    ].map((icon, index) =>
                      index === 3 &&
                      !(role === "driver" || role === "guide") ? null : (
                        <div
                          key={index}
                          className={`step-indicator ${
                            step >= index ? "active" : ""
                          }`}
                        >
                          <span>{icon}</span>
                        </div>
                      )
                    )}
                  </div>
                  <Components.CheckpointSlider
                    type="range"
                    min={0}
                    max={role === "driver" || role === "guide" ? 4 : 3}
                    value={step}
                    readOnly
                  />
                </Components.SliderContainer>

                <div
                  className={`step-container ${
                    step === 0 ? "visible" : "hidden"
                  }`}
                >
                  <Components.Title>Select Your Role</Components.Title>
                  <Components.RoleSelector>
                    <Components.Select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">--Please choose an option--</option>
                      <option value="user">User</option>
                      <option value="driver">Driver</option>
                      <option value="guide">Guide</option>
                    </Components.Select>
                  </Components.RoleSelector>
                  <Components.Button
                    type="button"
                    onClick={handleNext}
                    disabled={!role}
                  >
                    Next
                  </Components.Button>
                </div>

                {/* Step 2: Basic Information */}
                <div
                  className={`step-container ${
                    step === 1 ? "visible" : "hidden"
                  }`}
                >
                  <Components.Title>Basic Information</Components.Title>
                  <Components.Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Components.Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Components.Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Components.ToggleWrapper>
                    <Components.Button type="button" onClick={handlePrevious}>
                      Previous
                    </Components.Button>
                    <Components.Button type="button" onClick={handleNext}>
                      Next
                    </Components.Button>
                  </Components.ToggleWrapper>
                </div>

                {/* Step 3: Upload Profile Image */}
                <div
                  className={`step-container ${
                    step === 2 ? "visible" : "hidden"
                  }`}
                >
                  <Components.Title>Upload Profile Image</Components.Title>
                  <Components.Input
                    type="file"
                    placeholder="Profile Image"
                    onChange={handleImageChange}
                  />
                  <Components.ToggleWrapper>
                    <Components.Button type="button" onClick={handlePrevious}>
                      Previous
                    </Components.Button>
                    <Components.Button type="button" onClick={handleNext}>
                      Next
                    </Components.Button>
                  </Components.ToggleWrapper>
                </div>

                {/* Step 4: Upload Documents (if applicable) */}
                {role === "driver" || role === "guide" ? (
                  <div
                    className={`step-container ${
                      step === 3 ? "visible" : "hidden"
                    }`}
                  >
                    <Components.Title>Upload Documents Image</Components.Title>
                    {renderRoleInputs()}
                    <Components.ToggleWrapper>
                      <Components.Button type="button" onClick={handlePrevious}>
                        Previous
                      </Components.Button>
                      <Components.Button type="button" onClick={handleNext}>
                        Next
                      </Components.Button>
                    </Components.ToggleWrapper>
                  </div>
                ) : null}

                {/* Step 5: Review Information */}
                <div
                  className={`step-container ${
                    step === (role === "driver" || role === "guide" ? 4 : 3)
                      ? "visible"
                      : "hidden"
                  }`}
                >
                  <Components.Title>Review Your Information</Components.Title>
                  <Components.P>
                    <strong>Name:</strong> {name}
                    <br />
                    <strong>Email:</strong> {email}
                    <br />
                    <strong>Role:</strong> {role}
                    <br />
                    {role === "driver" && (
                      <>
                        <strong>License No:</strong> {licenseNo}
                        <br />
                      </>
                    )}
                    {role === "guide" && (
                      <>
                        <strong>Aadhar No:</strong> {aadharNo}
                        <br />
                      </>
                    )}
                  </Components.P>
                  <Components.ToggleWrapper>
                    <Components.Button type="button" onClick={handlePrevious}>
                      Previous
                    </Components.Button>
                    <Components.Button type="submit">Sign Up</Components.Button>

                    {/* Sign In Button for Mobile Users */}
                    {isMobile && (
                      <Components.GhostButton onClick={() => toggle(false)}>
                        Sign In
                      </Components.GhostButton>
                    )}
                  </Components.ToggleWrapper>
                </div>
              </Components.Form>
            </Components.SignUpContainer>
          )}
          {/* Sign In Container and Overlay remain unchanged */}
          {!islogin && (
            <Components.SignInContainer signinIn={signIn}>
              <Components.Form onSubmit={handleSignIn}>
                <Components.Title>Sign in</Components.Title>
                <Components.Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Components.Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Components.Anchor href="#"></Components.Anchor>
                <Components.Button type="submit">Sign In</Components.Button>
              </Components.Form>
            </Components.SignInContainer>
          )}
          {!isMobile && (
            <Components.OverlayContainer signinIn={signIn} isMobile={true}>
              <Components.Overlay signinIn={signIn}>
                <Components.LeftOverlayPanel signinIn={signIn}>
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.Paragraph>
                    Enter Your personal details and start your journey with us
                  </Components.Paragraph>
                  <Components.GhostButton onClick={istoggleSignIn}>
                    Sign In
                  </Components.GhostButton>
                </Components.LeftOverlayPanel>
                <Components.RightOverlayPanel signinIn={signIn}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                    To keep connected with us please login with your personal
                    info
                  </Components.Paragraph>
                  <Components.GhostButton onClick={istoggleSignUp}>
                    Sign Up
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>
          )}
          <ToastContainer />
        </Components.Container>
      )}
    </>
  );
}

export default Login;
