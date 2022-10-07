import React from 'react';
import { Outlet } from 'react-router-dom';

// COMPONENTS
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

const Layout = (props) => {
  return (
    <div>

      <Header />

      <Navbar />

      {props.children}

      {/* Outlet er de child-path, som layout har med sig inde fra App.jsx */}
      <Outlet />

      <Footer />

    </div>
  )
}

export default Layout;