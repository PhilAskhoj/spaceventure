import React from 'react'
import LidtOmOs from '../components/LidtOmOs'
import Slider from '../components/Slider'
import Team from '../components/Team'
import TilmeldNyhedsbrev from '../components/TilmeldNyhedsbrev'
import ToTureHome from '../components/ToTureHome'

const Home = () => {

  return (
    <main>
      <Slider />
      <ToTureHome />
      <LidtOmOs />
      <Team />
      <TilmeldNyhedsbrev />
    </main>
  )
}

export default Home