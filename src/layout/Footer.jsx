import React from 'react'
import "../sass/Footer.scss"

import { useState, useEffect } from 'react'
import { getFooter } from '../helpers/api'
import { NavLink } from 'react-router-dom'

import { BsTelephoneFill } from 'react-icons/bs';
import { FaEnvelope, FaLocationArrow, FaFacebookF, FaGooglePlusG, FaInstagram, FaTwitter } from 'react-icons/fa'

const Footer = () => {
  
      const [footer, setFooter] = useState()
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(false)
  
      useEffect(() => {
  
          setLoading(true)
  
          setTimeout (() => {
  
              getFooter(
  
              )
              .then( data => {
  
                  if (data) {
                      setFooter(data)
                      setError(false)
                  }
                  else {
                      setFooter()
                      setError(true)
                  }
              })
              .finally(
                  setLoading(false)
              )
          },  0);
  
      }, [])

  return (
    <footer className="footer">
      
      <div className="footerKontaktLinks">
                {
                  footer &&
                    <div>
                      <h4>KONTAKT</h4>

                        {
                            <div key={footer._id}>
                                <p className="footerKontakt">
                                <BsTelephoneFill className="footerKontaktIcon" /> +45 {footer.phone}
                                </p>
                                <p className="footerKontakt">
                                <FaEnvelope className="footerKontaktIcon" /> {footer.email}
                                </p>
                                <p className="footerKontakt">
                                <FaLocationArrow className="footerKontaktIcon" /> {footer.address}
                                </p>
                            </div>

                        }
                        
                    </div>
                }

                <div>
                  <h4>HURTIG LINKS</h4>

                  <div>
                    <ul>
                      <li><NavLink to="/rumfaergen" >Rumfærgen</NavLink></li>
                      <li><NavLink to="/galleri" >Galleri</NavLink></li>
                      <li><NavLink to="/ture" >Ture</NavLink></li>
                      <li><NavLink to="/sikkerhed" >Sikkerhed</NavLink></li>
                      <li><a href="">Vores team</a></li>
                    </ul>
                    <button><NavLink className="buttonTekst" to="/kontakt">Kontakt</NavLink></button>
                  </div>

                </div>
            {
                loading &&
                <p>
                    Dataen loades... vent venligst
                </p>
            }

            {
                error &&
                <h1>Der er dersværre opstået en fejl</h1>
            }

      </div>


      <div className="footerCopyIcons">

            <p>
              &copy; 2022 Space Venture. All rights reserved.
            </p>

            <div className="footerSocialIcons">
              <a href="https://www.facebook.com" target="_blank"><FaFacebookF className="icon" alt="Facebook ikon" /></a>
              <a href="https://www.twitter.com" target="_blank"><FaTwitter className="icon" alt="Twitter ikon" /></a>
              <a href="https://www.googleplus.com" target="_blank"><FaGooglePlusG className="icon" alt="Google+ ikon" /></a>
              <a href="https://www.instagram.com" target="_blank"><FaInstagram className="icon" alt="Instagram ikon" /></a>
            </div>

      </div>

    </footer>
  )
}

export default Footer