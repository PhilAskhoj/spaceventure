import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import "../sass/Login.scss"

// Import context da der dermed bliver muligt at foretage login
import { LoginContext } from '../context/LoginContext';

const Login = () => {

  const {signIn, user} = useContext(LoginContext);

  if(user) {
    // Send brugeren til admin-siden
    return <Navigate to="/admin" replace />
  }

  const handleLogin = (e) => {

    const usernameValue = e.target.inpusername.value;
    const passwordValue = e.target.inppassword.value;

    e.preventDefault(); // Undgår at siden reloades ved submit
    console.log(e.target.inpusername.value, e.target.inppassword.value)
    signIn(usernameValue, passwordValue)

  }

  return (
    <div className="loginWrapper">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>

        <label>Username:
          <input type="text" name="inpusername" placeholder="Username" required />
        </label>

        <label>Password:
          <input type="password" name="inppassword" placeholder="Password" required />
        </label>

        <button type="submit">Login</button>

      </form>

    </div>
  )
}

export default Login