import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token exists in localStorage, and navigate to the home page if it does.
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin/find-people');
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (validateEmail() && validatePassword()) {
            const data = {
                email: email + '@karpagamtech.ac.in',
                password,
            };

            try {
                const response = await fetch('http://localhost:8000/admin/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    // Login successful
                    const responseData = await response.json();
                    // Store the user's session token or JWT in localStorage and set an expiration date 7 days from now.
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + 7);
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('tokenExpiration', expirationDate.toISOString());

                    // Redirect to the home page
                    navigate('/admin/find-people');
                } else {
                    // Login failed, display an error message
                    alert('Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };

    const validateEmail = () => {
        if (!email || email.indexOf('@') !== -1) {
            alert('Please enter a valid email prefix without the domain');
            return false;
        }
        return true;
    };

    const validatePassword = () => {
        if (password.length < 8) {
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
                                    <label htmlFor="email" className="form-label">
                                        Email:
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your email prefix"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <span className="input-group-text">@karpagamtech.ac.in</span>
                                        </div>
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
