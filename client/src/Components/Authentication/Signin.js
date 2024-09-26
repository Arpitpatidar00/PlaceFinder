import React, { useEffect, useState } from "react";

import { FaCheckCircle } from "react-icons/fa"; // Import icon
import * as Components from "./LoginData.js";
import "../Views/Screen.css";
import { useAuth } from "../../Context/AuthContext.js";
import { signUp, signInUser } from "../../Services/api.js";
const TOTAL_STEPS = 5;

function Login() {
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
  const { islogin, setIsLogin, isMobile, setIsMobile } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 && window.innerWidth > 360);
    };

    handleResize(); // Check the size on initial load
    window.addEventListener("resize", handleResize); // Attach resize event listener

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, []);

  const istoggleSignIn = () => {
    toggle(true);
    setIsLogin(false);
  };
  const istoggleSignUp = () => {
    toggle(false);
    setIsLogin(true);
  };

  const handleNext = () => {
    // Validation for each step
    if (step === 1) {
      if (!role) return; // Role must be selected
    }
    if (step === 2) {
      if (!name || !email || !password) return; // All fields must be filled
    }
    if (step === 3) {
      if (!image) return; // Profile image must be uploaded
      if (role === "driver" && (!licenseNo || !licenseImage)) return; // Driver-specific validation
      if (role === "guide" && (!aadharNo || !aadharImage)) return; // Guide-specific validation
    }
    if (step === 4) {
      // Any additional validation for step 4 can go here
      if (!image) return; // Document image must be uploaded
    }

    if (step < 5) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const userData = {
        name,
        email,
        password,
        role,
        profileImage: image ? await convertToBase64(image) : null, // Check if image exists
      };
  
      if (role === 'driver') {
        userData.licenseNo = licenseNo;
        userData.licenseImage = licenseImage || null; // Check if licenseImage exists
      } else if (role === 'guide') {
        userData.aadharNo = aadharNo;
        userData.aadharImage = aadharImage || null; // Check if aadharImage exists
      }
  
      const response = await signUp(userData); // Replace with your signup function
      alert('Signup successful!');
      console.log('Signup successful:', response);
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup. Please try again.');
    }
  };
  
  

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Construct loginData as an object
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await signInUser(loginData); // Send login data

      if (response.token && response.user) {
        localStorage.setItem("userData", JSON.stringify(response.user)); // Store user data in local storage as a JSON string

        localStorage.setItem("token", response.token); // Store token in local storage
        // Redirect to dashboard or another page
      }
    } catch (error) {
      console.error("Error during signin:", error);
      // Optionally handle the error in the UI
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await convertToBase64(file);
      setImage(base64String);
    } else {
      console.error('No file selected or file is not valid');
    }
  };
  
  const handleLicenseImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await convertToBase64(file);
      setLicenseImage(base64String);
    } else {
      console.error('No license file selected or file is not valid');
    }
  };
  
  const handleAadharImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64String = await convertToBase64(file);
      setAadharImage(base64String);
    } else {
      console.error('No Aadhar file selected or file is not valid');
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
  return (
    <Components.Container>
      {islogin && (
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.SliderContainer>
              {/* Step Indicators */}
              <div className="step-indicators">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className={`step-indicator ${step >= s ? "active" : ""}`}
                  >
                    <FaCheckCircle />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <Components.CheckpointSlider
                type="range"
                min="1"
                max="5"
                value={step}
                readOnly
              />
            </Components.SliderContainer>

            {/* Step 1 */}
            <div
              className={`step-container ${step === 1 ? "visible" : "hidden"}`}
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

            {/* Step 2 */}
            <div
              className={`step-container ${step === 2 ? "visible" : "hidden"}`}
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

            {/* Step 3 */}
            <div
              className={`step-container ${step === 3 ? "visible" : "hidden"}`}
            >
              <Components.Title>Upload Profile Image</Components.Title>
              <Components.Input
                type="file"
                placeholder="Profile Image"
                onChange={handleImageChange} // Use the updated function
              />
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

            {/* Step 4 */}
            <div
              className={`step-container ${step === 4 ? "visible" : "hidden"}`}
            >
              <Components.Title>Upload Documents Image</Components.Title>
              <Components.Input
                type="file"
                placeholder="Document Image"
                onChange={(e) => setImage(e.target.files[0])}
              />
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

            {/* Step 5 */}
            <div
              className={`step-container ${step === 5 ? "visible" : "hidden"}`}
            >
              <Components.Title>Review Your Information</Components.Title>
              {/* Display summary of user input */}
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
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>

          {isMobile && (
            <Components.GhostButton onClick={istoggleSignIn}>
              Sign Up
            </Components.GhostButton>
          )}
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
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={istoggleSignUp}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      )}
    </Components.Container>
  );
}

export default Login;
