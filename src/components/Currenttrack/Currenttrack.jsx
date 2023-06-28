import React, { useEffect } from 'react'
import "./Currenttrack.css"
import {useDispatch, useSelector} from "react-redux"
import axios from 'axios'


const Currenttrack = () => {
    const {token,currentlyPlaying} = useSelector((state) => {
      // console.log(state.currentlyPlaying);
        return state
    });
    const dispatch = useDispatch()
    useEffect(() => {
        const getCurrentTrack = async () => {
          const response = await axios.get(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if(response.data !== ""){
            // const {item} = response.data
            const currentlyPlaying = {
                id:response.data.item.id,
                name:response.data.item.name,
                artists:response.data.item.artists.map((artist) => artist.name),
                image:response.data.item.album.images[2].url
            };
            dispatch({ type:"SET_PLAYING", currentlyPlaying:currentlyPlaying });
           
          }else{
            dispatch({ type:"SET_PLAYING", currentlyPlaying:null });
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


