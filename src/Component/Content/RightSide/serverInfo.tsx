import React from 'react'
import Server from './server';
import {Tooltip} from 'react-tooltip'
import './serverInfo.css'
import 'react-tooltip/dist/react-tooltip.css';

interface Props{
  serverCount : number,
}


const ServerInfo = () => {
    let s: any = [];

    for(let y = 0; y < 50; y++){
        for(let x = 0; x < 6; x++){

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

            s = s.concat(<a data-tooltip-id="my-tooltip"><Server key={`${x},${y}`} status={num}/></a>)

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
