import React,{ useState, useEffect}from 'react'
import ChartTemplate from './chartTemplate'
import './chartServers.css'
import axios from 'axios';
import { ServerResult } from '../../../../DBType';
import { list, serverResult } from '../../../../DBType' 
import { checkServerEachItemStatus } from '../../../../checkServerStatus' 
import { useInterval } from 'use-interval'

interface props{
    chartCategoryName: string
}

// 여기서 chartCategoryName 서버의 각 상태 결과 값을 api를 통해 가져온다.
const ChartServers = (props: props) => {

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
    }, [props.chartCategoryName])

    useInterval(() => {
      getResult().then(res => setTestResult(res.data));
      setCount(count => count + 1)
    }, 300000)
    

    const createChartData = (name: string) => {
        const data = checkServerEachItemStatus(testResult, props.chartCategoryName, name );

        return (<ChartTemplate 
                    good =          {data.good}
                    warning =       {data.warning}
                    bad =           {data.bad}
                    disconnect =    {data.disconnect}
                    statusName={name}/>)
    }



    return (
        <div className='chartServers'>
            {createChartData("CPU_Usage")}
            {createChartData("CPU_Temp")}
            {createChartData("Memory_Usage")}
            {createChartData("Disk_Usage")}
        </div>
    )
}

export default ChartServers
