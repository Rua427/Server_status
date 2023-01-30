import React from 'react'
import Server from './server';
import './serverInfo.css'
const ServerInfo = () => {
    let s: any = [];

    for(let y = 0; y < 50; y++){
        for(let x = 0; x < 6; x++){

            const r = Math.floor(Math.random() * 100);

            if(r >= 99){
              s = s.concat(<Server key={`${x},${y}`} status={2}/>)
            }
            else if(r >= 92){
              s = s.concat(<Server key={`${x},${y}`} status={1}/>)
            }
            else{
              s = s.concat(<Server key={`${x},${y}`} status={0}/>)
            }
        }
    }


  return (
    <div className='serverInfo'>
        {s}
    </div>
  )
}

export default ServerInfo
