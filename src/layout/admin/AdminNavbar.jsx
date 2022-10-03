import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import "../../sass/AdminNavbar.scss"

// Context - til at finde ud af om der er logget ind eller ej
import { LoginContext } from '../../context/LoginContext'

const AdminNavbar = () => {

  const {signOut} = useContext(LoginContext);

  return (
    <nav className="adminNavbar">

      <ul>
        <li>
          <NavLink to="/admin">ADMIN HOME</NavLink>
        </li>
        <li>
          <NavLink to="admintours">Tours (admin)</NavLink>
        </li>
        <li>
          <NavLink to="adminabout">About (admin)</NavLink>
        </li>
        <li>
          <NavLink to="/">Forsiden</NavLink>
        </li>
      </ul>

    </nav>
  )
}

export default AdminNavbar