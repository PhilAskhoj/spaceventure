import React, { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'
import "../../sass/Header.scss"

const AdminHeader = () => {

  const {user, signOut} = useContext(LoginContext);

  return (
    <header>
      Du er logget ind som: {user} &nbsp;
      <button onClick={signOut}>Logud</button>
    </header>
  )
}

export default AdminHeader