
import React,{useContext} from 'react'
import './rightSide.css'
import ChartDashboard from './server_chart/Dashboard/chartDashboard'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
import ChartvDU from './server_chart/vDU/chartvDU'
import ChartUSM from './server_chart/USM/chartUSM'
import ChartLSM from './server_chart/LSM/chartLSM'
import ChartDB from './server_chart/Dadatbase/chartDB'
import ChartETC from './server_chart/ETC/chartETC'
import SideSelection from '../../../Context'

const RightSide = () => {
  return (
    <SideSelection.Consumer>
      {value => (
        <div className='rightSide'>
          <ServerHeader/>
          <div className={`${value === "Dashboard" ? "": "disable"}`}><ChartDashboard/></div>
          <div className={`${value === "vDU" ? "": "disable"}`}><ChartvDU/></div>
          <div className={`${value === "USM" ? "": "disable"}`}><ChartUSM/></div>
          <div className={`${value === "LSM" ? "": "disable"}`}><ChartLSM/></div>
          <div className={`${value === "Database" ? "": "disable"}`}><ChartDB/></div>
          <div className={`${value === "ETC" ? "": "disable"}`}><ChartETC/></div>
          <div><ServerInfo/></div>
          {/* <ServerStatus/> */}
        </div>  
      )}
    
    </SideSelection.Consumer>

  )
}

export default RightSide
