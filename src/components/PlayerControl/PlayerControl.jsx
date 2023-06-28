import React from 'react'
import "./PlayerControl.css"
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle} from "react-icons/bs"
import {CgPlayTrackNext, CgPlayTrackPrev} from "react-icons/cg"
import {FiRepeat} from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const PlayerControl = () => {
    const {playerState,token} = useSelector((state) => {
        return state
    });

    const dispatch = useDispatch()
    const changeState = async () => {
        const state = playerState ? "pause" : "play";
        const response = await axios.put(
          `https://api.spotify.com/v1/me/player/${state}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        dispatch({
          type: "SET_PLAYER_STATE",
          playerState: !playerState,
        });
      };
      const changeTrack = async (type) => {

        await axios.post(
          `https://api.spotify.com/v1/me/player/${type}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );


        dispatch({ type: "SET_PLAYER_STATE", playerState: true });
        const response1 = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response1.data !== "") {
          const currentPlaying = {
            id: response1.data.item.id,
            name: response1.data.item.name,
            artists: response1.data.item.artists.map((artist) => artist.name),
            image: response1.data.item.album.images[2].url,
          };
          dispatch({ type: "SET_PLAYING", currentPlaying });
        } else {
          dispatch({ type: "SET_PLAYING", currentPlaying: null });
        }
      };

  return (
    <div className='player_control'>
        <div className="shuffle">
            <BsShuffle/>
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={() => {
                changeTrack("previous")
            }}/>
        </div>
        <div className="state">
            {
                playerState ? <BsFillPauseCircleFill onClick={changeState}/> : <BsFillPlayCircleFill onClick={changeState}/>
            }
        </div>
        <div className="next">
            <CgPlayTrackNext onClick={() => {
                changeTrack("next")
            }}/>
        </div>
        <div className="repeat">
            <FiRepeat/>
        </div>
    </div>
  )
}

export default PlayerControl;



