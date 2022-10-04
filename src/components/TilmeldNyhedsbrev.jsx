import React, { useState } from 'react'
import Fejl from './Fejl'
import Loading from './Loading'
import "../sass/TilmeldNyhedsbrev.scss"

// API-kald
import { createSubscribeNewsletter } from '../helpers/api'

const TilmeldNyhedsbrev = () => {

    const [subscriped, setSubscriped] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    // Håndtering af tilmelding
    const handleNewsSubscription = e => {
        e.preventDefault();
        
        setLoading(true)

        // Her tages indholdet fra formularen (det brugeren har skrevet ind) og laver et formdata-objekt til API'et
        let formData = new FormData(e.target)

        createSubscribeNewsletter(formData)
        .then((data) => {
            setSubscriped(true)
            setError(false)
        })
        .catch((err) => {
            setSubscriped (false)
            setError (true)
        })
        .finally(() => {
            setLoading(false)
        })
    }

  return (
    <section className="tilmeldNyhedsbrevWrapper">

        <img src="./img/newsmail-bg.jpg" alt="Øde område med ørkensand" />
        <h3>Tilmeld dig og få 25% rabat</h3>
        <p>Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!</p>

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            subscriped && <h6>Tusinde tak for din tilmelding af vores nyhedsbrev!</h6>
        }

        {/* Hvis ingen af ovenstående: vis formularen */}
        {
            !subscriped &&

            <form onSubmit={handleNewsSubscription}>
                <input type="email" label="Hej" name="email" placeholder="Din E-mail" required />
                <button>Tilmeld</button>
            </form>

        }

    </section>
  )
}

export default TilmeldNyhedsbrev;