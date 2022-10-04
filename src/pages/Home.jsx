import React from 'react'
import LidtOmOs from '../components/LidtOmOs'
import SliderEffektSLET from '../components/SliderEffektSLET'
import Team from '../components/Team'
import TilmeldNyhedsbrev from '../components/TilmeldNyhedsbrev'
import ToTureHome from '../components/ToTureHome'

import "../sass/Home.scss"

const Home = () => {

  return (
    <div id="allToursWrapper">
      <SliderEffektSLET />
      <ToTureHome />
      <LidtOmOs />
      <Team />
      <TilmeldNyhedsbrev />
    </div>
  )
}

export default Home