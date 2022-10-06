import React, {useState, useEffect} from 'react';
import "../../sass/AdminSpacecraft.scss";

// Kald af API
import { getSpacecraft, updateSpacecraft } from '../../helpers/api';

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';

// Components
import Fejl from '../../components/Fejl';
import Loading from '../../components/Loading';

const AdminAbout = () => {

    const [spacecraft, setSpacecraft] = useState(); // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // State til status på opdatering af indhold
    const [message, setMessage] = useState()

    // State til infhold fra texteditoren (bruges af textarea)
    const [ckeditortext, setCkeditortext] = useState()

    // Kald API og put data (eller error) i state
    useEffect(() => {
      
        setLoading(true);

        getSpacecraft()
            .then((data) => {
                setSpacecraft(data) // Her bliver der spurgt, om der kommer data ind, hvilket der gør, og derfor bliver data'en lagt ind i vores "setAboutContent" - altså vores state. Dette vil gøre, at component'en vil blive re-renderet taget dependency-listen i betragtning. Udover states er props de eneste to ting, som kan få vores component til at re-render.
                setError(false)
            })
            .catch((err) => {
                setError(true)
                setSpacecraft(false)
            })
            .finally(() => {
                setLoading(false)
            });

    }, []) // [] = Dependency-list. Componenten bliver kørt ind. Den kører API-kaldet. Er der nogen ændringer i state eller props vil der blive re-rendes. Er depenency-listen der ikke, kører den sig selv i loop og kan lukke siden ned, da den kører uafbrudt. En tom dependency-list betyder, at useEffect'en udelukkenden kører 1 gang. Når componenten loades første gang (og IKKE ved re-render).

    
    const handleSubmit = (e) => {

        e.preventDefault() // Undgå reload af component (= tab af data)

        // Lav formularindhold til form-data
        let spacecraftEdited = new FormData(e.target);

        //Promise chain
        updateSpacecraft(spacecraftEdited)
        .then(data => {
            setMessage(data.message)
        })
        .catch(err => {
            setMessage("Der er desværre på beklageligvis opstået en fejl. Prøv igen senere.")
        });

    }

  return (
    <div className="adminSpacecraftWrapper">
        <h1>Ret indhold på siden "Rumfærgen"</h1>

        {
            //Hvis API-kaldet loader - den venter på error eller data
            loading && <Loading />
        }

        {
            // Hvis der er fejl fra API'et
            error && <Fejl fejlbesked="Data kan ikke hentes. Prøv igen senere." />
        }

        {
            // Hvis der er API-data i state
            spacecraft &&

            <form onSubmit={handleSubmit}>

                <label>Titel:
                    <br />
                    <input type="text" name="title" defaultValue={spacecraft.title}></input>
                </label>
                <br />
                <label>Indhold:
                    <br />
                    {/* Tekstarea'ets indhold sendes i update - må ikke slettes! */}
                    <textarea style={{display: "none"}} type="text" name="content" defaultValue={ckeditortext}></textarea>
                </label>
                <div className="ckeWrapper">
                    <CKEditor
                        editor={Editor} // Type af editor --> vi vælger den, vi har importet
                        data={spacecraft.content}
                        onChange = {(event, editor) => {
                            setCkeditortext(editor.getData())
                        }}
                        // Indholdet i textarea'et, som på adminsiden er under "indhold," bliver vist ved start af at siden loades fremfor, at det kun bliver vist, når indholdet er blevet ændret i editoren.
                        onReady = {(editor) => {
                            setCkeditortext(editor.getData())
                        }}
                    />
                </div>
                <br />
                <label>Billede:
                    <br />
                    (Det  eksisterende billede vil dermed blive erstattet)
                    <br />
                    <input type="file" accept="image/x-png,image/jpeg" />
                    <br />
                    <br />
                    Nuværende billede: <img src={"http://localhost:4444/images/spacecraft/" + spacecraft.image} alt="Nuværende foto" />
                </label>

                <br />

                <button type="submit">Gem rettelse(r)</button>

            </form>

        }

        {
            message && <h2 className="adminSpacecraftMessage">{message} ✔</h2>
        }

    </div>
  )
}

export default AdminAbout;