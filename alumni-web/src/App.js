import React from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import PageNavbar from './components/PageNavbar'
import People from './components/FindPeople/People';
import SingleRegister from './components/Register/SingleRegister'
import BulkRegister from './components/Register/BulkRegister';
import LoginPage from './components/Login/LoginPage';
import Footer from './components/Footer';

const App = () => {
    return (
        <BrowserRouter>
              <PageNavbar/>
              <Routes>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/find-people' element={<People/>}></Route>
                <Route path='/single-register' element={<SingleRegister/>}></Route>
                <Route path='/bulk-register' element={<BulkRegister/>}></Route>
              </Routes>
              <Footer/>
        </BrowserRouter>
    );
}

export default App;