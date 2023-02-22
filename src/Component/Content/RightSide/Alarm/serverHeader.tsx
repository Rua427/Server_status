import React, {useState} from 'react'
import './serverHeader.css'
import {BsFillBellFill} from 'react-icons/bs';


interface Props{
  isAlarm: boolean,
}


const ServerHeader = () => {
  const [isAlarm, setAlarm] = useState<Boolean>(true);
  // alarm처리
  {


  }
  return (
    <div className='serverHeader'>
      <div className="alarm" onClick={() => { setAlarm(!isAlarm)}}>
        <div className={`alarm_status ${isAlarm ?  "alarmIsTrue": "alarmIsFalse"}`}></div>
        <BsFillBellFill  id='alarm_font'/>
      </div>
    </div>
  )
}

export default ServerHeader
