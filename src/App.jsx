import React, { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './containers/home';
import About from './containers/about'; 
import Product from './containers/product';
import Login from './containers/login';
import Navbar from "./components/navBar";
import Choice from './containers/Choice';
import RentalForm from './containers/RentalForm';
import Chatbot from './containers/Chatbot';
import InventoryUpdate from './containers/InventoryUpdate';
import VoiceChat from './containers/VoiceChat';
import RentalResult from './containers/RentalResult';
import ChatbotResult from './containers/ChatbotResult';
import VoiceChatResult from './containers/VoiceChatResult';

export const UserContext = createContext();

// Update API URL to use HTTPS
const API_URL = 'https://54.213.93.110:5000';

function App() {
  const [username, setUsername] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const onLoginSuccess = async (loginData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setIsAuthenticated(true);
        navigate('/choice');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, isAuthenticated }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/choice' element={isAuthenticated ? <Choice /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/form' element={isAuthenticated ? <RentalForm /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/chat' element={isAuthenticated ? <Chatbot /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/inventory-update' element={isAuthenticated ? <InventoryUpdate /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/voice-chat' element={isAuthenticated ? <VoiceChat /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/result' element={isAuthenticated ? <RentalResult /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/chat-result' element={isAuthenticated ? <ChatbotResult /> : <Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/rental/voice-chat-result' element={isAuthenticated ? <VoiceChatResult /> : <Login onLoginSuccess={onLoginSuccess} />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;