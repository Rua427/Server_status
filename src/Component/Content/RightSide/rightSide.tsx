
import React,{useContext, useEffect, useState} from 'react'
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
import axios from 'axios';
import { json } from 'stream/consumers'

const RightSide = () => {
  let servers: {[key: string]: number} = { };

  const [data, setDatas] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const getDatas = async () =>{

    servers["vDU"] = 5;
    servers["USM"] = 50;
    servers["LSM"] = 24;
    servers["Database"] = 10;
    servers["ETC"] = 10;

    try{
      setError("");
      setDatas(null);

      const response = await axios.get(
        'api/data'
      );

      setDatas(response.data);
    }
    catch(e){
    }
  }
  useEffect(() => {
    getDatas();
  })



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
          {/* 여기에 각 카테리별 서버 개수 집어넣어야 함.*/}
          <div><ServerInfo server={value} serverCount={servers}/></div>
          {/* <ServerStatus/> */}
        </div>  
      )}
    
    </SideSelection.Consumer>

  )
}

export default RightSide
