import React from 'react'
import './server.css'

interface props{
  status: number;

}
const Server = ({status}: props) => {

  const className= [
    "serverStat",
    status === 0 && "good",
    status === 1 && "warning",
    status === 2 && "bad",
  ].filter(Boolean).join(' ');
  return (
    <div className='server'>
        <span className={`${className}`}>

        </span>

        <div 
          className="server_status"
        >
        </div>
    </div>
  )
}

export default Server
