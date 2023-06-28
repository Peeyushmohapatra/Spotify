import React from 'react'
import "./Volume.css"
import { useSelector } from 'react-redux'
import axios from 'axios'


const Volume = () => {
    const {token} = useSelector((state) => {
        return state
    })
    const setVolume = async(e) => {
        await axios.put(
            `https://api.spotify.com/v1/me/player/volume`,
            {},
            {
                params:{
                    volume_percent:parseInt(e.target.value)
                },
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
    }
  return (
    <div className='volume'>
        <input type="range" min={0} max={100} onMouseUp={e=> setVolume(e)} />
    </div>
  )
}

export default Volume