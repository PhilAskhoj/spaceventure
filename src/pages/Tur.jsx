import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../sass/Tur.scss";

// COMPONENTS
import Loading from '../components/Loading';
import Fejl from '../components/Fejl';
import parse from 'html-react-parser';

// IKONER
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from 'react-icons/fa';

// API-KALD
import { getTourByID } from '../helpers/api';

const Tur = () => {

    // Tage ID (ud fra URL'en) på den tour, der skal rettes (er en parameter - se i App.jsx)
    const {turID} = useParams()

    const [tur, setTur] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // Hent tour (ud fra ID) som skal rettes
    useEffect(() => {

        setLoading(true)

        getTourByID(turID)
        .then( (data) => {
            setTur(data)
            setError(false)
        })
        .catch( (err) => {
            setError(true)
            setTur(false)
        })
        .finally( () => {
            setLoading(false)
        });

    }, [])
        

  return (
    <section>

        {
            // Hvis API-kaldet loader - den venter på error eller data
            loading && <Loading />
        }

        {
            // Hvis der er fejl fra API'et
            error && <Fejl />
        }

        {
            tur &&

                <div key={tur._id} className="individuelTurWrapper">

                    <div className="individuelTurImgWrapper">
                        <figure>
                            <img src={"http://localhost:4444/images/tours/" + tur.image1} alt={"Et fotografi fra planeten " + tur.destination} />
                        </figure>
                        <figure>
                            <img src={"http://localhost:4444/images/tours/" + tur.image2} alt={"Et fotografi fra planeten " + tur.destination} />
                        </figure>
                    </div>

                    <div className="individuelTurTekstWrapper">

                        <div className="individuelTurTekstContainer">

                            <h2>{tur.destination}</h2>
                            <p className="individuelTurPris">{tur.price}</p>

                            <hr className="individuelTurHrTurquoiseShort" />

                            <div className="individuelTurTekstContent">
                                <h3>{tur.title}</h3>
                                {parse (tur.content)} {/* Kommer i forvejen i et p-tag igennem API'et/backenden. Derfor skal det ikke indsættes i et p-tag her, da dette vil være semantisk ukorrekt, da der hermed ville opstå et p-tag inde i et p-tag */}
                            </div>

                        </div>

                        <hr className="individuelTurHrLongGrey" />

                        <div className="individuelTurInfoContainer">

                            <div className="individuelTurInfoContent">
                                <h6>Destination:</h6>
                                <p>{tur.destination}</p>
                            </div>

                            <div className="individuelTurInfoContent">
                                <h6>Pris:</h6>
                                <p>{tur.price}</p>
                            </div>

                            <div className="individuelTurInfoContent">
                                <h6>Afstand fra jorden:</h6>
                                <p>{tur.distance}</p>
                            </div>

                            <div className="individuelTurInfoContent">
                                <h6>Flyvetid:</h6>
                                <p>{tur.traveltime}</p>
                            </div>

                        </div>

                        <hr className="individuelTurHrLongGrey" />

                        <div className="individuelTurShareContainer">
                            <h5>SHARE</h5>
                            <a href="https://www.facebook.com" target="_blank"><FaFacebookF className="shareIcon" alt="Facebook ikon" /></a>
                            <a href="https://www.twitter.com" target="_blank"><FaTwitter className="shareIcon" alt="Twitter ikon" /></a>
                            <a href="https://www.googleplus.com" target="_blank"><FaGooglePlusG className="shareIcon" alt="Google+ ikon" /></a>
                            <a href="https://www.instagram.com" target="_blank"><FaInstagram className="shareIcon" alt="Instagram ikon" /></a>
                        </div>

                    </div>


                </div>
     
        }

    </section>
  )
}

export default Tur;