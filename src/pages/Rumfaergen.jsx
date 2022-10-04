import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import Fejl from '../components/Fejl'
import parse from 'html-react-parser'
import "../sass/Rumfaergen.scss"

// API-kald
import { getSpacecraft } from '../helpers/api'

const Rumfaergen = () => {

  const [rumfaerge, setRumfaerge] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {

      setLoading(true)
      
      getSpacecraft()
        .then( (data) => {
          setRumfaerge(data)
          setError(false)
        })
        .catch( (err) => {
          setError(true)
          setRumfaerge(false)
        })
        .finally( () => {
          // uanset om der er data eller fejl stopper loading
          setLoading(false)
        });
  
    }, [])


  return (
    <section className="rumfaergenWrapper">
      <div className="rumfaergenBannerContainer" >
        <figure>
          <img src="./img/banner-spaceship.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
        </figure>
        <h2>Rumfærgen</h2>
      </div>

      <div className="rumfaergenContentContainer">

      {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            rumfaerge &&
                <div>
                    {
                      <div className="rumfaergeContent">

                        <div className="rumfaergeImgTekst">

                          <figure>
                            <img src="./img/om-os.jpg" alt="Jorden set fra rumfærge/rumskib" />
                          </figure>

                          <div className="rumfaergeTekst">

                            <h3>Hvorfor vælge os</h3>

                            <h5>{rumfaerge.title}</h5>
                            {parse(rumfaerge.content)} {/* Kommer i forvejen i et p-tag igennem API'et/backenden. Derfor skal det ikke indsættes i et p-tag her, da dette vil være semantisk ukorrekt, da der hermed ville opstå et p-tag inde i et p-tag */}

                          </div>

                        </div>

                        <div className="rumfaergeGalleriContainer">
                          <h5>Galleri</h5>

                          <div className="rumfaergeGalleri">

                            <img src="./img/spaceship1.jpg" alt="Billede af flyvende rumfærge/rumskib" />
                            <img src="./img/spaceship2.jpg" alt="Fotografi af flyvende rumfærge/rumskib" />
                            <img src="./img/spaceship3.jpg" alt="Billede af rumfærge/rumskib, som står landet på planeten Månen" />
                            <img src="./img/spaceship4.jpg" alt="Fotografi af interiør inden i en rumfærge/et rumskib" />

                          </div>

                        </div>

                      </div>
                    }
                </div>
        }

      </div>

    </section>
  )
}

export default Rumfaergen