import React, { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import "../../sass/AdminFooter.scss";

const AdminFooter = () => {

  const {user, signOut} = useContext(LoginContext);

  return (

    <footer className="adminFooter">
 
      <div>

        <p> Du er logget ind som: {user} &nbsp;</p>
        <button onClick={signOut}>Logud</button>

      </div>

    </footer>

  )
}

export default AdminFooter;