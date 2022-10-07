import React, { useState } from 'react';
import "../../sass/AdminToursCreate.scss";

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';

// COMPONENTS
import Fejl from '../../components/Fejl';
import Loading from '../../components/Loading';

// API-KALD
import { createTour } from '../../helpers/api';

const AdminToursCreate = () => {

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
            setMessage("Ny tur er oprettet med følgende destination samt ID: '" + data.oprettet.destination + "' '" + data.oprettet._id + "' ✔")
            setError(false)
            e.target.reset() // Tøm/nulstil formularfelter
            setCkeditorTextContent("") // Tøm state --> tømmer ckeditor
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
    <div className="AdminToursCreateWrapper">

        <h1>Opret en ny tur</h1>

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
                <div className="ckeWrapper">
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
                <label>Første billede (desuden også det billede, vises som coverbillede på siden "Ture"):
                    <input type="file" name="image1" accept="image/x-png,image/jpeg" required />
                </label>
                    <br />
                <label>Andet billede (som bliver vist under den enkelte tur sammen med ovenstående):
                    <input type="file" name="image2" accept="image/x-png,image/jpeg" required />
                </label>
                    <br />
                <button className="AdminToursCreateButton" type="submit">Opret ny tur</button>

            </form>
        }

        {
            message &&
            <h2 className="AdminToursCreateMessage">{message}</h2>
        }

    </div>
  )
}

export default AdminToursCreate;