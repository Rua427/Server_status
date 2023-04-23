import React from 'react'
import ChartTemplate from '../chartTemplate'
import './chartDashboard.css'

interface props{
  
}
// 여기서 각 서버별 상태 개수를 api를 통해 가져온다.
const ChartDashboard = () => {
  return (
    <div className='chartDashboard'>
      <ChartTemplate 
                              good =          {Math.floor(Math.random() * 100)}
                              warning =       {Math.floor(Math.random() * 100)}
                              bad =           {Math.floor(Math.random() * 100)}
                              disconnect =    {Math.floor(Math.random() * 100)}
      statusName="vDU"/>
      <ChartTemplate 
                              good =          {Math.floor(Math.random() * 100)}
                              warning =       {Math.floor(Math.random() * 100)}
                              bad =           {Math.floor(Math.random() * 100)}
                              disconnect =    {Math.floor(Math.random() * 100)}
                              statusName="Database"/>
      <ChartTemplate 
                              good =          {Math.floor(Math.random() * 100)}
                              warning =       {Math.floor(Math.random() * 100)}
                              bad =           {Math.floor(Math.random() * 100)}
                              disconnect =    {Math.floor(Math.random() * 100)}
                              statusName="USM"/>
      <ChartTemplate 
                              good =          {Math.floor(Math.random() * 100)}
                              warning =       {Math.floor(Math.random() * 100)}
                              bad =           {Math.floor(Math.random() * 100)}
                              disconnect =    {Math.floor(Math.random() * 100)}
                              statusName="LSM"/>
    </div>
  )
}

export default ChartDashboard
