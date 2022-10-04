import React, { useState, useEffect } from 'react'
import Fejl from './Fejl'
import Loading from './Loading'
import parse from 'html-react-parser'
import { NavLink } from 'react-router-dom'
import "./../sass/LidtOmOs.scss"

// API-kald
import { getAbout } from '../helpers/api'

const LidtOmOs = () => {

    const [about, setAbout] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        setLoading(true)
        
        getAbout()
          .then( (data) => {
            setAbout(data)
            setError(false)
          })
          .catch( (err) => {
            setError(true)
            setAbout(false)
          })
          .finally( () => {
            // uanset om der er data eller fejl stopper loading
            setLoading(false)
          });
    
      }, [])

  return (
    <section className="aboutWrapper">

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            about &&
                <div>
                    {
                      <div className="aboutContent">

                        <figure>
                          <img src="./img/om-os.jpg" alt="Jorden set fra rumfærge/rumskib" />
                        </figure>

                        <div className="aboutTekst">

                          <h3>Lidt om os</h3>

                          <h5>{about.title}</h5>
                          {parse(about.content)} {/* Kommer i forvejen i et p-tag igennem API'et/backenden. Derfor skal det ikke indsættes i et p-tag her, da dette vil være semantisk ukorrekt, da der hermed ville opstå et p-tag inde i et p-tag */}

                          <button><NavLink className="buttonTekst" to="/kontakt">Kontakt</NavLink></button>

                        </div>

                      </div>
                    }
                </div>
        }

    </section>
  )
}

export default LidtOmOs;