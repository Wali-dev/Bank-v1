import React from 'react'
import "./bankardashboard.css"
import { Sidebar } from '../bankarSidebar/Sidebar'
import { Contents } from '../bankerContent/Contents'

export const BankerDashboard = () => {
    return (
        <div className='main'>  
            <Sidebar />
            <Contents />

        </div>
    )
}
