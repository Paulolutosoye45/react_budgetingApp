//helpers functions
import { fetchdata } from "../helpers"

//assets
import wave from '../assets/wave.svg'
//rrd
import {Outlet, useLoaderData} from 'react-router-dom'

import Navbar from "../components/Navbar";

export  function mainloader() {
    const userName = fetchdata('userName');
    return {userName}
}
const  Main = () => {
   const {userName} = useLoaderData()
  return (
    <div className="layout">
        <Navbar  userName={userName}/>
        <main>
            <Outlet/>
        </main>
        <img src={wave} alt="" />
    </div>
  )
}

export default Main