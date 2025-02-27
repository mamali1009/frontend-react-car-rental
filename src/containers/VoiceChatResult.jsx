import React from 'react';
import { useLocation } from 'react-router-dom';
import './VoiceChatResult.css'; // Import the new CSS file

const VoiceChatResult = () => {
  const location = useLocation();
  const { response } = location.state || {};

  return (
    <div className="result-container">
      <h1>Voice Chat Response</h1>
      {response ? (
        <>
          <div className="transcript">
            <h3>Transcript</h3>
            <p>{response.transcript}</p>
          </div>
          <div className="output">
            <h3>Output</h3>
            <pre>{formatOutput(response.output)}</pre>
          </div>
        </>
      ) : (
        <p>No result available.</p>
      )}
    </div>
  );
};

const formatOutput = (output) => {
  const lines = output.split('\n');
  return lines.map((line, index) => <p key={index}>{line}</p>);
};

export default VoiceChatResult;