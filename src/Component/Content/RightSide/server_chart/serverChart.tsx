import React from 'react'
import ChartTemplate from './chartTemplate'
import './serverChart.css'
const ServerChart = () => {
  return (
    <div className='serverChart'>
      <ChartTemplate serverName="vDU"/>
      <ChartTemplate serverName="Database"/>
      <ChartTemplate serverName="USM"/>
      <ChartTemplate serverName="LSM"/>
    </div>
  )
}

export default ServerChart
