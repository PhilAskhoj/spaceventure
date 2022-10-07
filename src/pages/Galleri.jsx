import React from 'react';
import "../sass/Galleri.scss";

const Galleri = () => {

  return (

    <section className="galleriWrapper">

      <div className="galleriBannerContainer" >
      <figure>
        <img src="./img/banner-spaceship.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
      </figure>
      <h2>Galleri</h2>
      </div>

      <div className="galleriContainer">
        <h3>Se nedenstående billeder for at se vores skønne billeder fra det finurlige ydre rum</h3>

        <div className="galleriContentContainer">
          <img src="./img/gallery/1.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/2.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/3.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/4.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/5.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/6.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/7.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/8.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/9.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/10.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/11.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
          <img src="./img/gallery/12.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
        </div>

      </div>


    </section>

  )
}

export default Galleri;