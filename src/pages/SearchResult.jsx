import React, { useState, useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Fejl from '../components/Fejl';
import Loading from '../components/Loading';

// KALD AF API
import { getToursSearch } from '../helpers/api';

// Fra navbarens søge-inout fra den modtages søgeordet
// KALD API'et med søgeord
// Modtage søgeresultatet fra API'et
// Loope søgeresultatet ud på siden


const SearchResult = () => {

    const [tours, setTours] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    let {searchWord} = useParams()
    console.log("Søgt efter: ", searchWord)

    useEffect(() => {

        setLoading(true)
      
        getToursSearch(searchWord)
        .then( (data) => {
            setTours(data)
            setError(false)
        })
        .catch( (err) => {
            setTours(false)
            setError(true)
        })
        .finally( () => {
            setLoading(false)
        });
      
    }, [searchWord])

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

  return (

    <div>

        <h1>Søgeresultat</h1>
    
            {
            error && <Fejl />
          }
    
          {
            loading && <Loading />
          }

{
        tours &&

                tours.map( t => /* HER KAN DER INDSÆTTES SLIDE(FX 0,3 FOR DE 3 FØRSTE TOURS). ELLERS KAN DER INDSÆTES REVERSE() FOR AT VENDE BUNDEN I VEJRET - I DETTE TILFÆLDE Å-A I STEDET FOR A-Å. VI KAN OGSÅ KOMBINERER DET TIL EN CHAIN VED AT INDSÆTTE BEGGE, HVOR DET SÅ BLIVER REVERSE().SLICE().MAP. Ydermere kan shuffel (igennem Fisher Yates Moetoden) burges, hvor vi bruger funktionen "myRandom" - her kan slice() eventuelt også bruges i sammenhæng, hvis det skulle være nødvendigt. */
                <div className="toursCards" key={t._id}>
                      <img src={"http://localhost:5099/images/tours/" + t.coverimage} alt={"Et foto fra tour til" + t.title} />
                      <h4 className="allToursTitle" >{t.title}</h4>

                        {
                          makeStars(t.rating)
                        }

                      <div key={t._id}>
                        {
                          
                          /* Item er det indhold, der er i array. Et normalt array indeholder noget, hvilket er data */
                          /* Index er den inbyggede tæller, der tæller hver gang gang, den mapper data ud */
                          /* "Length: tour.rating" er den der vedhvor mange gange den skal loop'e ud. Den får antallet afvide fra API'et (rating), som så tilhører den enkelte tour */
                          
                        }
                      </div>
                      <p className="allToursDate">Dato: {new Date(t.traveldate).toLocaleDateString("da-DK", {year: "numeric", day: "numeric", month: "long"})}</p>
                      <p>{t.teaser}</p>
                    </div>
                  )
                }


          </div>
    
  )

}

export default SearchResult