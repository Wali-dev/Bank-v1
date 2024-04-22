import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { BankerDashboard } from './components/bankerDashboard/BankerDashboard.jsx';
import { Atm } from './components/atm/Atm.jsx';
import { UserDashboard } from './components/userDashboard/UserDashboard.jsx';

const router = createBrowserRouter([
    {
        path: "/banker",
        element: <BankerDashboard />
    },
    {
        path: "/atm",
        element: <Atm />
    },
    {
        path: "/user",
        element: <UserDashboard />
    }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />

  
)
