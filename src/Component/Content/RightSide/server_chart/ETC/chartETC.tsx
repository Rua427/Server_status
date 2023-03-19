import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartETC.css'
const ChartETC = () => {
  return (
    <div className='chartETC'>
      <ChartTemplate statusName="CPU"/>
      <ChartTemplate statusName="TEMP"/>
      <ChartTemplate statusName="RAM"/>
      <ChartTemplate statusName="DISK"/>
    </div>
  )
}

export default ChartETC
