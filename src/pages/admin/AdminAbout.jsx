import React, {useState, useEffect} from 'react'
import "../../sass/AboutAdmin.scss"

// Ikoner
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

// Kald af API
import { getAbout, updateAbout } from '../../helpers/api'

// RTE - Rich Text Editor - wysiwyg "What You See Is What You Get"
import Editor from 'ckeditor5-custom-build'
import { CKEditor } from '@ckeditor/ckeditor5-react'

// Components
import Fejl from '../../components/Fejl'
import Loading from '../../components/Loading'

const AdminAbout = () => {

    const [aboutContent, setAboutContent] = useState(); // data/tekst mv. der skal rettes
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // State til status på opdatering af indhold
    const [message, setMessage] = useState()

    // State til infhold fra texteditoren (bruges af textarea)
    const [ckeditortext, setCkeditortext] = useState()

    // Kald API og put data (eller error) i state
    useEffect(() => {
      
        setLoading(true);

        getAbout()
            .then((data) => {
                setAboutContent(data) // Her bliver der spurgt, om der kommer data ind, hvilket der gør, og derfor bliver data'en lagt ind i vores "setAboutContent" - altså vores state. Dette vil gøre, at component'en vil blive re-renderet taget dependency-listen i betragtning. Udover states er props de eneste to ting, som kan få vores component til at re-render.
                setError(false)
            })
            .catch((err) => {
                setError(true)
                setAboutContent()
            })
            .finally(() => {
                setLoading(false)
            });

    }, []) // [] = Dependency-list. Componenten bliver kørt ind. Den kører API-kaldet. Er der nogen ændringer i state eller props vil der blive re-rendes. Er depenency-listen der ikke, kører den sig selv i loop og kan lukke siden ned, da den kører uafbrudt. En tom dependency-list betyder, at useEffect'en udelukkenden kører 1 gang. Når componenten loades første gang (og IKKE ved re-render).

    
    const handleSubmit = (e) => {

        e.preventDefault() // Undgå reload af component (= tab af data)

        // Lav formularindhold til form-data
        let aboutEdited = new FormData(e.target);

        //Promise chain
        updateAbout(aboutEdited)
        .then(data => {
            setMessage(data.message)
        })
        .catch(err => {
            setMessage("Der er desværre på beklageligvis opstået en fejl. Prøv igen senere.")
        });

    }

  return (
    <div className="adminAboutWrapper">
        <h1>Ret indhold på Om-siden</h1>

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
            aboutContent &&

            <form onSubmit={handleSubmit}>

                <label>Titel:
                    <br />
                    <input type="text" name="title" defaultValue={aboutContent.title}></input>
                </label>
                <br />
                <br />
                <label>Indhold:
                    <br />
                    {/* Tekstarea'ets indhold sendes i update - må ikke slettes! */}
                    <textarea style={{display: "none"}} type="text" name="content" defaultValue={ckeditortext}></textarea>
                </label>
                <div id="ckeWrapper">
                    <CKEditor
                        editor={Editor} // Type af editor --> vi vælger den, vi har importet
                        data={aboutContent.content}
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
                <br />
                <label>Vælg eventuelt et nyt billede:
                    <br />
                    (Det  eksisterende billede vil dermed blive erstattet)
                    <br />
                    <input id="inputFile" type="file" name="image"></input>
                </label>
                <img src={"http://localhost:5099/images/about/" + aboutContent.image} alt="Foto på siden 'Om os'" />
                <br />
                <br />
                <button type="submit">Gem rettelse</button>

            </form>

        }

        {
            message && <h2 id="adminAboutMessage">{message} ✔</h2>
        }

    </div>
  )
}

export default AdminAbout