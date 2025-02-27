import React from 'react';
import { useLocation } from 'react-router-dom';
import './ChatbotResult.css'; // Import the new CSS file

const ChatbotResult = () => {
  const location = useLocation();
  const { output } = location.state || {};

  return (
    <div className="result-container">
      <h1>Chatbot Response</h1>
      {output ? (
        <div className="output-content">{output}</div>
      ) : (
        <p>No result available.</p>
      )}
    </div>
  );
};

export default ChatbotResult;