import React, {useState, useEffect} from 'react'
import "../../sass/AdminTours.scss"
import { Link } from 'react-router-dom'

// Kald af API
import { getTours, deleteTour } from '../../helpers/api'

import Fejl from '../../components/Fejl'
import Loading from '../../components/Loading'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'

const AdminTours = () => {

  const [tours, setTours] = useState(); // data/tekst mv. der skal rettes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State til håndtering af om en tour er slettet - eller om der opstod fejl
  const [tourDeleted, setTourDeleted] = useState();

  // Kald API
  useEffect(() => {
      
    setLoading(true);

    getTours()
        .then((data) => {
            setTours(data) // Her bliver der spurgt, om der kommer data ind, hvilket der gør, og derfor bliver data'en lagt ind i vores "setAboutContent" - altså vores state. Dette vil gøre, at component'en vil blive re-renderet taget dependency-listen i betragtning. Udover states er props de eneste to ting, som kan få vores component til at re-render.
            setError(false)
        })
        .catch( (err) => {
            setError(true)
            setTours()
        })
        .finally(() => {
            setLoading(false)
        });

}, [tourDeleted]) // [] = Dependency-list. Componenten bliver kørt ind. Den kører API-kaldet. Er der nogen ændringer i state eller props vil der blive re-rendes. Er depenency-listen der ikke, kører den sig selv i loop og kan lukke siden ned, da den kører uafbrudt. En tom dependency-list betyder, at useEffect'en udelukkenden kører 1 gang. Når componenten loades første gang (og IKKE ved re-render).

// I dette tilfælde lytter den på, om der bliver slettet en tour = re-render = nyt API-kald

  const handleDelete = (ID, title) => {

    if(window.confirm("Er du sikker på, at du vil slette denne tour: '" + title + "' med dette ID: " + ID)) {
  
      // Brugeren for lov til at vælge "ja" eller nej." Hvis der trykke "nej" eller "cancel" vil funktionen ikke blive kørt, men trykkes der herimod "ja," vil funktionen blive kørt - og dermed bliver det slettet.

      setLoading(true);

      deleteTour(ID)
        .then((data) => {
          setTourDeleted([true, ID])
        })
        .catch((err) => {
          console.log(err)
          setTourDeleted(false)
        })
        .finally(() => {
          setLoading(false)
        });

    }    

  }

  return (

    <div id="AdminToursWrapper">

      <h1 id="AdminToursHeaderTitle">Tours</h1>

      <Link id="AdminNewTourLink" to="/admin/admintourscreate">Opret ny tour +</Link>

      {
        //Hvis API-kaldet loader - den venter på error eller data
        loading && <Loading />
      }

      {
        // Hvis der er fejl fra API'et
        error && <Fejl fejlbesked="Data kan ikke hentes. Prøv igen senere." />
      }

      {
        tours && <div>

          {
            tours.map(t =>
              <div id="AdminToursContainer" key={t._id}>
                <h2 id="AdminToursTitle">
                  {t.title}
                </h2>
                <p id="AdminToursTeaser">
                  {t.teaser}
                </p>
                <div id="AdminToursOptions">
                  <AiOutlineDelete id="AdminToursDelete" onClick={() => handleDelete(t._id, t.title)} title="Slet tour" alt="Symbol for sletning af tour"  />
                  <Link to={"/admin/admintoursedit/" + t._id}>
                    <AiOutlineEdit id="AdminToursEdit" title="Rediger tour" alt="Symbol for redigering af tour" />
                  </Link>
                </div>
              </div>
            )
          }

        </div>
      }


    </div>

  )

}

export default AdminTours