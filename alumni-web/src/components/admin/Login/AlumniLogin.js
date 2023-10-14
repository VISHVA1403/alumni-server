import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Check if a token exists in localStorage, and navigate to the home page if it does.
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/home');
    //     }
    // }, [navigate]);

    const handleLogin = async () => {
        if (validateUsername() && validatePassword()) {
            const data = {
                username: username,
                password:password
            };

            try {
                const response = await fetch('http://localhost:8000/alumni/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                console.log(response)

                if (response.ok) {
                    // Login successful
                    const responseData = await response.json();
                    // Store the user's session token or JWT in localStorage and set an expiration date 7 days from now.
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('tokenExpiration', expirationDate.toISOString());

                    // Redirect to the home page
                    navigate('/alumni/home');
                } else {
                    // Login failed, display an error message
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };

    const validateUsername = () => {
        if (!username) {
            alert('Please enter a valid username prefix without the domain');
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        if (password.length < 3) {
            alert('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">
                                        username:
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your username prefix"
                                            required
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Remember Me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
