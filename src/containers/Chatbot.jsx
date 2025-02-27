import React, { useState, useContext, useEffect } from 'react';
import './Chatbot.css';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const { username } = useContext(UserContext);
  const [prompt, setPrompt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initialMessage = "Hi! I'm your car rental assistant. Please tell me about your rental needs including pickup/dropoff location, dates, number of people, and any preferences you have.";
    setMessages([{ sender: 'chatbot', text: initialMessage }]);
  }, []);

  const handleChat = async (e) => {
    e.preventDefault();
    const userMessage = { sender: 'user', text: prompt };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('http://54.213.93.110:5000/rental/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ prompt, username }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const botMessage = { sender: 'chatbot', text: data.output };
        setMessages(messages => [...messages, userMessage, botMessage]);
        if(data.success) {
          navigate('/rental/chat-result', { state: { output: data.output } });
        }
      } else {
        setErrorMessage(data.message || 'An error occurred while processing your request');
        setMessages(messages => [...messages, userMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Failed to connect to the server');
      setMessages(messages => [...messages, userMessage]);
    }

    setPrompt('');
  };

  return (
    <div className="main-container">
      <div className="chatbot-container">
        <h1>Chatbot</h1>
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <strong>{message.sender === 'chatbot' ? 'Chatbot' : 'You'}:</strong> {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleChat}>
          <textarea
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage && <div className="response error">Error: {errorMessage}</div>}
      </div>
    </div>
  );
};

export default Chatbot;