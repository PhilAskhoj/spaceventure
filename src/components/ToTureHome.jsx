import React from 'react';
import { NavLink } from 'react-router-dom';
import "../sass/ToTureHome.scss";

// IKON (PIL)
import { HiArrowNarrowRight } from 'react-icons/hi';

const ToTureHome = () => {

  return (
    <section className="toTureWrapper">

      <div className="toTureContent">

      <NavLink className="toTureMaanen" to="/ture/tur/617f8116066b123e4c7c941c">

        <div>

          <figure>
            <img src="./img/moon-btn.jpg" alt="Billede af planeten Månen" />
          </figure>

          <h6 className="toTureh6">Månen</h6>

        </div>

      </NavLink>

      <NavLink className="toTureMars" to="/ture/tur/617f80a6066b123e4c7c941a">

      <div>

        <figure>
          <img src="./img/mars-btn.jpg" alt="Billede af planeten Mars" />
        </figure>

        <h6 className="toTureh6">Mars</h6>

      </div>

      </NavLink>

      </div>


      <p>
        <NavLink className="toTureLaesMere" to="/ture">Vores ture<HiArrowNarrowRight className="toTureArrow" /></NavLink>
      </p>

      

    </section>
  )
}

export default ToTureHome;