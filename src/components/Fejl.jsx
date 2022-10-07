import React from 'react';
import "../sass/Fejl.scss";

// DENNE FEJL VISES, HVIS DER SKULLE FOREKOMME FEJLKOMBLIKATIONER PÅ SIDEN I FORBINDELSE MED API'ET.
const Fejl = () => {
  return (
    <p className="fejlBesked">Der er desværre på beklageligvis opstået en fejl.</p>
  )
}

export default Fejl;