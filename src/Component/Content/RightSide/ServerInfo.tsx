import React from 'react'
import Server from './server';
import './serverInfo.css'
const ServerInfo = () => {
    let s: any = [];

    for(let y = 0; y < 50; y++){
        for(let x = 0; x < 6; x++){

            s = s.concat(<Server/>)
        }
    }


  return (
    <div className='serverInfo'>
        {s}
    </div>
  )
}

export default ServerInfo
