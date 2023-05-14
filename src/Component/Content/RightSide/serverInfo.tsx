import React, {useState, useEffect} from 'react'
import Server from './server';
import {Tooltip} from 'react-tooltip'
import axios from 'axios';
import './serverInfo.css'
import 'react-tooltip/dist/react-tooltip.css';
import type {ServerList, ServerResult } from '../../../DBType' 

interface Props{
  serverCount: ServerList[]; 
  server : string;
}



// 여기에서 서버 정보 결과를 넣어준다.
const ServerInfo = (props: Props) => {
    let s: any = [];

    const [serverData, setServer] = useState<Props>();
    const [error, setError] = useState<any>(null);



    const getResult = async (ip: string) => {
      setError("");
    
      // 전체 결과 가져옴 (최근 결과 값)
      const response = await axios.get<ServerResult>(
        `http://10.240.60.92:3301/api/server_info_result/${ip}`
      );
      
      return response;
    }

    useEffect(() => {
      setServer(props);
    }, [props])
      
    if(props.server === "Dashboard" && serverData !== undefined){
      var serverCount = 0;
      props.serverCount.map((res) => {

        let status: ServerResult;
        getResult(res.IP).then(r => status = r.data);

        
        const r = Math.floor(Math.random() * 100);
        let num = 0;
        if(r >= 99){
          num = 2;
        }

        else if(r >= 92){
          num = 1
        }
        else{
          num = 0;
        }
        s = s.concat(<a data-tooltip-id="my-tooltip" ><Server key={`${res.IP},${res.server_name}`} status={num}/></a>)
      })
    }
    else{
      props.serverCount.map((res) => {
        if(res.server_category === props.server){
          const r = Math.floor(Math.random() * 100);
          let num = 0;
          if(r >= 99){
            num = 2;
          }
  
          else if(r >= 92){
            num = 1
          }
          else{
            num = 0;
          }
  
          s = s.concat(<a data-tooltip-id="my-tooltip" ><Server key={`${res.IP},${res.server_name}`} status={num}/></a>)
        }
      })
    }
    

  return (
    <div className='serverInfo'>
        {s}
        <Tooltip id="my-tooltip"
        content='this is a server status area'/>
    </div>
  )
}

export default ServerInfo
