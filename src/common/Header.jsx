import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Edit from '../Pages/Edit';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Nav from './Nav';

const Header = () => {

  return (
    <div>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post-edit/:id' element={<Edit />} />
          {/* auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Header;
