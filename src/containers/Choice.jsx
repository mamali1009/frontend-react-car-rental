import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Choice.css';

const Choice = () => {
    const navigate = useNavigate();

    const handleSelection = (option) => {
        if (option === 'form') {
            navigate('/rental/form');
        } else if (option === 'chatbot') {
            navigate('/rental/chat');
        } else if (option === 'inventory-update') {
            navigate('/rental/inventory-update');
        } 
        
    };

    return (
        <div className="choice-container">
            <h1>Select an Option</h1>
            <div className="button-group">
                <button className="wide-button" onClick={() => handleSelection('form')}>Form Interface</button>
                <button className="wide-button" onClick={() => handleSelection('chatbot')}>Chatbot</button>
                <button className="wide-button" onClick={() => handleSelection('inventory-update')}>Update Inventory</button>
                
            </div>
        </div>
    );
};

export default Choice;
