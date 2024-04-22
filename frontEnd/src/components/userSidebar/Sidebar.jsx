import React from 'react'
import "./Sidebar.css"
import { MdSpaceDashboard, MdEmail,
    MdLogout  } from "react-icons/md";

const handleClick = () =>{
 console.log("clicked")
}
export const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="heading">BANK</div>
        <div className="sidebar--body">
            <div className="options" onClick={handleClick}><MdSpaceDashboard/> Dashboard</div>
            <div className="options"><MdEmail/> Message</div>
            <div className="options"><MdLogout/> Logout</div>
        </div>
    </div>
  )
}
