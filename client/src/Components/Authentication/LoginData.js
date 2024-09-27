import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  border-radius: 0;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: calc(100vh - 65px);
  margin: 0;
  padding: 10px;
  overflow: auto;
  transition: all 0.3s ease;
  position: relative;

  // Medium screens
  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }

 
`;

// Container for SignUp
export const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100%;
  transition: transform 0.6s ease, opacity 0.6s ease;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  padding: 10px;

  ${({ signinIn }) =>
    signinIn !== true &&
    `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `}

  // Medium screens
  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(0);
    opacity: 1;
    z-index: 5;
    flex-direction: column;
    font-size: 14px;
    padding: 15px;
    
  }

  // Small screens
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;

// Container for SignIn
export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  padding: 10px;
  

  ${({ signinIn }) => signinIn !== true && `transform: translateX(100%);`}

  // Medium screens
  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(0);
  }
`;

// Form styling
export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 50px;
  border-radius:20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  height: 100%;
  text-align: center;
  width: 100%;
  max-width: 100%;

  // Medium screens
  @media (max-width: 768px) {
    padding: 20px;
  }

  // Small screens
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

// Role Selector styling
export const RoleSelector = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;

  li {
    margin: 12px 0;
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;

    &:hover {
      background-color: #ff4b2b;
      color: #ffffff;
    }
  }

  // Medium screens
  @media (max-width: 768px) {
    margin: 10px 0;
    li {
      margin: 8px 0;
      padding: 10px;
    }
  }

  // Small screens
  @media (max-width: 480px) {
    
    margin: 5px 0;
    li {
      margin: 6px 0;
      padding: 8px;
    }
  }
`;

// Title styling
export const Title = styled.h1`
  font-weight: bold;
  margin: 0 0 20px;
  font-size: 28px;
  color: #333;

  // Medium screens
  @media (max-width: 768px) {
    font-size: 24px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

// Select dropdown styling
export const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;

  &:focus {
    border-color: #ff4b2b;
    outline: none;
  }

  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Input field styling
export const Input = styled.input`
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px 15px;
  margin: 10px 0;
  width: 100%;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff4b2b;
    box-shadow: 0 0 0 2px rgba(255, 75, 43, 0.5);
  }

  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Toggle Wrapper styling
export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  gap: 20px;

  // Medium screens
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  // Small screens
  @media (max-width: 480px) {
    gap: 10px; // Reduce gap on smaller screens
  }
`;

// Paragraph styling
export const P = styled.p`
  margin: 0;
  font-size: 16px;
  color: #333;

  // Medium screens
  @media (max-width: 768px) {
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// Button styling
export const Button = styled.button`
  border-radius: 25px;
  border: none;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 80ms ease-in,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #e83e2a;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 75, 43, 0.5);
  }

  margin-top: 20px;

  // Medium screens
  @media (max-width: 768px) {
    padding: 10px 30px;
    font-size: 14px;
  }

  // Small screens
  @media (max-width: 480px) {
    padding: 8px 20px;
    font-size: 12px;
  }
`;

// Ghost Button styling
export const GhostButton = styled(Button)`
  background-color: transparent;
  border: 2px solid #ff4b2b;
  color: #ff4b2b;

  &:hover {
    background-color: #ff4b2b;
    color: #ffffff;
  }
`;

// Anchor link styling
export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #ff4b2b;
  }

  // Medium screens
  @media (max-width: 768px) {
    font-size: 12px;
  }

  // Small screens
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  padding: 10px;
  border-radius:20px;

  
  ${({ signinIn }) => signinIn !== true && `transform: translateX(-100%);`}
`;

export const Overlay = styled.div`
  /* background: linear-gradient(to right, #ff4b2b, #ff416c); */
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  
  ${({ signinIn }) => signinIn !== true && `transform: translateX(50%);`}
`;

