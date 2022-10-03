import React, { useState, useEffect } from 'react'
import Fejl from './Fejl'
import Loading from './Loading'
import "../sass/Team.scss"

// API-kald
import { getTeam } from '../helpers/api'
import TeamOutput from './TeamOutput'

const Team = () => {

    
    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        setLoading(true)
        
        getTeam()
          .then( (data) => {
            setTeam(data)
            setError(false)
          })
          .catch( (err) => {
            setError(true)
            setTeam()
          })
          .finally( () => {
            // uanset om der er data eller fejl stopper loading
            setLoading(false)
          } );
    
      }, [])

  return (
    <section className="teamWrapper">
        
        <h3>Vores team</h3>

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            team &&
                <div className="teamContent">
                    {
                        team.map(t => (
                             <TeamOutput team={t} key={t._id}  />
                        ))
                    }
                </div>
        }

    </section>
  )
}

export default Team;