import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import "../sass/Ture.scss";

// COMPONENTS
import Fejl from '../components/Fejl';
import Loading from '../components/Loading';

// API-kald
import { getAllTours } from '../helpers/api';
import Pagination from '../components/Pagination';

const Ture = () => {

  const [ture, setTure] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

    // State til pagination
    const [numberPerPage, setNumberPerPage] = useState(1)
    // State til at rumme hvor hvilken pagination-side, burgeren befinder sig på
    const [currentPage, setCurrentPage] = useState(0) // 0 svarer til side 1!!!

  useEffect(() => {

    setLoading(true)
    
    getAllTours()
      .then( (data) => {
        setTure(data)
        setError(false)
      })
      .catch( (err) => {
        setError(true)
        setTure(false)
      })
      .finally( () => {
        // uanset om der er data eller fejl stopper loading
        setLoading(false)
      } );

  }, [])

  return (
    <section className="tureWrapper">
      <div className="tureBannerContainer" >
        <figure>
          <img src="./img/banner-ture.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
        </figure>
        <h2>Ture</h2>
      </div>

      {
        loading && <Loading />
      }

      {
        error && <Fejl />
      }

      {
        ture &&

          <div className="alleTureContainer">

              {
                // 
                ture.slice((currentPage * numberPerPage), (currentPage * numberPerPage) + numberPerPage).map( t => /* HER KAN DER INDSÆTTES SLIDE(FX 0,3 FOR DE 3 FØRSTE TOURS). ELLERS KAN DER INDSÆTES REVERSE() FOR AT VENDE BUNDEN I VEJRET - I DETTE TILFÆLDE Å-A I STEDET FOR A-Å. VI KAN OGSÅ KOMBINERER DET TIL EN CHAIN VED AT INDSÆTTE BEGGE, HVOR DET SÅ BLIVER REVERSE().SLICE().MAP. Ydermere kan shuffel (igennem Fisher Yates Moetoden) burges, hvor vi bruger funktionen "myRandom" - her kan slice() eventuelt også bruges i sammenhæng, hvis det skulle være nødvendigt. */
                  <div className="tureKort" key={t._id}>

                    <figure>
                        <img src={"http://localhost:4444/images/tours/" + t.image1} alt={"Et fotografi fra planeten" + t.title} />
                    </figure>

                    <div className="tureKortTekstContainer">
                        <p className="turePris">{t.price}</p>
                        <h4 className="tureTitle" >{t.title}</h4>
                        <div>
                          {parse(t.content)} {/* Kommer i forvejen i et p-tag igennem API'et/backenden. Derfor skal det ikke indsættes i et p-tag her, da dette vil være semantisk ukorrekt, da der hermed ville opstå et p-tag inde i et p-tag */}
                        </div>

                        <Link to={"/ture/tur/" + t._id}>
                          <button className="seMereButton" title="Se mere">Se mere</button>
                        </Link>

                    </div>

                  </div>
                  )

                }

                {/* FREM OG TILBAGE KNAPPER TIL PAGINATION */}
                {/* KNAPPER MED ANTAL SIDER MELLEM TILBAGE OG FREM KNAPPERNE FRA FUNKTION */}
                <Pagination
                  setCurrentPage={setCurrentPage}                         // fra state
                  currentPage={currentPage}                               // Fra state ("den side der vises nu")
                  numberOfPages={Math.ceil(ture.length / numberPerPage)} // Der beregnes der hvor mange sidelinks/sideknapper, som skal laves
                />

        </div>

      }

    </section>
  )
}

export default Ture;