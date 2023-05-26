import React,{ useEffect, useState } from 'react'
import ChartTemplate from '../chartTemplate'
import './chartDashboard.css'
import axios from 'axios';
import { ServerResult } from '../../../../../DBType';
import { list, serverResult } from '../../../../../DBType' 
import { checkEachServerStatus } from '../../../../../checkServerStatus' 

interface Props{
  enable: string
}
// 여기서 각 서버별 상태 개수를 api를 통해 가져온다.
const ChartDashboard = (props: Props) => {
  const [error, setError] = useState<any>(null);
  const [testResult, setTestResult] = useState<ServerResult[]>(serverResult)

  const getResult = async () => {
    setError("");

    // 전체 결과 가져옴 (최근 결과 값)
    const response = await axios.get<ServerResult[]>(
      'http://10.240.60.92:3301/api/server_info_result'
    );

    return response;
  }

useEffect(() => {
  getResult().then(res => setTestResult(res.data));
  //getResult().then(res => setTestResult(res.data));
}, [props.enable])


  const createChartData = (name: string) => {
    
    const data = props.enable !== "Dashboard" ? checkEachServerStatus(serverResult, name) : checkEachServerStatus(testResult, name);

    return (<ChartTemplate 
                good =          {data.good}
                warning =       {data.warning}
                bad =           {data.bad}
                disconnect =    {data.disconnect}
                statusName={name}/>)
  }

  return (
    <div className='chartDashboard'>
            {createChartData("vDU")}
            {createChartData("DataBase")}
            {createChartData("USM")}
            {createChartData("LSM")}
    </div>
  )
}

export default ChartDashboard
