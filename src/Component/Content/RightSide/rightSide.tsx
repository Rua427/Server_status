
import React,{useContext, useEffect, useState} from 'react'
import './rightSide.css'
import ChartDashboard from './server_chart/Dashboard/chartDashboard'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
import ChartServers from './server_chart/chartServers'
import SideSelection from '../../../Context'
import axios from 'axios';
import { json } from 'stream/consumers'

const RightSide = () => {
  let servers: {[key: string]: number} = { };
  
  // data 배열 인덱싱으로 mysql table내 column을 이용
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

      // 해당 response로 서버 개수 
      const response = await axios.get(
        'api/data'
      );

      // 서버 테스트 결과 


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
          <div className={`${value === "Dashboard" ? "" : "disable"}`}><ChartDashboard/></div>
          <div className={`${value !== "Dashboard" ? value : "disable"}`}><ChartServers chartCategoryName={value}/></div>
          {/* 여기에 각 카테리별 서버 개수 집어넣어야 함.*/}
          <div><ServerInfo server={value} serverCount={servers}/></div>
          {/* <ServerStatus/> */}
        </div>  
      )}
    
    </SideSelection.Consumer>

  )
}

export default RightSide
