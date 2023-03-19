import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartUSM.css'
const ChartUSM = () => {
  return (
    <div className='chartUSM'>
      <ChartTemplate statusName="CPU"/>
      <ChartTemplate statusName="TEMP"/>
      <ChartTemplate statusName="RAM"/>
      <ChartTemplate statusName="DISK"/>
    </div>
  )
}

export default ChartUSM
