import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PageNavbar = () => {
    const location = useLocation();

    // Define a function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">College Project</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className={`nav-item ${isActive('/')}`}>
                        <Link className="nav-link" to="/">Find People</Link>
                    </li>
                    <li className={`nav-item ${isActive('/register')}`}>
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className={`nav-item ${isActive('/bulk-register')}`}>
                        <Link className="nav-link" to="/bulk-register">Bulk Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default PageNavbar;
