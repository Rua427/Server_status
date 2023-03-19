import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartDashboard.css'
const ChartDashboard = () => {
  return (
    <div className='chartDashboard'>
      <ChartTemplate statusName="vDU"/>
      <ChartTemplate statusName="Database"/>
      <ChartTemplate statusName="USM"/>
      <ChartTemplate statusName="LSM"/>
    </div>
  )
}

export default ChartDashboard
