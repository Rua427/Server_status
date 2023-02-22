
import React from 'react'
import './rightSide.css'
import ServerChart from './server_chart/serverChart'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
const RightSide = () => {
  return (
    <div className='rightSide'>
      <ServerHeader/>
      <ServerChart/>
      <ServerInfo/>
      {/* <ServerStatus/> */}
    </div>
  )
}

export default RightSide