export const OverlayPanel = styled.div`
  background: url("https://static.vecteezy.com/system/resources/previews/026/717/011/non_2x/group-of-happy-friends-and-laughing-tourism-travel-people-sharing-good-and-positive-mood-backpack-camping-hiking-journey-travel-trek-concept-with-blurred-background-generative-ai-illustration-free-photo.jpg")
    center center / cover no-repeat;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  border-radius:20px;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(0);`}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${({ signinIn }) => signinIn !== true && `transform: translateX(20%);`}
`;

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 400; /* Changed to normal weight */
  line-height: 24px; /* Increased line height for better readability */
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

// Styles for file input
export const FileInput = styled(Input).attrs({ type: "file" })`
  padding: 10px; /* Adjust padding for file input */
  border: none; /* Remove border */
  background-color: #ffffff; /* White background */
  margin: 10px 0; /* Space above and below */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s ease; /* Smooth transition for background color */

  &:hover {
    background-color: #f0f0f0; /* Light gray on hover */
  }
`;

// Keyframe animation for sliding in from the left
const slideInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Keyframe animation for sliding in from the right
const slideInRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Keyframe animation for fading out to the left
const fadeOutLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

// Keyframe animation for fading out to the right
const fadeOutRight = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

// SliderContainer with smoother animation for step switching
export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 20px;
  transition: box-shadow 0.3s ease-in-out;

  /* Apply smoother slide in animation */
  &.slide-in-left {
    animation: ${slideInLeft} 10s forwards ease-in-out; // Adjusted duration
  }

  &.slide-in-right {
    animation: ${slideInRight} 1s forwards ease-in-out; // Adjusted duration
  }

  /* Apply smoother fade out animation */
  &.fade-out-left {
    animation: ${fadeOutLeft} 10s forwards ease-in-out; // Adjusted duration
  }

  &.fade-out-right {
    animation: ${fadeOutRight} 1s forwards ease-in-out; // Adjusted duration
  }

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

export const CheckpointSlider = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  width: 100%; /* Full width */
  height: 8px; /* Slider height */
  background: #ddd; /* Slider track color */
  border-radius: 5px; /* Rounded corners for track */
  outline: none; /* Remove outline */
  transition: background 0.3s ease; /* Smooth transition for track color */

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default styling */
    appearance: none; /* Remove default styling */
    width: 16px; /* Thumb width */
    height: 16px; /* Thumb height */
    border-radius: 50%; /* Rounded thumb */
    background: #ff4b2b; /* Thumb color */
    cursor: pointer; /* Pointer cursor */
    transition: background 0.3s ease, transform 0.2s ease; /* Smooth transition */

    &:hover {
      background: #e83e2a; /* Darker thumb color on hover */
      transform: scale(1.1); /* Slightly enlarge thumb on hover */
    }
  }

  &::-moz-range-thumb {
    width: 16px; /* Thumb width */
    height: 16px; /* Thumb height */
    border-radius: 50%; /* Rounded thumb */
    background: #ff4b2b; /* Thumb color */
    cursor: pointer; /* Pointer cursor */
    transition: background 0.3s ease, transform 0.2s ease; /* Smooth transition */

    &:hover {
      background: #e83e2a; /* Darker thumb color on hover */
      transform: scale(1.1); /* Slightly enlarge thumb on hover */
    }
  }

  &::-ms-thumb {
    width: 16px; /* Thumb width */
    height: 16px; /* Thumb height */
    border-radius: 50%; /* Rounded thumb */
    background: #ff4b2b; /* Thumb color */
    cursor: pointer; /* Pointer cursor */
    transition: background 0.3s ease, transform 0.2s ease; /* Smooth transition */

    &:hover {
      background: #e83e2a; /* Darker thumb color on hover */
      transform: scale(1.1); /* Slightly enlarge thumb on hover */
    }
  }

  @media (max-width: 768px) {
    height: 6px; /* Adjust height for mobile */
  }
`;
// CheckpointLabel with hover effects
export const CheckpointLabel = styled.label`
  font-size: 13px;
  color: #555555;
  margin-top: 8px;
  letter-spacing: 0.5px;
  font-weight: 500;
  text-transform: capitalize;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #4a90e2;
  }
`;
