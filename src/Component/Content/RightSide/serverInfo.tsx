import React, {useState, useEffect} from 'react'
import Server from './server';
import {Tooltip} from 'react-tooltip'
import './serverInfo.css'
import 'react-tooltip/dist/react-tooltip.css';
import type {ServerList, ServerResult } from '../../../DBType' 
import { checkServerStatus } from '../../../checkServerStatus' 
import axios from 'axios';
import { list, serverResult } from '../../../DBType' 
import useInterval from 'use-interval'

interface ServerData{
  server : string;

}

// 여기에서 서버 정보 결과를 넣어준다.
const ServerInfo = (props: ServerData ) => {
    let s: any;
    const [testResult, setTestResult] = useState<ServerResult[]>(serverResult)

    const [error, setError] = useState<any>(null);

    const getResult = async (category: string) => {
      setError("");
  
      if(category === "Dashboard"){
        // 전체 결과 가져옴 (최근 결과 값)
        const response = await axios.get<ServerResult[]>(
          'http://10.240.60.92:3301/api/server_info_result'
        );
        return response;

      }
      else{
        // 특정 항목 결과 가져옴 (최근 결과 값)
        const response = await axios.get<ServerResult[]>(
          `http://10.240.60.92:3301/api/server_info_result/${category}`
        );
        return response;
      }
    }
  
    useEffect(() => {
      getResult(props.server).then(res => setTestResult(res.data));
      //getResult().then(res => setTestResult(res.data));
    }, [props.server])
  
    useInterval(()=>{
      getResult(props.server).then(res => setTestResult(res.data));
      setCount(count => count+1)

      //5분마다 업데이트
    }, 300000)
    // useEffect(() => {
    //   setServer({server: props.server, serverCount: props.serverCount});
    // }, [serverData])

    const CreateServerPoint = () => {
      // 데이터 없으면 아무것도 생성 안함
      if(testResult === undefined){ return false; }
      if(testResult.length <= 1) { return false; }
      
      // 카테 고리 선택에 따른 표시 변경
      return testResult.map((res) => {
          const status = checkServerStatus(res);
          return (<a key={`${res.IP},${res.server_name}`}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-html={ `IP : ${res.IP}<br/>` + 
                                        `Name : ${res.server_name}<br/>` + 
                                        `Category : ${res.server_category}<br/>` +
                                        `Status : ${status.reason.length === 0 ? "GOOD" : status.reason.map((text) => {
                                                                                            return text + "<br/>";
                                                                                          })}` 
                                      } >
                    <Server status={status.result}/></a>)
      })
    }

  return (
    <div className='serverInfo'>
        {CreateServerPoint()}
        <Tooltip id="my-tooltip"/>
    </div>
  )
}

export default ServerInfo
