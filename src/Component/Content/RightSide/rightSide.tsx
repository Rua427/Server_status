
import React from 'react'
import './rightSide.css'
import ChartDashboard from './server_chart/Dashboard/chartDashboard'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
import ChartvDU from './server_chart/vDU/chartvDU'
import ChartUSM from './server_chart/USM/chartUSM'
import ChartLSM from './server_chart/LSM/chartLSM'
import ChartDB from './server_chart/Dadatbase/chartDB'
import ChartETC from './server_chart/ETC/chartETC'
const RightSide = () => {
  return (
    <div className='rightSide'>
      <ServerHeader/>
      <ChartvDU/>
      <ChartUSM/>
      <ChartLSM/>
      <ChartDB/>
      <ChartETC/>
      <ServerInfo/>
      {/* <ServerStatus/> */}
    </div>
  )
}

export default RightSide
