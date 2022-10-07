import React from 'react';
import "../sass/Pagination.scss";

// IKONER TIL "NÆSTE" SAMT "FORRIGE" SIDE
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';

const Pagination = (props) => {

    let setCurrentPage = props.setCurrentPage; // Give beksed til parent (output)
    let currentPage = props.currentPage; // Fåes fra/input fra parent (input)
    let numberOfPages = props.numberOfPages; //Antal af sider alt i alt, som der bliver beregnet i parent (input fra parent)

// Skift visningen af side (pagination)
const turnPage = (page) => {

    setCurrentPage(page) // Den side, som der skal vises nu, sættes om i funktionen. Siden kommer derfor op i state, og da dette sker vil compnoneten re-render. State og props er de eneste to ting, der kan få component til at re-render. Desuden er det også parent

}

// Modtode som modtager et tal/antal og laver det tilsvarende antal sider
const makePageLinks = () => {

    let pageLinks = []

    for (let i = 0; i < numberOfPages; i++) {
      /* Link/button laves med onClick, hvor der ligges en til */
      pageLinks.push( <button onClick={() => setCurrentPage(i)} className={currentPage === i ? "pagActive" : null} key={"p" + i} >{i + 1}</button> )
    }
    
    return pageLinks

  }

  return (

    <div className="paginationWrapper">
        {/* FREM OG TILBAGE KNAPPER TIL PAGINATION */}
        <button disabled={ currentPage <= 0 ? true : false } onClick={() => turnPage(currentPage - 1)}><MdOutlineArrowLeft className="paginationIkoner" /></button>

                {/* KNAPPER MED ANTAL SIDER MELLEM TILBAGE OG FREM KNAPPERNE FRA FUNKTION */}
                {
                    makePageLinks()
                }

        <button disabled={ currentPage >= numberOfPages - 1 } onClick={() => setCurrentPage(currentPage + 1)}><MdOutlineArrowRight className="paginationIkoner" /></button>        

    </div>

  )
}

export default Pagination;