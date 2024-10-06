import React from 'react';
import ReactDOM from 'react-dom';
import './Alert.css'; // Ensure the CSS is imported

// CustomConfirm component that mimics a confirm dialog
const CustomConfirm = ({ message, onConfirm, onCancel }) => {
  return ReactDOM.createPortal(
    <div className="custom-confirm-overlay">
      <div className="custom-confirm-box">
        <p>{message}</p>
        <div>
          <button onClick={onConfirm}>OK</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const showAlert = (message) => {
  return new Promise((resolve) => {
    const handleConfirm = () => {
      resolve(true);
      closeConfirm();
    };

    const handleCancel = () => {
      resolve(false);
      closeConfirm();
    };

    const closeConfirm = () => {
      ReactDOM.unmountComponentAtNode(confirmContainer);
      document.body.removeChild(confirmContainer);
    };

    const confirmContainer = document.createElement('div');
    document.body.appendChild(confirmContainer);

    ReactDOM.render(
      <CustomConfirm
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />,
      confirmContainer
    );
  });
};
