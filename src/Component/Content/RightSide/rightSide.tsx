
import React from 'react'
import './rightSide.css'
import ServerChart from './serverChart'
import ServerHeader from './serverHeader'
import ServerInfo from './ServerInfo'
import ServerStatus from './ServerStatus'
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
