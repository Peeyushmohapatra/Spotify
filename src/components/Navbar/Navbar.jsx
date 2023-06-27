import React from 'react'
import "./Navbar.css"
import { useSelector } from 'react-redux'
import {FaSearch} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"

const Navbar = ({navBackground}) => {
  const {userInfo} = useSelector((state) => {
    return state
  })
  // console.log(userInfo.userName);
  return (
    <div style={{backgroundColor:navBackground ? "rgba(0,0,0,0.7)" : "none"}} className='navbarContainer'>
      <div className="search_bar">
      <FaSearch/>
      <input type="text" placeholder='Artists, Songs, or podcasts ' />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile/>
          <span>{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  )
}

export default Navbar


// 1:45:38