import React from 'react'
import ChartTemplate from './chartTemplate'
import './chartServers.css'

interface props{
    chartCategoryName: string
}

// 여기서 chartCategoryName 서버의 각 상태 결과 값을 api를 통해 가져온다.
const ChartServers = (props: props) => {
    return (
        <div className='chartServers'>
            <ChartTemplate 
                        good =          {Math.floor(Math.random() * 100)}
                        warning =       {Math.floor(Math.random() * 100)}
                        bad =           {Math.floor(Math.random() * 100)}
                        disconnect =    {Math.floor(Math.random() * 100)}
            statusName="CPU"/>
            <ChartTemplate 
                        good =          {Math.floor(Math.random() * 100)}
                        warning =       {Math.floor(Math.random() * 100)}
                        bad =           {Math.floor(Math.random() * 100)}
                        disconnect =    {Math.floor(Math.random() * 100)}
            statusName="TEMP"/>
            <ChartTemplate 
                        good =          {Math.floor(Math.random() * 100)}
                        warning =       {Math.floor(Math.random() * 100)}
                        bad =           {Math.floor(Math.random() * 100)}
                        disconnect =    {Math.floor(Math.random() * 100)}
            statusName="RAM"/>
            <ChartTemplate 
                        good =          {Math.floor(Math.random() * 100)}
                        warning =       {Math.floor(Math.random() * 100)}
                        bad =           {Math.floor(Math.random() * 100)}
                        disconnect =    {Math.floor(Math.random() * 100)}
            statusName="DISK"/>
        </div>
    )
}

export default ChartServers