import React from 'react';
import { BrowserRouter, Routes ,Router } from 'react-router-dom';
import Navbar from './Navbar';
import PageNavbar from './components/PageHavbar';

const App = () => {
    return (
        <BrowserRouter>
              <Navbar />
              <PageNavbar/>
              <Routes>
                <Router></Router>
              </Routes>
        </BrowserRouter>
    );
}
