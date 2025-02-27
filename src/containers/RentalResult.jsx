import React from 'react';
import { useLocation } from 'react-router-dom';
import './RentalResult.css'; // Import the new CSS file

const RentalResult = () => {
  const location = useLocation();
  const { output } = location.state || {};

  return (
    <div className="result-container">
      <h1>Recommended Cars and Ancillaries</h1>
      {output ? (
        <div className="output-content">{output}</div>
      ) : (
        <p>No result available.</p>
      )}
    </div>
  );
};

export default RentalResult;