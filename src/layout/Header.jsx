import React from 'react'
import { Link } from 'react-router-dom'
import "../sass/Header.scss"

const Header = () => {
  return (
    <header className="headerWrapper">
      {/* SPAVE VENTURE - logo med link til forsiden "/" */ }
      <Link className="navbarBrand" to="/">
        <figure>
          <img src="./img/logo.png" alt="Space venture logo" />
        </figure>
      </Link>
    </header>
  )
}

export default Header