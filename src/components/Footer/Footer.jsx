import React from 'react'
import "./Footer.css"
import Currenttrack from '../Currenttrack/Currenttrack'
import PlayerControl from '../PlayerControl/PlayerControl'

const Footer = () => {
  return (
    <div className='footerContainer'>
      <Currenttrack/>
      <PlayerControl/>
    </div>
  )
}

export default Footer