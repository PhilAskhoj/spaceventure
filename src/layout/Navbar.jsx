import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../sass/Navbar.scss";

// IKONER
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from 'react-icons/fa';

const Navbar = () => {

  // State til om der er klikket på burgeren (true/false)
  const [showBurgermenu, setShowBurgermenu] = useState(false);

  return (

    <nav className="navbar">

      {/* --- BURGERMENU --- */}

      {/* VED CLASSNAME = TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN TOGGLEBUTTON OG CHANGE, ELLERS SKAL DER BLOT VISES TOGGLEBUTTON UDEN CHANGE */}
    
      {/* VED ONCLICK = TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN NAVBARLINKS OG ACTIVE, ELLERS SKAL DER BLOT VISES NAVBARLINKS UDEN ACTIVE */}

      <div className={showBurgermenu ? "toggleButton change" : "toggleButton"} onClick={() => setShowBurgermenu(!showBurgermenu)}>
        
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>

      </div>

      {/* NAV - LINKS */ }
      <div className={showBurgermenu ? "navbarLinks active" : "navbarLinks"}> {/* TERNARY EXPRESSION. DER SPØRGES OM HVIS SHOWBURGERMENU (STATE SOM OGSÅ BRUGES I FORBINDELSE MED ONCLICK PÅ BURGERMENUEN (TOGGLEBUTTON)) ER TRUE, SKAL DEN VISES MED CLASSEN NAVBARLINKS OG ACTIVE, ELLERS SKAL DER BLOT VISES NAVBARLINKS UDEN ACTIVE */}
        <ul onClick={() => setShowBurgermenu(!showBurgermenu)}>
          <li><NavLink to="/">Hjem</NavLink></li>
          <li><NavLink to="/rumfaergen">Rumfærgen</NavLink></li>
          <li><NavLink to="/ture">Ture</NavLink></li>
          <li><NavLink to="/galleri">Galleri</NavLink></li>
          <li><NavLink to="/sikkerhed">Sikkerhed</NavLink></li>
          <li><NavLink to="/kontakt">Kontakt</NavLink></li>
        </ul>
      </div>

        <div>
          <a href="https://www.facebook.com" target="_blank"><FaFacebookF className="icon" alt="Facebook ikon" /></a>
          <a href="https://www.twitter.com" target="_blank"><FaTwitter className="icon" alt="Twitter ikon" /></a>
          <a href="https://www.googleplus.com" target="_blank"><FaGooglePlusG className="icon" alt="Google+ ikon" /></a>
          <a href="https://www.instagram.com" target="_blank"><FaInstagram className="icon" alt="Instagram ikon" /></a>
        </div>

    </nav >    

  )
}

export default Navbar;