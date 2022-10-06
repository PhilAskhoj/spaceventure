import React, {useState, useEffect} from 'react'
import "../sass/Kontakt.scss"


// API-kald
import { createContact } from '../helpers/api'
import Loading from '../components/Loading'
import Fejl from '../components/Fejl'

const Kontakt = () => {

  const [contacted, setContacted] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  // Håndtering af tilmelding
  const handleContact = e => {
      e.preventDefault();
      
      setLoading(true)

      // Her tages indholdet fra formularen (det brugeren har skrevet ind) og laver et formdata-objekt til API'et
      let formData = new FormData(e.target)

      createContact(formData)
      .then((data) => {
          setContacted(true)
          setError(false)
      })
      .catch((err) => {
          setContacted (false)
          setError (true)
      })
      .finally(() => {
          setLoading(false)
      })
  }

  return (

    <main className="kontaktWrapper">

      <section className="kontaktMapWrapper">

        <div className="googleMapWrapper">
          <iframe className="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4415.34581784444!2d10.88270273363408!3d56.40446244901006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464dd5b144eb63fd%3A0x853fad0b0bb3d0dd!2sYdesvej%204A%2C%208500%20Gren%C3%A5!5e0!3m2!1sda!2sdk!4v1664982828920!5m2!1sda!2sdk"></iframe>
        </div>

      </section>

      <section className="kontaktFormWrapper" >

        <div className="kontaktFormTitles">

          <h2>Kontakt</h2>
          <hr />
          <h3>Skulle du sidde med et spørgsmål eller to så skriv endeligt til os, og vi vil kontakte dig hurtigst muligt.</h3>

        </div>

        {
            loading && <Loading />
        }

        {
            error && <h6><Fejl />{error}</h6>
        }

        {
            contacted && <h6 className="kontaktSendtTak">Tusinde tak for din besked! Vi bestræber os efter at besvare din besked indenfor 2-4 hverdage.</h6>
        }

        {/* Hvis ingen af ovenstående: vis formularen */}
        {
            !contacted &&

            <form onSubmit={handleContact} className="kontaktForm">

            <div className="kontaktFormInputs">
  
              <input type="text" name="name" placeholder='Navn' className="inputNavn" required />
              <input type="email" name="email" placeholder='E-mail' className="inputEmail" required />
              <input type="tel" name="phone" placeholder='Tlf'className="inputTlf"  required />
  
            </div>
  
            <textarea name="message" placeholder='Besked' className="formTextarea" required></textarea>
  
            <button type="submit">Send</button>
  
          </form>

        }

      </section>

    </main>

  )

}

export default Kontakt