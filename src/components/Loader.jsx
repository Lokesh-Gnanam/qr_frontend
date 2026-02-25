import React from 'react';
import './Loader.css';

const Loader = ({ progress }) => {
  return (
    <div className="loader-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">
        {progress < 100 ? 'Uploading...' : 'Please wait your QR will be generated Soon!'}
      </p>
    </div>
  );
};

export default Loader;