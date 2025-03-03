import React, { useState, useContext, useEffect } from 'react';
import './Chatbot.css';
import { UserContext } from '../App';

const Chatbot = () => {
    const { username } = useContext(UserContext);
    const [prompt, setPrompt] = useState('');
    const [output, setOutput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showMetrics, setShowMetrics] = useState(false);
    const [metrics, setMetrics] = useState(null);
    const [conversationHistory, setConversationHistory] = useState([]);

    useEffect(() => {
        const initialMessage = "Hi! I'm your car rental assistant. Please tell me about your rental needs including pickup/dropoff location, dates, number of people, and any preferences you have.";
        setMessages([{ sender: 'chatbot', text: initialMessage }]);
    }, []);

    const handleChat = async (e) => {
        e.preventDefault();
        const userMessage = { sender: 'user', text: prompt };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('https://fb4g06zjra.execute-api.us-west-2.amazonaws.com/prod/rental/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, username, conversation_history: conversationHistory }),
            });
            const data = await response.json();
            console.log(data); // Log the response data

            if (data.success) {
                if (data.needs_more_info) {
                    setOutput(data.follow_up_questions);
                    setMessages([...messages, userMessage, { sender: 'chatbot', text: data.follow_up_questions }]);
                    setConversationHistory(data.conversation_history);
                } else {
                    setOutput(data.output);
                    setMessages([...messages, userMessage, { sender: 'chatbot', text: data.output }]);
                    setConversationHistory([]);
                }
                setErrorMessage('');
            } else {
                setErrorMessage(data.message);
                setMessages([...messages, userMessage]);
                setOutput('');
            }
        } catch (error) {
            setErrorMessage('An error occurred while processing your request.');
            setMessages([...messages, userMessage]);
            setOutput('');
        }

        setPrompt('');
    };

    const fetchMetrics = async () => {
        try {
            const response = await fetch('/rental/metrics', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setMetrics(data.metrics);
        } catch (error) {
            setErrorMessage('An error occurred while fetching metrics.');
        }
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
                {output && (
                    <div className="response">
                        <h2>Chatbot Response</h2>
                        <div className="output-content">{output}</div>
                        <button onClick={() => setShowMetrics(true)}>Show Metrics</button>
                    </div>
                )}
                {showMetrics && (
                    <div className="metrics">
                        <h2>CloudWatch Metrics</h2>
                        <button onClick={fetchMetrics}>Fetch Metrics</button>
                        {metrics && (
                            <div className="metrics-content">
                                <pre>{JSON.stringify(metrics, null, 2)}</pre>
                            </div>
                        )}
                    </div>
                )}
                {errorMessage && <div className="response error">Error: {errorMessage}</div>}
            </div>
        </div>
    );
};

export default Chatbot;
