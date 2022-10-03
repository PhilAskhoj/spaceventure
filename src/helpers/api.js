import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'http://localhost:4444/'
});

// ---------- TOURS ----------
// ---------------------------

// ----------- GET -----------
// GET ALL TOURS
export const getTours = () => {
    // GET http://localhost:5099/tours

    let response = axiosBase.get("tours")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET ALL (BY TEASER)
export const getToursTeaser = () => {
    // GET http://localhost:5099/tours/teaser

    let response = axiosBase.get("tours/teaser")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET ALL (BY TEASER)
export const getToursSearch = (searchWord) => {
    // GET http://localhost:5099/tours/soeg/xxxxxx

    let response = axiosBase.get("tours/soeg/" + searchWord)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// GET BY ID
export const getTourByID = (ID) => {
    // GET http://localhost:5099/tours/625c787debadcefe8ed39ac9

    let response = axiosBase.get("tours/" + ID)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// POST - OPRET NY
export const createTour = (newData) => {
    // POST http://localhost:5099/tours/admin , formdata

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

// ----------- GET -----------
export const getAbout = () => {
    // GET http://localhost:5099/about

    let response = axiosBase.get("about")
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}

// ----------- PUT -----------
export const updateAbout = (aboutData) => {
    // PUT http://localhost:5099/about/admin

    let response = axiosBase.put("about/admin", aboutData)
    .then(resp => {return resp.data})
    .catch(error => {throw new Error("Der er desværre på beklageligvis opstået en fejl.")})

    return response;

}