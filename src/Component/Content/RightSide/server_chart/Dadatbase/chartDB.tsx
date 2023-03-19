import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartDB.css'
const ChartDB = () => {
  return (
    <div className='chartDB'>
      <ChartTemplate statusName="CPU"/>
      <ChartTemplate statusName="TEMP"/>
      <ChartTemplate statusName="RAM"/>
      <ChartTemplate statusName="DISK"/>
    </div>
  )
}

export default ChartDB
