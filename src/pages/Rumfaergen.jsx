import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import Fejl from '../components/Fejl';
import parse from 'html-react-parser';
import "../sass/Rumfaergen.scss";

// API-kald
import { getGallery, getSpacecraft } from '../helpers/api'

const Rumfaergen = () => {

  const [rumfaerge, setRumfaerge] = useState()
  const [galleri, setGalleri] = useState()
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

  useEffect(() => {

    setLoading(true)
    
    getGallery()
      .then( (data) => {
        setGalleri(data)
        setError(false)
      })
      .catch( (err) => {
        setError(true)
        setGalleri(false)
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
                <div className="rumfaergeContent">
          
                    {

                        <div className="rumfaergeImgTekst">

                          <figure>
                            <img src={"http://localhost:4444/images/spacecraft/" + rumfaerge.image} alt="Jorden set fra rumfærge/rumskib" />
                          </figure>

                          <div className="rumfaergeTekst">

                            <h3>Hvorfor vælge os</h3>

                            <h5>{rumfaerge.title}</h5>
                            {parse(rumfaerge.content)} {/* Kommer i forvejen i et p-tag igennem API'et/backenden. Derfor skal det ikke indsættes i et p-tag her, da dette vil være semantisk ukorrekt, da der hermed ville opstå et p-tag inde i et p-tag */}

                          </div>

                        </div>

                    }

                </div>
        }

        {
          
          galleri &&

            <div className="rumfaergeGalleriContainer">
              <h5>Galleri</h5>

                {

                  <div className="rumfaergeGalleri">

                      {
                        
                        galleri.map(g => (
                            <img src={"http://localhost:4444/images/gallery/" + g.image} key={g._id} alt={g.imagetext} />
                          ))

                      }

                  </div>

                }

            </div>

        }

      </div>

    </section>
  )
}

export default Rumfaergen