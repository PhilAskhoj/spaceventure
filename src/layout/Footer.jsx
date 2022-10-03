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
    <footer>
      
      <div>
                {
                    footer &&
                    <div>
                      <h4>KONTAKT</h4>

                        {
                            <div key={footer._id}>
                                <p>
                                <BsTelephoneFill />  {footer.phone}
                                </p>
                                <p>
                                <FaEnvelope />  {footer.email}
                                </p>
                                <p>
                                <FaLocationArrow />  {footer.address}
                                </p>
                            </div>

                        }
                        
                    </div>
                }

                <div>
                  <h4>HURTIG LINKS</h4>

                  <div>
                    <ul>
                      <li><NavLink to="/" >Hjem</NavLink></li>
                      <li><NavLink to="/rumfaergen" >Rumfærgen</NavLink></li>
                      <li><NavLink to="/ture" >Ture</NavLink></li>
                      <li><NavLink to="/galleri" >Galleri</NavLink></li>
                    </ul>
                    <button><NavLink to="/galleri" >Kontakt</NavLink></button>
                  </div>

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

        <div>

            <p>
              &copy; 2022 Space Venture. All rights reserved.
            </p>

            <div>
              <a href="https://www.facebook.com" target="_blank"><FaFacebookF className="icon" /></a>
              <a href="https://www.twitter.com" target="_blank"><FaTwitter className="icon" /></a>
              <a href="https://www.googleplus.com" target="_blank"><FaGooglePlusG className="icon" /></a>
              <a href="https://www.instagram.com" target="_blank"><FaInstagram className="icon" /></a>
            </div>

        </div>

    </footer>
  )
}

export default Footer