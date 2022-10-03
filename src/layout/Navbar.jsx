import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../sass/Navbar.scss"

// Context - til at finde ud af om der er logget ind eller ej
import { LoginContext } from '../context/LoginContext'

const Navbar = () => {

  const {user, signOut} = useContext(LoginContext);

  // State til om der er klikket på burger (true/false)
  const [showBurgermenu, setShowBurgermenu] = useState(false);

  // SØGNING - START
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault(); // Hver gang der trykkes submit sker der reload. Dettte forhindre vi her.
    console.log(e.target.search.value)

    navigate('/search/' + e.target.search.value )
  }

  // SØGNING - SLUT

  return (

    <nav className="navbar">

      {/* BURGERMENU */}

      {/* VED CLASSNAME = TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN TOGGLEBUTTON OG CHANGE, ELLERS SKAL DER BLOT VISES TOGGLEBUTTON UDEN CHANGE */}
    
      {/* VED ONCLICK = TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN NAVBARLINKS OG ACTIVE, ELLERS SKAL DER BLOT VISES NAVBARLINKS UDEN ACTIVE */}

      <div className={showBurgermenu ? "toggleButton change" : "toggleButton"} onClick={() => setShowBurgermenu(!showBurgermenu)}>
        
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>

        {/* HVIS DER SKAL SKIFTES MELLEM TO IKONER FREMFOR TRANSITONS OG DEN SLAGS FRA OVENSTÅENDE KAN NEDENSTÅENDE BRUGES. */}

        {/* <span>{showBurgermenu ? <span>&#9747;</span> : <span>&#9776;</span> }</span> */}

      </div>

      {/* NAV - LINKS */ }
      <div className={showBurgermenu ? "navbarLinks active" : "navbarLinks"}> {/* TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN NAVBARLINKS OG ACTIVE, ELLERS SKAL DER BLOT VISES NAVBARLINKS UDEN ACTIVE */}
        <ul>
          <li><NavLink to="/" >Hjem</NavLink></li>
          <li><NavLink to="/kontakt" >Kontakt</NavLink></li>
          <li><NavLink to="/om" >Om</NavLink></li>
          {
            //Ternary expression inde i vores localscope --> Spørger "hvis der er user," så gå til /admin "ellers" så gå til /login
            user ?
              <li><NavLink to="/admin" >ADMIN</NavLink></li>
              :
              <li><NavLink to="/login" >Login</NavLink></li>
          }
        </ul>

      </div>

        <form onSubmit={handleSearch}>
          <input type="text" name="search"/>
          <button type="submit">Søg</button>
        </form>

    </nav >    

  )
}

export default Navbar