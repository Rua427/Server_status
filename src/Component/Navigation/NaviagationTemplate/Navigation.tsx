import React from 'react'
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

const Navigation = () => {
  return (
      <div className='navigation'>
        <div className="menu">
          <FiChevronLeft className='menu-icon'/>
        </div>
        <header>
          <div className="profile">
            <SiSamsung/>
            <span>Global Manufacture Support</span>
          </div>
        </header>

        <Nav Icon={TbDashboard} title={"Dashboard"} />
        <Nav Icon={AiOutlineDatabase} title={"Database"} />
        <Nav Icon={HiServerStack} title={"USM"} />
        <Nav Icon={HiOutlineServerStack} title={"LSM"} />
        <Nav Icon={HiServer} title={"vDU"} />
        <Nav Icon={HiDotsHorizontal} title={"ETC"} />

      </div>
  )
}

export default Navigation