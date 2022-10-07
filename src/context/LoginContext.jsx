import { useState, createContext } from "react";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {

    // USER state - hvori der indeholdes data, hvis en bruger er logget ind
    // -----------------------------------------------------
    const [ user, setUser ] = useState("Karl")

    // Login-funktion (stemmer brugernavn og password over ens)
    // -----------------------------------------------------
    let signIn = ( username, password ) => {
        if( username === "Admin" && password === "oktober2022" ) {
            setUser( username ); // Logget in
        } else {
            setUser( null );     // "Logget ud"
        }
    }

    // Logud-funktion
    // -----------------------------------------------------
    let signOut = () => {
        setUser( null );
    }

    // Return - det der udbydes
    return (
        <LoginContext.Provider value={ { user, signIn, signOut } }>
            { props.children }
        </LoginContext.Provider>
    )

}

export default LoginContextProvider;