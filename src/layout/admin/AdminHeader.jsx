import React from 'react';
import { Link } from 'react-router-dom';
import "../../sass/AdminHeader.scss";

const AdminHeader = () => {
  return (
    <header className="headerWrapper">
      {/* SPAVE VENTURE - logo med link til forsiden "/" */ }
      <Link className="navbarBrand" to="/">
        <figure>
          <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Space venture logo" />
        </figure>
      </Link>
    </header>
  )
}

export default AdminHeader;