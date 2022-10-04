import React from 'react'
import "../sass/Rumfaergen.scss"

const Rumfaergen = () => {
  return (
    <section className="rumfaergenWrapper">
      <div className="rumfaergenBannerContainer" >
        <figure>
          <img src="./img/banner-spaceship.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
        </figure>
        <h2>Rumfærgen</h2>
      </div>
    </section>
  )
}

export default Rumfaergen