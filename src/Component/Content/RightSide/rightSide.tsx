
import React,{useContext, useEffect, useState} from 'react'
import './rightSide.css'
import ChartDashboard from './server_chart/Dashboard/chartDashboard'
import ServerHeader from './Alarm/serverHeader'
import ServerInfo from './serverInfo'
import ChartServers from './server_chart/chartServers'
import SideSelection from '../../../Context'
import axios from 'axios';
import { json } from 'stream/consumers'
import type {ServerList, ServerResult} from '../../../DBType' 
import { list, serverResult } from '../../../DBType' 
const RightSide = () => {

  // data 배열 인덱싱으로 mysql table내 column을 이용
  const [serverlist, setServerList] = useState<ServerList[]>(list);
  const [testResult, setTestResult] = useState<ServerResult[]>(serverResult)
  const [error, setError] = useState<any>(null);
  
  const getDatas = async () =>{
      setError("");

      // 해당 response로 서버 개수 
      const response = await axios.get<ServerList[]>(
        'http://10.240.60.92:3301/api/data'
      );
      return response;
  }

  const getResult = async () => {
    setError("");

    // 전체 결과 가져옴 (최근 결과 값)
    const response = await axios.get<ServerResult[]>(
      'http://10.240.60.92:3301/api/server_info_result'
    );

    return response;
  }

  useEffect(() => {
    getDatas().then(res => setServerList(res.data));
    //getResult().then(res => setTestResult(res.data));
  }, [])


  return (
    <SideSelection.Consumer>
      {value => (
        <div className='rightSide'>
          <ServerHeader/>
          <div className={`${value === "Dashboard" ? "" : "disable"}`}><ChartDashboard/></div>
          <div className={`${value !== "Dashboard" ? value : "disable"}`}><ChartServers chartCategoryName={value}/></div>
          {/* 여기에 각 카테리별 서버 개수 집어넣어야 함.*/}
          <div><ServerInfo server={value} serverCount={serverlist}/></div>
          {/* <ServerStatus/> */}
        </div>  
      )}
    
    </SideSelection.Consumer>

  )
}

export default RightSide
