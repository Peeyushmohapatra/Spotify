import React, { useEffect } from 'react'
import "./Currenttrack.css"
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'


const Currenttrack = () => {
    const {token,currentlyPlaying} = useSelector((state) => {
        return state
    });
    const dispatch = useDispatch()
    useEffect(() => {
        const getCurrentTrack = async () => {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
            }
          );

          if(response.data !== ""){
            const {item} = response.data
            const currentlyPlaying = {
                id:item.id,
                name:item.name,
                artists:item.artists.map((artist) => artist.name),
                image:item.album.images[2].url
            }
            dispatch({ type:"SET_PLAYING", currentlyPlaying:currentlyPlaying });
          }
        };
        getCurrentTrack();
      }, [token, dispatch]);
  return (
    <div className='Currenttrack'>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="currentlyplaying" />
                    </div>
                    <div className="track_info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Currenttrack