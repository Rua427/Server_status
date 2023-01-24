
import React from 'react'
import './rightSide.css'
import ServerInfo from './ServerInfo'
import ServerStatus from './ServerStatus'
const RightSide = () => {
  return (
    <div className='rightSide'>
      <ServerInfo/>
      <ServerStatus/>
    </div>
  )
}

export default RightSide
