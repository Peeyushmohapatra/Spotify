import React, { useEffect,useRef, useState } from 'react'
import "./Spotify.css"
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Spotify = () => {

  const bodyRef = useRef();
  const [navBackground,setNavBackground] = useState(false)
  const [headerBackground,setHeaderBackground] = useState(false)

  const bodyScroll = () => {
    bodyRef.current.scrollTop >=30 ? setNavBackground(true) : setNavBackground(false)
    bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false)
  }
  const dispatch = useDispatch();
  const {token} = useSelector((state) => {
    return state
  })

  useEffect(() => {
    const getUserInfo = async() => {
      const {data} = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      // console.log(data);
      const userInfo= {
        userId:data.id,
        userName:data.display_name
      }
      dispatch({
        type:"SET_USER",
        userInfo:userInfo
      })
    }
    getUserInfo()
  },[dispatch,token])
  return (
    <div className='spotifyContainer'>
      <div className="spotiffy_body">
        <Sidebar/>
        <div className="body" ref={bodyRef} onScroll={bodyScroll}>
          <Navbar navBackground={navBackground}/>
          <div className="body_contents">
            <Body headerBackground={headerBackground}/>
          </div>
        </div>
      </div>
      <div className="spotify_footer">
        <Footer/>
      </div>
    </div>
  )
}

export default Spotify