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
    const [ckeditorTextRoomtype, setCkeditorTextRoomtype] = useState()

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
                    <label>Teaser:
                    <textarea name="teaser" defaultValue={tour.teaser} required ></textarea>
                    </label>
                    <br />
                    <label>Beskrivelse:
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
                    <label>Værelsestype:
                        <textarea style={{display: "none"}} name="roomtype" defaultValue={ckeditorTextRoomtype} required ></textarea>
                    </label>
                    <div id="ckeWrapper">
                        {/* Fødekanal til textarea som skal skjules, men være der */}
                        <CKEditor
                            editor={Editor} // Type af editor --> vi vælger den, vi har importet
                            data = {tour.roomtype}
                            onChange = {(event, editor) => {
                                setCkeditorTextRoomtype(editor.getData()) // onChange gør, at når vi lndre teksten, skal den indhente data
                            }}
                            onReady = {(editor) => {
                                setCkeditorTextRoomtype(editor.getData())
                            }}
                        />
                    </div>
                    <br />
                    <label>Rejsedato:
                        <input
                            type="date"
                            name="traveldate"
                            defaultValue={new Date(tour.traveldate).toLocaleDateString("fr-CA")} // Her omskriver vi datoen til fransk-canadisk, da fr-CA returnerer det format i "yyyy-mm-dd," hvilket er den måde, som databasen modtager dato.
                            min={new Date().toLocaleDateString("fr-CA")}  // Der kan ikke vælges en dag før dagen i dag. Der skal altså "min" vælges i dag eller en senere dato.
                            required
                        />
                    </label>
                    <br />
                    <label>Varighed angivet i dage:
                        <input type="number" name="duration" min="1" max="500" defaultValue={tour.duration} required />
                    </label>
                    <br />
                    <label>Pris, minimum:
                        <input type="number" name="priceminimum" defaultValue={tour.priceminimum} required />
                    </label>
                    <br />
                    <label>Pris, maksimum:
                        <input type="number" name="pricemaximum" defaultValue={tour.pricemaximum} required />
                    </label>
                    <br />
                    <label>Upload et coverbillede:
                    <br />
                    (Det  eksisterende billede vil dermed blive erstattet)
                    <br />
                        <input type="file" name="image" />
                    </label>
                    Nuværende billeder: <img src={"http://localhost:5099/images/tours/" + tour.coverimage} alt="Nuværende cover-foto" />
                    <br />
                    <label>Upload eventuelt nogle nye galleri-billeder:
                        <input type="file" name="galleryimages" multiple />
                    </label>
                    Nuværende galleribilleder:
                    {
                        // i er den indbyggede "tæller" i map - tæller 0, 1, 2 osv. for hver runde - her bruger vi den til key (fordi der ikke er et ID)
                        tour.gallery.map( (g, i) => <img src={"http://localhost:5099/images/tours/" + g} alt="galleri" key={i} />)
                    }
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