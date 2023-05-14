import React, {useState, useEffect} from 'react'
import Server from './server';
import {Tooltip} from 'react-tooltip'
import './serverInfo.css'
import 'react-tooltip/dist/react-tooltip.css';
import type {ServerList, ServerResult } from '../../../DBType' 
import type { CheckStatus } from '../../../checkServerStatus' 
import { checkServerStatus } from '../../../checkServerStatus' 

interface Props{
  serverCount: ServerResult[]; 
  server : string;
}



// 여기에서 서버 정보 결과를 넣어준다.
const ServerInfo = (props: Props) => {
    let s: any = [];
    const [serverData, setServer] = useState<Props>();

    useEffect(() => {
      setServer(props);
      CreateServerPoint();
    }, [])
      
    const CreateServerPoint = () => {
      // 데이터 없으면 아무것도 생성 안함
      if(serverData === undefined){ return false; }
      
      // 카테 고리 선택에 따른 표시 변경
      serverData.serverCount.map((res) => {
        if(res.server_category === props.server || props.server === "Dashboard"){
          const status: CheckStatus = checkServerStatus(res);
          s = s.concat(<a data-tooltip-id="my-tooltip"
                          data-tooltip-html={ `IP : ${res.IP}<br/>` + 
                                              `Name : ${res.server_name}<br/>` + 
                                              `Category : ${res.server_category}<br/>` +
                                              `Status : ${status.reason.length === 0 ? "GOOD" : status.reason.map((text) => {
                                                return text + "<br/>";
                                              })}` } >
          <Server key={`${res.IP},${res.server_name}`} status={status.result}/>
         </a>)
        }
      })
    }

  return (
    <div className='serverInfo'>
        {s}
        <Tooltip id="my-tooltip"/>
    </div>
  )
}

export default ServerInfo
