import React, { useState, useEffect } from 'react'
import Fejl from './Fejl'
import Loading from './Loading'

// API-kald
import { getAbout } from '../helpers/api'

// Output til map
import LidtOmOsOutput from './LidtOmOsOutput'

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
        
        <h3>Lidt om os</h3>

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            about &&
                <div className="aboutContent">
                    {
                        about.map(a => (
                             <LidtOmOsOutput about={a} key={a._id}  />
                        ))
                    }
                </div>
        }

    </section>
  )
}

export default LidtOmOs;