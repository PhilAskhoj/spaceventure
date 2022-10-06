import React, { useState, useEffect } from 'react'
import "../../sass/AdminToursEdit.scss"
import { useParams } from 'react-router-dom'

import Fejl from '../../components/Fejl'
import Loading from '../../components/Loading'

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build'
import { CKEditor } from '@ckeditor/ckeditor5-react'

// APIKALD
import { getTourByID, updateTour } from '../../helpers/api'

const AdminToursEdit = () => {

    // Tage ID (ud fra URL'en) på den tour, der skal rettes (er en parameter - se i App.jsx)
    const {tourID} = useParams()

    const [tour, setTour] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // til svar fra API'et
    const [message, setMessage] = useState()

    // State til infhold fra texteditoren (bruges af textarea)
    const [ckeditorTextContent, setCkeditorTextContent] = useState()

    // Hent tour (ud fra ID) som skal rettes
    useEffect(() => {

        setLoading(true)
      
        getTourByID(tourID)
        .then( (data) => {
            setTour(data)
            setError(false)
        })
        .catch( (err) => {
            setError(true)
            setTour()
        })
        .finally( () => {
            setLoading(false)
        });

    }, [])
    

    const handleSubmit = (e) => {

        e.preventDefault(); // Undgå reload af component (= tab af data)

        setLoading(true);

        // Kald API og opret/POST ny tour

        // Formularindhold laves om til form-data
        let updatedTour = new FormData(e.target);

        //Promise chain
        updateTour(updatedTour, tourID)
        .then((data) => {
            setMessage("Touren er nu rettet ✔")
            setError(false)
        })
        .catch((err) => {
            setError(true)
            setMessage() // Tøm besked
        })
        .finally((
            setLoading(false)
        ));

    }

  return (
    <div id="AdminToursEditWrapper">

        <h1>Ret tour</h1>


        {
            // Hvis API-kaldet loader - den venter på error eller data
            loading && <Loading />
        }

        {
            // Hvis der er fejl fra API'et
            error && <Fejl />
        }

        {
            tour &&
                <form onSubmit={handleSubmit}>

                    <label>Titel:
                        <input type="text" name="title" defaultValue={tour.title} required />
                    </label>
                    <br />
                    <label>Beskrivelse af tur:
                        <textarea style={{display: "none"}} name="content" defaultValue={ckeditorTextContent} required ></textarea>
                    </label>
                    <div id="ckeWrapper">
                        {/* Fødekanal til textarea som skal skjules, men være der */}
                        <CKEditor
                            editor={Editor} // Type af editor --> vi vælger den, vi har importet
                            data = {tour.content}
                            onChange = {(event, editor) => {
                                setCkeditorTextContent(editor.getData()) // onChange gør, at når vi lndre teksten, skal den indhente data
                            }}
                            onReady = {(editor) => {
                                setCkeditorTextContent(editor.getData())
                            }}
                            />
                    </div>
                    <br />
                    <label>Distance fra jorden:
                        <input type="text" name="distance" defaultValue={tour.distance} required />
                    </label>
                    <br />
                    <label>Pris:
                        <input type="text" name="price" defaultValue={tour.price} required />
                    </label>
                    <br />
                    <label>Destination:
                        <input type="text" name="destination" defaultValue={tour.destination} required />
                    </label>
                    <br />
                    <label>Flyvetid:
                        <input type="text" name="traveltime" defaultValue={tour.traveltime} required />
                    </label>
                    <br />
                    <label>Første billede (som desuden også det billede, der vil blive vist på siden "Ture" som et slags coverbillede)
                    <br />
                    (Det  eksisterende billede vil dermed blive erstattet)
                    <br />
                        <input type="file" name="image1" />
                    </label>
                    <label>Første billede (som desuden også det billede, der vil blive vist på siden "Ture" som et slags coverbillede)
                    <br />
                    (Det  eksisterende billede vil dermed blive erstattet)
                    <br />
                        <input type="file" name="image2" />
                    </label>
    
                    Nuværende billede nr. 1: <img src={"http://localhost:4444/images/tours/" + tour.image1} alt="Nuværende cover-foto" />
                    Nuværende billede nr. 2: <img src={"http://localhost:4444/images/tours/" + tour.image2} alt="Nuværende cover-foto" />
                    <br />
                    <button id="AdminToursEditButton" type="submit">Gem rettelse(r)</button>

                </form>
        }

        {
            message &&
            <h2 id="AdminToursEditMessage">{message}</h2>
        }
    </div>
  )
}

export default AdminToursEdit