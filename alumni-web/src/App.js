import React from 'react';
import { BrowserRouter, Routes ,Route, Outlet } from 'react-router-dom';
import PageNavbar from './components/PageNavbar'
import People from './components/FindPeople/People';
import SingleRegister from './components/Register/SingleRegister'
import BulkRegister from './components/Register/BulkRegister';
import AlumniLogin from './components/Login/AlumniLogin'
import AdminLogin from './components/Login/AdminLogin'
import Footer from './components/Footer';
import Home from './components/alumni/Home';

const App = () => {

    return (
        <BrowserRouter>
              <PageNavbar/>
              <Routes>
                <Route path='/admin' element={<Outlet/>}>
                  <Route path='login' element={<AdminLogin/>}></Route>
                  <Route path='single-register' element={<SingleRegister/>}></Route>
                  <Route path='bulk-register' element={<BulkRegister/>}></Route>
                  <Route path="*" element={<People/>}></Route>
                </Route>
                <Route path='/alumni' element={<Outlet/>}>
                  <Route path='login' element={<AlumniLogin/>}/>
                  <Route path='home' element={<Home/>}></Route>
                </Route>
              </Routes>
              
              <Footer/>
        </BrowserRouter>
    );
}

export default App;