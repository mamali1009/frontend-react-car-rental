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

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data); // Log the response data

        if (data.success) {
            onLoginSuccess(username);
        } else {
            setErrorMessage(data.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        console.log(data); // Log the response data

        if (data.success) {
            onLoginSuccess(username);
        } else {
            setErrorMessage(data.message);
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
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            />
                            <input
                                type="password"
                                placeholder="Create Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
