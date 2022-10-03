import React, { useState } from 'react'
import "../../sass/AdminToursCreate.scss"

import Fejl from '../../components/Fejl'
import Loading from '../../components/Loading'

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import { createTour } from '../../helpers/api'

const AdminToursCreate = () => {

    /* 
    1. Hvad skal der ske når component loader? Fx. kald til API eller andet? usEffect hvis API
    2. Er der nogle events? - fx. gem nytour - hvor der skal ske et kald til API eller andet? useEffect hvis API 
    
    useEffect skal bruges når der er fx. API-kald - fx. når component loader - eller ved re-render (fx. slet)
    */

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // til svar fra API'et
    const [message, setMessage] = useState()

    // State til infhold fra texteditoren (bruges af textarea)
    const [ckeditorTextContent, setCkeditorTextContent] = useState()
    const [ckeditorTextRoomtype, setCkeditorTextRoomtype] = useState()

    const handleSubmit = (e) => {

        e.preventDefault(); // Undgå reload af component (= tab af data)

        setLoading(true);

        // Kald API og opret/POST ny tour

        // Formularindhold laves om til form-data
        let newTour = new FormData(e.target);

        //Promise chain
        createTour(newTour)
        .then((data) => {
            setMessage("Ny tour er oprettet med følgende titel samt ID: '" + data.oprettet.title + "' '" + data.oprettet._id + "' ✔")
            e.target.reset()            // Tøm/nulstil formularfelter
            setCkeditorTextContent("")  // Tøm state --> tømmer ckeditor
            setCkeditorTextRoomtype("") // Tøm state --> tømmer ckeditor
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
    <div id="AdminToursCreateWrapper">

        <h1>Opret ny tour</h1>


        {
            // Hvis API-kaldet loader - den venter på error eller data
            loading && <Loading />
        }

        {
            // Hvis der er fejl fra API'et
            error && <Fejl />
        }

        {
            <form onSubmit={handleSubmit}>

                <label>Titel:
                    <input type="text" name="title" required />
                </label>
                <br />
                <label>Teaser:
                   <textarea name="teaser" required ></textarea>
                </label>
                <br />
                <label>Beskrivelse:
                    <textarea style={{display: "none"}} name="content" defaultValue={ckeditorTextContent} required ></textarea>
                </label>
                <div id="ckeWrapper">
                    {/* Fødekanal til textarea som skal skjules, men være der */}
                    <CKEditor
                        editor={Editor} // Type af editor --> vi vælger den, vi har importet
                        data = {ckeditorTextContent}
                        onChange = {(event, editor) => {
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
                        data = {ckeditorTextRoomtype}
                        onChange = {(event, editor) => {
                            setCkeditorTextRoomtype(editor.getData())
                        }}
                        />
                </div>
                <br />
                <label>Rejsedato:
                    <input type="date" name="traveldate" onChange={ e => new Date(e.target.value) < new Date() ? alert("Vælg venligst en dato senere end i dag") : null } required />
                </label>
                <br />
                <label>Varighed angivet i dage:
                    <input type="number" name="duration" min="1" max="500" defaultValue={14} required />
                </label>
                <br />
                <label>Pris, minimum:
                    <input type="number" name="priceminimum" required />
                </label>
                <br />
                <label>Pris, maksimum:
                    <input type="number" name="pricemaximum" required />
                </label>
                <br />
                <label>Upload et coverbillede:
                    <input type="file" name="image" required />
                </label>
                <br />
                <label>Upload galleri-billeder:
                    <input type="file" name="galleryimages" multiple required />
                </label>
                <br />
                <button id="AdminToursCreateButton" type="submit">Opret ny</button>

            </form>
        }

        {
            message &&
            <h2 id="AdminToursCreateMessage">{message}</h2>
        }
    </div>
  )
}

export default AdminToursCreate