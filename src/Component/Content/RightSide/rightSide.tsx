
import React,{useContext, useEffect, useState} from 'react'
import './rightSide.css'
import ChartDashboard from './server_chart/Dashboard/chartDashboard'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
import ChartServers from './server_chart/chartServers'
import SideSelection from '../../../Context'

const RightSide = () => {

  return (
    <SideSelection.Consumer>
      {value => (
        <div className='rightSide'>
            <ServerHeader/>
            <div className={`${value === "Dashboard" ? value : "disable"}`}><ChartDashboard enable={value}/></div>
            <div className={`${value !== "Dashboard" ? value : "disable"}`}><ChartServers chartCategoryName={value}/></div>
            {/* 여기에 각 카테리별 서버 개수 집어넣어야 함.*/}
            <div><ServerInfo server={value}/></div>
            {/* <ServerStatus/> */}
        </div>  
      )}
    
    </SideSelection.Consumer>

  )
}

export default RightSide
