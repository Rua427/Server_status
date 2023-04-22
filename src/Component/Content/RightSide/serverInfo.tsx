import React, {useState, useEffect} from 'react'
import Server from './server';
import {Tooltip} from 'react-tooltip'
import './serverInfo.css'
import 'react-tooltip/dist/react-tooltip.css';

interface Props{
  serverCount : {[key: string]: number};
  server : string;
}


const ServerInfo = (props: Props) => {
    let s: any = [];

    const [serverData, setServer] = useState<Props>();

    useEffect(() => {
      setServer(props);
    }, [props])

    if(props.server === "Dashboard" && serverData !== undefined){
      for(var key in serverData.serverCount){
        for(let x = 0; x < serverData.serverCount[key]; x++){

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

            s = s.concat(<a data-tooltip-id="my-tooltip" ><Server key={`${key}, ${x}`} status={num}/></a>)
        }
      }
    }
    else{
      for(let x = 0; x < props.serverCount[props.server]; x++){

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

        s = s.concat(<a data-tooltip-id="my-tooltip" ><Server key={`${props.server},${x}`} status={num}/></a>)
        
      }
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
