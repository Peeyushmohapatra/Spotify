import React, { useEffect } from 'react'
import "./Body.css"
import {AiFillClockCircle} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Body = ({headerBackground}) => {
  const dispatch = useDispatch();
  const {token,selectedPlaylistId,selectedPlayList} = useSelector((state) => {
    return state;
  })

  const msToMinutes = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds <10  ? "0" : "")+seconds;
  }

  useEffect(() => {

    const getInitialPlaylist = async() => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // console.log(response);
      const selectedPlayList = {
        id:response.data.id,
        name:response.data.name,
        description:response.data.description.startsWith("<a") ? "" : response.data.description,
        image:response.data.images[0].url,
        tracks:response.data.tracks.items.map(({track}) => {
          return {
            id:track.id,
            name:track.name,
            artists:track.artists.map((artist) => artist.name),
            image:track.album.images[2].url,
            duration:track.duration_ms,
            album:track.album.name,
            context_uri:track.album.uri,
            track_number:track.track_number,
          }
        })
      }
      // console.log(selectedPlayList);
      dispatch({
        type:"SET_PLAYLIST",
        selectedPlayList:selectedPlayList
      })
    }
    getInitialPlaylist()
    // console.log(selectedPlaylistId);
    
  },[token,dispatch,selectedPlaylistId])
  return (
    <div className='bodyContainer'>
      {
        selectedPlayList && (
          <>
          <div className="playList">
            <div className="image">
              <img src={selectedPlayList.image} alt="selectedPlayList" />
            </div>
            <div className="details">
              <span className='type'>PLAYLIST</span>
              <h1 className="title">{selectedPlayList.name}</h1>
              <p className="description">{selectedPlayList.description}</p>
            </div>
          </div>
          <div className="list">
            <div style={{backgroundColor:headerBackground?"#000000dc" : ""}} className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span><AiFillClockCircle/></span>
              </div>
            </div>
            <div className="tracks">
              {
                selectedPlayList.tracks.map(({id,name,artists,image,duration,album,context_uri,number},idx) => {
                  return (
                    <div className="row" key={id}>
                      <div className="col">
                        <span>{idx + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="images">
                        <img className='img' src={image} alt="" />
                        </div>
                        <div className="info">
                        <span className="name">{name}</span>
                        <span>{artists}</span>
                      </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutes(duration)}</span>
                      </div>
                      
                    </div>
                  )
                })
              }
            </div>
          </div>
          </>
        )
      }
    </div>
  )
}

export default Body