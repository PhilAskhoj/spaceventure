import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      {/* SPAVE VENTURE - logo med link til forsiden "/" */ }
      <Link className="navbarBrand" to="/">
        <figure>
          <img src="./billeder/logo.png" alt="Space venture logo" />
        </figure>
      </Link>

      <Navbar />
    </header>
  )
}

export default Header