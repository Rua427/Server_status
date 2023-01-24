import React from 'react'
import LeftSide from './LeftSide/leftSide'
import RightSide from './RightSide/rightSide'
import './main.css'
const Main = () => {
  return (
    <div className="main">
        <LeftSide/> 
        <RightSide/>
    </div>

  )
}

export default Main