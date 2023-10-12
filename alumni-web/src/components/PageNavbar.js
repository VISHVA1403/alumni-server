import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./PageNavbar.css";

const PageNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
<<<<<<< HEAD
      <Navbar.Brand href="/find-people">Alumni Portal</Navbar.Brand>
=======
      <Navbar.Brand href="/">Alumni Portal</Navbar.Brand>
>>>>>>> selva
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mx-auto">
          <Nav.Item className={`nav-item ${isActive("/")}`}>
            <Link className="nav-link larger-text" to="/find-people">
              Find People
            </Link>
          </Nav.Item>
          <Nav.Item className={`nav-item ${isActive("/register")}`}>
            <Link className="nav-link larger-text" to="/single-register">
              Register
            </Link>
          </Nav.Item>
          <Nav.Item className={`nav-item ${isActive("/bulk-register")}`}>
            <Link className="nav-link larger-text" to="/bulk-register">
              Bulk Register
            </Link>
          </Nav.Item>
        </Nav>
        <NavDropdown title="More Options" id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
<<<<<<< HEAD
          <NavDropdown.Item href="/logout">logout</NavDropdown.Item>
=======
          <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
>>>>>>> selva
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PageNavbar;
