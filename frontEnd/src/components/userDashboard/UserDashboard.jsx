import React from 'react'
import './userdashboard.css'
import { Sidebar } from '../userSidebar/Sidebar'
import { Contents } from '../userContent/Contents'

export const UserDashboard = () => {
  return (
    <div className='main'>  
            <Sidebar />
            <Contents />

        </div>
  )
}
