import React from 'react'
import LidtOmOs from '../components/LidtOmOs'
import Team from '../components/Team'
import TilmeldNyhedsbrev from '../components/TilmeldNyhedsbrev'

import "../sass/Home.scss"

const Home = () => {

  return (
    <div id="allToursWrapper">
      <h1>Home</h1>
      <LidtOmOs />
      <Team />
      <TilmeldNyhedsbrev />
    </div>
  )
}

export default Home