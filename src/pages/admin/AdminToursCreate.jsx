import React, { useState } from 'react';
import "../../sass/AdminToursCreate.scss";

import Fejl from '../../components/Fejl';
import Loading from '../../components/Loading';

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import { createTour } from '../../helpers/api';

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
            setError(false)
            e.target.reset()            // Tøm/nulstil formularfelter
            setCkeditorTextContent("")  // Tøm state --> tømmer ckeditor
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

        <h1>Opret ny en ny tur</h1>


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
                <label>Beskrivelse af tur:
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
                <label>Distance fra jorden:
                    <input type="text" name="distance" required />
                </label>
                <br />
                <label>Pris:
                    <input type="text" name="price" required />
                </label>
                <br />
                <label>Destination:
                    <input type="text" name="destination" required />
                </label>
                <br />
                <label>Flyvetid:
                    <input type="text" name="traveltime" required />
                </label>
                <br />
                <label>Første billede (som desuden også det billede, der vil blive vist på siden "Ture" som et slags coverbillede):
                    <input type="file" name="image1" accept="image/x-png,image/jpeg" required />
                </label>
                <br />
                <label>Andet billede (som desuden vil blive vidst under det første udelukkende på den enkelte turs side):
                    <input type="file" name="image2" accept="image/x-png,image/jpeg" required />
                </label>

                <br />

                <button id="AdminToursCreateButton" type="submit">Opret ny tur</button>

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