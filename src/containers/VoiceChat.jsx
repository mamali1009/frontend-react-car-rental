import React, { useState } from 'react';
import axios from 'axios';
import { ReactMic } from 'react-mic';
import './VoiceChat.css';
import { useNavigate } from 'react-router-dom';

const VoiceChat = () => {
  const [record, setRecord] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    setAudioBlob(recordedBlob.blob);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!audioBlob || !username) {
      setError('Both audio recording and username are required.');
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('username', username);

    try {
      const res = await axios.post('http://54.213.93.110:5000/rental/voice-chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        }
      });
      navigate('/rental/voice-chat-result', { state: { response: res.data } });
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="voice-chat-container">
      <h1>Car Rental Voice Chat</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} required />
        </div>
        <div className="form-group">
          <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            onData={onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <button type="button" onClick={startRecording}>Start Recording</button>
          <button type="button" onClick={stopRecording}>Stop Recording</button>
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceChat;