import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="headerWrapper">
      {/* SPAVE VENTURE - logo med link til forsiden "/" */ }
      <Link className="navbarBrand" to="/">
        <figure>
          <img src="./img/logo.png" alt="Space venture logo" />
        </figure>
      </Link>

      <Navbar className="headerNavbar" />
    </header>
  )
}

export default Header