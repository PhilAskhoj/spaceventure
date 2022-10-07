import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../sass/AdminNavbar.scss";

const AdminNavbar = () => {

  return (
    <nav className="adminNavbar">

      <ul>
        <li>
          <NavLink to="/admin" end>ADMIN forside</NavLink> {/* END SIGER: ER DER MERE END "/ADMIN TILKOBLET I URL'EN, SÅ VISER IKKE DENNE. DERFOR KUN VED UDELUKKENDE "/ADMIN" I URL, VIL DENNE SIDE BLIVE VIST */}
        </li>
        <li>
          <NavLink to="admintours">Ture</NavLink>
        </li>
        <li>
          <NavLink to="adminabout">Lidt om os</NavLink>
        </li>
        <li>
          <NavLink to="adminspacecraft">Rumfærgen</NavLink>
        </li>
        <li>
          <NavLink to="/">BRUGER forside</NavLink>
        </li>
      </ul>

    </nav>
  )
}

export default AdminNavbar;