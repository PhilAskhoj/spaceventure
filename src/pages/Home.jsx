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

  // Modtode som modtager et tal/antal og laver det tilsvarende antal stjerner
  const makeStars = (numberOfStars) => {
    // Hvis react icon eller anden "child" let stars = []
    // Hvis eksempelvis der skal vises "X" ved "stars += "X" er det ikke nødvendigt med [], men det bliver derimod bare let stars = ""
    let stars = []
    for (let i = 0; i < numberOfStars; i++) {
      /* stars += "X" */
      stars.push(<AiFillStar className="ratingStars" />)
    }
    
    return stars

  }

  /* NEDENSTÅENDE FUNKTION SKAL TILFØJES HVIS TOURS SKAL BLIVE BLANDET. ELLERS SLET!!!! */

/* 
  // Modtager et array - altså en liste - og den shufflere/blander dette array og retunerer den nu blandede liste (array)
  function myRandom(arr) {
    // Loop gennem array (arry) og byt runst på pladserne - fra bund til top (bagfra)
    for (let i = arr.length -1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let k = arr[i];
      arr[i] = arr[j];
      arr[j] = k;
    }
    return arr; // Her retunerer vi det shufflede array
  }
*/

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