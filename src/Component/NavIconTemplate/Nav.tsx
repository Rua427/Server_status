import React from 'react'
import { IconType } from 'react-icons';
import './Nav.css'

interface Props{
    Icon: IconType;
    title: any;
}

const Nav = ({Icon, title}: Props) => {
  return (
    <div className="nav">
        {Icon && <Icon className="icon"/>}
        <h2>{title ? title : null}</h2>
    </div>
  )
}

export default Nav