import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'http://localhost:4444/'
});


// GET BANNERS (SLIDER)
export const getBannerSliderData = () => {
    // GET http://localhost:4444/banner

    let response = axiosBase.get("banner")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET "LIDT OM OS"
export const getAbout = () => {
    // GET http://localhost:4444/about

    let response = axiosBase.get("about")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET TEAM
export const getTeam = () => {
    // GET http://localhost:4444/team

    let response = axiosBase.get("team")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET FOOTER
export const getFooter = () => {
    // GET http://localhost:4444/footer

    let response = axiosBase.get("footer")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET "RUMFÆRGE"
export const getSpacecraft = () => {
    // GET http://localhost:4444/spacecraft

    let response = axiosBase.get("spacecraft")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}


// GET "GALLERI" PÅ SIDEN "RUMFÆRGE"
export const getGallery = () => {
    // GET http://localhost:4444/gallery

    let response = axiosBase.get("gallery")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// POST - TILMELDING AF NYHEDSBREV
export const createSubscribeNewsletter = (subscribtionData) => {
    // POST http://localhost:4444/newssubscription

    let response = axiosBase.post("newssubscription", subscribtionData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET ALLE TURE
export const getAllTours = () => {
    // GET http://localhost:4444/tours

    let response = axiosBase.get("tours")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET BY ID
export const getTourByID = (ID) => {
    // GET http://localhost:4444/tours/617f80a6066b123e4c7c941a

    let response = axiosBase.get("tours/" + ID)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// POST - TILMELDING AF NYHEDSBREV
export const createContact = (contactData) => {
    // POST http://localhost:4444/contact

    let response = axiosBase.post("contact", contactData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

export const getSafety = () => {
    // GET http://localhost:4444/safety

    let response = axiosBase.get("safety")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// POST - OPRET NY TUR
export const createTour = (newData) => {
    // POST http://localhost:4444/tours/admin , formdata

    let response = axiosBase.post("tours/admin", newData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}


// PUT - RET (ud fra ID)
export const updateTour = (updatedData, ID) => {
    // PUT http://localhost:5099/tours/admin/6255cfb40b7abe9bb00a7014 , formdata

    let response = axiosBase.put("tours/admin/" + ID, updatedData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// DELETE - SLET (ud fra ID)
export const deleteTour = (ID) => {
    // DELETE http://localhost:5099/tours/admin/xxxxxxxxxxxxxxxxxxxxx

    let response = axiosBase.delete("tours/admin/" + ID)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// ---------- ABOUT ----------
// ---------------------------

// ----------- PUT -----------
export const updateAbout = (aboutData) => {
    // PUT http://localhost:4444/about/admin

    let response = axiosBase.put("about/admin", aboutData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// PUT - RET "RUMFÆRGEN"
export const updateSpacecraft = (spacecraftData) => {
    // PUT http://localhost:4444/spacecraft/admin

    let response = axiosBase.put("spacecraft/admin", spacecraftData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}