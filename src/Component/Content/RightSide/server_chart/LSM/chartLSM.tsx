import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartLSM.css'
const ChartLSM = () => {
  return (
    <div className='chartLSM'>
      <ChartTemplate statusName="CPU"/>
      <ChartTemplate statusName="TEMP"/>
      <ChartTemplate statusName="RAM"/>
      <ChartTemplate statusName="DISK"/>
    </div>
  )
}

export default ChartLSM
