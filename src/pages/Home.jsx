import React, { useState, useEffect } from 'react'
import Fejl from '../components/Fejl'
import Loading from '../components/Loading'
import { AiFillStar } from 'react-icons/ai'

// API-kald
import { getToursTeaser } from '../helpers/api'

import "../sass/Home.scss"

const Home = () => {

  const [tours, setTours] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // Ved klik på læs-mere - gem ID på den klikkede tour
  const [showTour, setShowTour] = useState()

  // State til pagination
  const [numberPerPage, setNumberPerPage] = useState(3)
  // State til at rumme hvor hvilken pagination-side, burgeren befinder sig på
  const [currentPage, setCurrentPage] = useState(0) // 0 svarer til side 1!!!

  useEffect(() => {

    setLoading(true)
    
    getToursTeaser()
      .then( (data) => {
        setTours(data)
        setError(false)
      })
      .catch( (err) => {
        setError(true)
        setTours()
      })
      .finally( () => {
        // uanset om der er data eller fejl stopper loading
        setLoading(false)
      } );

  }, [])

  return (
    <div id="allToursWrapper">
      <h1>Home</h1>

      {
        error && <Fejl />
      }

      {
        loading && <Loading />
      }

      {
        tours &&

          <div className="toursContainer">

              {
                // 
                tours.slice((currentPage * numberPerPage), (currentPage * numberPerPage) + numberPerPage).map( t => /* HER KAN DER INDSÆTTES SLIDE(FX 0,3 FOR DE 3 FØRSTE TOURS). ELLERS KAN DER INDSÆTES REVERSE() FOR AT VENDE BUNDEN I VEJRET - I DETTE TILFÆLDE Å-A I STEDET FOR A-Å. VI KAN OGSÅ KOMBINERER DET TIL EN CHAIN VED AT INDSÆTTE BEGGE, HVOR DET SÅ BLIVER REVERSE().SLICE().MAP. Ydermere kan shuffel (igennem Fisher Yates Moetoden) burges, hvor vi bruger funktionen "myRandom" - her kan slice() eventuelt også bruges i sammenhæng, hvis det skulle være nødvendigt. */
                <div className="toursCards" key={t._id}>
                      <img src={"http://localhost:5099/images/tours/" + t.coverimage} alt={"Et foto fra tour til" + t.title} />
                      <h4 className="allToursTitle" >{t.title}</h4>
                      <p className="allToursDate">Dato: {new Date(t.traveldate).toLocaleDateString("da-DK", {year: "numeric", day: "numeric", month: "long"})}</p>
                      <p>{t.teaser}</p>
                      <button className="readMoreButton" onClick={ () => setShowTour(t._id)}>Læs mere</button>
                    </div>
                  )
                }


          </div>
      }

    </div>
  )
}

export default Home