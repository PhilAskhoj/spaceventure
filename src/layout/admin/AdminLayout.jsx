import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';

// COMPONENTS
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {

  const {user} = useContext(LoginContext);

  if(!user) {
    // Send brugeren til login-siden
    return <Navigate to="/login" replace />
  }

  return (
    <div>

      <AdminHeader />

      <AdminNavbar />

      {/* Outlet er de child-path, som adminlayout har med sig fra App.jsx */}
      <Outlet />

      <AdminFooter />

    </div>
  )
}

export default AdminLayout;