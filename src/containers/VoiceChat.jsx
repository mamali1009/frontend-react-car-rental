import React, { useState } from 'react';
import axios from 'axios';
import { ReactMic } from 'react-mic';
import './VoiceChat.css';

const VoiceChat = () => {
    const [record, setRecord] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [username, setUsername] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

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
        setResponse(null);

        if (!audioBlob || !username) {
            setError('Both audio recording and username are required.');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.mp3');
        formData.append('username', username);

        try {
            const res = await axios.post('https://5s6t4kg9vb.execute-api.us-west-2.amazonaws.com/production/rental/voice-chat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponse(res.data);
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
            {response && (
                <div className="response">
                    <h2>Response</h2>
                    <div className="transcript">
                        <h3>Transcript</h3>
                        <p>{response.transcript}</p>
                    </div>
                    <div className="output">
                        <h3>Output</h3>
                        <pre>{formatOutput(response.output)}</pre>
                    </div>
                </div>
            )}
            {error && (
                <div className="error">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

const formatOutput = (output) => {
    const lines = output.split('\n');
    return lines.map((line, index) => <p key={index}>{line}</p>);
};

export default VoiceChat;
