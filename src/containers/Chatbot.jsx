import React, { useState, useContext, useEffect } from 'react';
import './Chatbot.css';
import { UserContext } from '../App';

const API_BASE_URL ='https://fb4g06zjra.execute-api.us-west-2.amazonaws.com/prod';

const Chatbot = () => {
    const { username } = useContext(UserContext);
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMetrics, setShowMetrics] = useState(false);
    const [metrics, setMetrics] = useState(null);
    const [conversationHistory, setConversationHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initialMessage = "Hi! I'm your car rental assistant. Please tell me about your rental needs including pickup/dropoff location, dates, number of people, and any preferences you have.";
        setMessages([{ sender: 'chatbot', text: initialMessage }]);
    }, []);

    const handleChat = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userMessage = { sender: 'user', text: prompt };
        setMessages(prev => [...prev, userMessage]);

        try {
            const response = await fetch(`${API_BASE_URL}/rental/chat`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ 
                    prompt, 
                    username, 
                    conversation_history: conversationHistory 
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                if (data.needs_more_info) {
                    setOutput(data.follow_up_questions);
                    setMessages(prev => [...prev, { sender: 'chatbot', text: data.follow_up_questions }]);
                    setConversationHistory(data.conversation_history);
                } else {
                    setOutput(data.output);
                    setMessages(prev => [...prev, { sender: 'chatbot', text: data.output }]);
                    setConversationHistory([]);
                }
                setErrorMessage('');
            } else {
                setErrorMessage(data.message || 'An error occurred');
                setOutput('');
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while processing your request.');
            setOutput('');
        } finally {
            setIsLoading(false);
            setPrompt('');
        }
    };

    const fetchMetrics = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/rental/metrics`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                   
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMetrics(data.metrics);
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while fetching metrics.');
        }
    };

    return (
        <div className="main-container">
            <div className="chatbot-container">
                <h1>Car Rental Assistant</h1>
                <div className="chat-window">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                            <strong>{message.sender === 'chatbot' ? 'Assistant' : 'You'}:</strong> {message.text}
                        </div>
                    ))}
                    {isLoading && <div className="message loading">Loading...</div>}
                </div>
                <form onSubmit={handleChat}>
                    <textarea
                        placeholder="Enter your message..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !prompt.trim()}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
                {output && (
                    <div className="response">
                        <h2>Response Details</h2>
                        <div className="output-content">{output}</div>
                        <button onClick={() => setShowMetrics(true)}>Show Metrics</button>
                    </div>
                )}
                {showMetrics && (
                    <div className="metrics">
                        <h2>Performance Metrics</h2>
                        <button onClick={fetchMetrics}>Refresh Metrics</button>
                        {metrics && (
                            <div className="metrics-content">
                                <pre>{JSON.stringify(metrics, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                )}
                {errorMessage && (
                    <div className="error-message">
                        Error: {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbot;
