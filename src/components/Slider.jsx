import React, { useState, useEffect } from 'react'
import "../sass/Slider.scss"


const Slider = (props) => {
    
    const [slideIndex, setSlideIndex] = useState(0) // Første billede har index 0

    // http://localhost:5099/images/tours/
    // Image-array (liste af billeder) fra parent
    const sliderImages = props.tourGallery; // Hard-coded = ["f1_ (1).jpg", "f1_ (2).jpg", "f1_ (3).jpg"]
    // Caption-tekst fra parent
    const captiontxt = props.captiontext;

    // Laver variabelen / instanstierer "t," som er til at styre setTimeout - så timeout kan clear'es i useEffect
    let t;

    useEffect(() => {
      
        let i; // Laver variabelen / instanstierer "i," som er tæller i loops
        let slides = document.getElementsByClassName("mySlides"); // Ind i dokumentet og give alle slides
        let dots = document.getElementsByClassName("dot"); // Ind i dokumentet og give alle dot

        // Forhindrer at slide image - som skal vises - er -1, -2 osv.
        if (slideIndex >= slides.length) {
            setSlideIndex(0);
            return; // Bryd ud af useEffect og start forfra med den nye state - "sidste billede"
        }

        // Forhindrer at slide image - som skal vises - bliver større en antallet af images
        if (slideIndex < 0) {
            setSlideIndex(slides.length - 1); // Antal billeder minus 1 (for at danne karusel-visning).
            return; // Bryd ud af useEffect og start forfra med den nye state - "sidste billede"
        }

        // SLUK FOR ALLE IMAGES OG DOTS (SELVOM DER KUN ER 1 ACTIVE/VISNING)

        // Skjul alle image-div
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Tager alle de dots (selv kun 1 er active på pågældende tidspunkt), og hvor class'en så derfra bliver fjernet
        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active")
        }

        // Tænd for den slide og dot som skal vises nu
        // slideIndex er et synonym for det, som skal vises netop lige nu
        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("active");

        t = setTimeout(() => setSlideIndex(slideIndex + 1), 3000) // Her ligger vi 1 til hver gang hver 3. sekunder (3000 milisekunder). Vores useEffect sikre os dog for forhæn for, at slideren hverken kan gå i minus, og/eller at den ikke kan plusse for meget.

        // Cleanup-functin (indbygget i useEffect
        return () => {
            // Nulstil evt.tidligere timer så de ikke hober sig op i en køi hukommelsen (ved mange klik fx prev)
            clearTimeout(t);
        }

    }, [slideIndex])

  return (

    <div>

        {/* <!-- Slideshow container --> */}
        <div className="slideshow-container">

        {/* <!-- Selve billede-slideren med med tekstbeskrivelser --> */}

        {/* De to kommende sliderImages mappere er ej lagt sammen til én, da det her så ville blive udkrevet som billede-dot-billede-dot osv, i stedet for billede-billede-billede og derefter dot-dot-dot osv. */}

        {
            sliderImages.map((s, i) =>
                <div className="mySlides slidefade" key={"slide" + i}>
                    <img src={"http://localhost:5099/images/tours/" + s} />
                    <p className="text">{"Foto " + (i + 1) + " fra " + captiontxt}</p>
                </div>
            )
        }

            {/* <!-- Next and previous buttons --> */}
            <span className="next" onClick={() => setSlideIndex(slideIndex + 1)}>&#10095;</span>
            <span className="prev" onClick={() => setSlideIndex(slideIndex - 1)}>&#10094;</span>


        {/* <!-- Dots/cirkler --> */}

        <div className="dotsContainer">

        {

            sliderImages.map((s, i) =>
                <span className="dot" onClick={() => setSlideIndex(i)} key={"dot" + i}></span>
            )

        }

        </div>

        </div>

    </div>
  
  )

}

export default Slider