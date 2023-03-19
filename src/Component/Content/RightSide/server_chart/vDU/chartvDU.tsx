import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartvDU.css'
const ChartvDU = () => {
  return (
    <div className='chartvDU'>
      <ChartTemplate statusName="CPU"/>
      <ChartTemplate statusName="TEMP"/>
      <ChartTemplate statusName="RAM"/>
      <ChartTemplate statusName="DISK"/>
    </div>
  )
}

export default ChartvDU
