import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminFooter from './AdminFooter';
import AdminNavbar from './AdminNavbar';
import { LoginContext } from '../../context/LoginContext';
import AdminHeader from './AdminHeader';

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

export default AdminLayout