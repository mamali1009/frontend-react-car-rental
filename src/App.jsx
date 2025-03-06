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
import RentalResult from './containers/RentalResult';
import ChatbotResult from './containers/ChatbotResult'; // Import the new component

export const UserContext = createContext();

function App() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const onLoginSuccess = (username) => {
    setUsername(username);
    navigate('/choice');
  };

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route index path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/product' element={<Product />} />
          <Route path='/login' element={<Login onLoginSuccess={onLoginSuccess} />} />
          <Route path='/choice' element={<Choice />} />
          <Route path='/rental/form' element={<RentalForm />} />
          <Route path='/rental/chat' element={<Chatbot />} />
          <Route path='/rental/inventory-update' element={<InventoryUpdate />} />
          <Route path='/rental/result' element={<RentalResult />} />
          <Route path='/rental/chat-result' element={<ChatbotResult />} /> {/* Add the new route */}
          
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
