import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageNavbar.css';

const PageNavbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Change background color */}
            <a className="navbar-brand" href="/">Alumni Portal</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className={`nav-item ${isActive('/')}`}>
                        <Link className="nav-link larger-text" to="/find-people'">Find People</Link> {/* Add custom class */}
                    </li>
                    <li className={`nav-item ${isActive('/register')}`}>
                        <Link className="nav-link larger-text" to="/single-register">Register</Link> {/* Add custom class */}
                    </li>
                    <li className={`nav-item ${isActive('/bulk-register')}`}>
                        <Link className="nav-link larger-text" to="/bulk-register">Bulk Register</Link> {/* Add custom class */}
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default PageNavbar;
