import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Fejl from '../components/Fejl';
import { getSafety } from '../helpers/api';
import "../sass/Sikkerhed.scss";

const Sikkerhed = () => {

  const [sikkerhed, setSikkerhed] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {

      setLoading(true)
      
      getSafety()
        .then( (data) => {
          setSikkerhed(data)
          setError(false)
        })
        .catch( (err) => {
          setError(true)
          setSikkerhed(false)
        })
        .finally( () => {
          // uanset om der er data eller fejl stopper loading
          setLoading(false)
        });
  
  }, [])


  return (

    <section className="sikkerhedWrapper">

      <div className="sikkerhedBannerContainer" >
        <figure>
          <img src="./img/banner-ture.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
        </figure>
        <h2>Sikkerhed</h2>
      </div>

      <div className="sikkerhedContentContainer">

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            sikkerhed &&
                <div className="sikkerhedContent">
          
                    {

                        <div className="sikkerhedImgTekst">

                          <figure>
                            <img src="./img/om-os.jpg" alt="Billede af planeten Jorden set fra det ydre rum" />
                          </figure>

                          <div className="sikkerhedTekst">

                            <h3>{sikkerhed.title}</h3>
                            <p>{sikkerhed.content}</p>

                          </div>

                        </div>

                    }

                </div>
        }

      </div>

    </section>

  )
}

export default Sikkerhed