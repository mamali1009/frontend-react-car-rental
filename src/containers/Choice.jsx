import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choice.css';

const Choice = () => {
    const navigate = useNavigate();

    const handleSelection = (option) => {
        if (option === 'voice-chat') {
            navigate('/rental/voice-chat');
        } else if (option === 'chatbot') {
            navigate('/rental/chat');
        } else if (option === 'inventory-update') {
            navigate('/rental/inventory-update');
        } else if (option === 'voice-chat'){
            navigate('/rental/voice-chat');   
        }
        
    };

    return (
        <div className="choice-container">
            <h1>Select an Option</h1>
            <div className="button-group">
                <button className="wide-button" onClick={() => handleSelection('form')}>Form Interface</button>
                <button className="wide-button" onClick={() => handleSelection('chatbot')}>Chatbot</button>
                <button className="wide-button" onClick={() => handleSelection('inventory-update')}>Update Inventory</button>
                <button className="wide-button" onClick={() => handleSelection('voice-chat')}>Voice Chat</button>
            </div>
        </div>
    );
};

export default Choice;
