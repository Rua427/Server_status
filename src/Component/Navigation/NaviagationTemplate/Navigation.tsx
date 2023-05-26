import React, {HTMLAttributes, useState, useEffect, createContext, useContext} from 'react'
import Nav from '../../NavIconTemplate/Nav'
import './Navigation.css'
import {TbDashboard} from 'react-icons/tb';
import {AiOutlineDatabase} from 'react-icons/ai'
import {SiSamsung} from 'react-icons/si'
import {HiServerStack} from 'react-icons/hi2';
import {HiOutlineServerStack} from 'react-icons/hi2';
import {HiDotsHorizontal} from 'react-icons/hi';
import {HiServer} from 'react-icons/hi2';
import { FiChevronLeft } from 'react-icons/fi';
import  SideSelection  from '../../../Context';
import RightSide from '../../Content/RightSide/rightSide';
import axios from 'axios';
import { LastUpdate, lastUpdate } from '../../../DBType' 

interface Props{
  setItem: Function;
}



const Navigation = (props: Props) => {
  const [selectedItem, setItem] = useState<string>("Dashboard");
  const [lastTime, setLastTime] = useState<LastUpdate[]>(lastUpdate);

  useEffect(()=> {
    getLastUpdate().then(res => setLastTime(res.data));
    props.setItem(selectedItem);
  }, [selectedItem])

  const getLastUpdate = async () =>{
    const response = await axios.get<LastUpdate[]>(
      'http://10.240.60.92:3301/api/LastUpdate'
    );

    return response;
  }
  return (
      <div className='navigation'>
        {/* <div className="menu">
          <FiChevronLeft className='menu-icon'/>
        </div> */}
        <header>
          <div className="profile">
            <SiSamsung/>
            <span>Global Manufacture Support</span>
          </div>
        </header>
        <div className='categoryList'>
          <div onClick={() => {setItem("Dashboard")}}><Nav Icon={TbDashboard} title={"Dashboard"} isSet={selectedItem}/></div>
          <div onClick={() => {setItem("DataBase")}}><Nav Icon={AiOutlineDatabase} title={"DataBase"} isSet={selectedItem}/></div>
          <div onClick={() => {setItem("USM")}}><Nav Icon={HiServerStack} title={"USM"} isSet={selectedItem}/></div>
          <div onClick={() => {setItem("LSM")}}><Nav Icon={HiOutlineServerStack} title={"LSM"} isSet={selectedItem}/></div>
          <div onClick={() => {setItem("vDU")}}><Nav Icon={HiServer} title={"vDU"} isSet={selectedItem}/></div>
          <div onClick={() => {setItem("ETC")}}><Nav Icon={HiDotsHorizontal} title={"ETC"} isSet={selectedItem}/></div>
        </div>
        <p>{"Last Update : " + lastTime[0].t}</p> 
      </div>
  )
}

export default Navigation
