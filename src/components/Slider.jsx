import React, { useState, useEffect } from 'react';
import "../sass/Slider.scss";

// COMPONENTS
import Fejl from './Fejl';
import Loading from './Loading';

// API-KALD
import { getBannerSliderData } from '../helpers/api';

const Slider = () => {
    
    const [slideIndex, setSlideIndex] = useState(0)

    let timer;
    
    const [sliderBannerData, setSliderBannerData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    useEffect(() => {

        setLoading(true)
        
        getBannerSliderData()
          .then( (data) => {
            setSliderBannerData(data)
            setError(false)
          })
          .catch( (err) => {
            setError(true)
            setSliderBannerData(false)
          })
          .finally( () => {
            // uanset om der er data eller fejl stopper loading
            setLoading(false)
          });
    
      }, [])

    useEffect(() => {
      
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let squares = document.getElementsByClassName("squares");

        if (slideIndex >= slides.length) {
            setSlideIndex(0);
            return;
        }

        if (slideIndex < 0) {
            setSlideIndex(slides.length - 1);
            return;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        for (i = 0; i < squares.length; i++) {
            squares[i].classList.remove("active")
        }

        slides[slideIndex].style.display = "block";
        squares[slideIndex].classList.add("active");

        timer = setTimeout(() => setSlideIndex(slideIndex + 1), 4000)

        return () => {
            clearTimeout(timer);
        }

    }, [slideIndex, sliderBannerData])

  return (

    <div>

        <div className="slideshow-container">

            {
                loading && <Loading />
            }

            {
                error && <Fejl />
            }

            {
                sliderBannerData &&

                    <div className="sliderWrapper">

                        <div className="sliderContainer">

                            {
                                sliderBannerData.map((s, i) =>
                                <div className="mySlides" key={s + i}>
                                    <img src={"http://localhost:4444/images/banner/" + s.image} alt="Billede fra rummet" />

                                    <div className="slidertekstContainer">
                                        <h4>{s.content}</h4>
                                        <h2>{s.title}</h2>
                                    </div>

                                </div>
                                )
                            }

                        </div>

                        <div className="squaresWrapper">

                            {

                                sliderBannerData.map( (s, i) =>
                                    <span className="squares" onClick={() => setSlideIndex(i)} key={"squares" + i}></span>
                                )

                            }

                        </div>

                    </div>

            }

        </div>

    </div>
  
  )

}

export default Slider;