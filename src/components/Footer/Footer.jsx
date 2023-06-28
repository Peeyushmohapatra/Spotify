import React from 'react'
import "./Footer.css"
import Currenttrack from '../Currenttrack/Currenttrack'
import PlayerControl from '../PlayerControl/PlayerControl'
import Volume from '../Volume/Volume'

const Footer = () => {
  return (
    <div className='footerContainer'>
      <Currenttrack/>
      <PlayerControl/>
      <Volume/>
    </div>
  )
}

export default Footer