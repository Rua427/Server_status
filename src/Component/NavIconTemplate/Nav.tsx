import React, { useState } from 'react'
import { IconType } from 'react-icons';
import './Nav.css'

interface Props{
    Icon: IconType;
    title: string;
    isSet: string;
}

const Nav = ({Icon, title, isSet}: Props) => {

  return (
    <div className={`nav ${isSet === title ? "selection" : ""}`}>
        {Icon && <Icon className="icon"/>}
        <h2>{title ? title : null}</h2>
    </div>
  )
}

export default Nav