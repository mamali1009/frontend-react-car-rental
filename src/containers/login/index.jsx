import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = ({ onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const API_URL = 'https://l3ku0c2no5.execute-api.us-west-2.amazonaws.com/Prod';

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(username);
                localStorage.setItem('token', data.token);
            } else {
                setErrorMessage(data.message || 'Login failed');
            }
        } catch (error) {
            setErrorMessage('Network error occurred');
            console.error('Login error:', error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(username);
                localStorage.setItem('token', data.token);
            } else {
                setErrorMessage(data.message || 'Registration failed');
            }
        } catch (error) {
            setErrorMessage('Network error occurred');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="main-container">
            <div className="logo"></div>
            <div className="form-container">
                {isLogin ? (
                    <div>
                        <h1 style={{ marginTop: "50px", color: "#0091FF" }}>Car Rental App</h1>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="Username" style={{ marginTop: "10px", marginBottom: "7px" }}>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Log in</button>
                        </form>
                        <h3>
                            Don't have an account? <span onClick={toggleForm}>Sign up</span>
                        </h3>
                    </div>
                ) : (
                    <div>
                        <h1 style={{ marginTop: "5px", color: "#0091FF" }}>Create an Account</h1>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign up</button>
                        </form>
                        <h3>
                            Have an account? <span onClick={toggleForm}>Log in</span>
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
