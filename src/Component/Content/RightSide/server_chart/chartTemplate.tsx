import React, { forwardRef } from 'react'
import {useEffect, useRef} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import  styled  from 'styled-components';
import './chartTemplate.css'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);


export const options={
  maintainAspectRatio:false,
  responsive:true,
  plugins:{
      legend:{
        position:'right' as const,
        align:'center' as const,
        fullsize:true,
      },
      subtitle: {
        display: true,
        text: 'Custom Chart Subtitle'
      },
  },
  layout:{
    padding:20
  }
}
export const data = {
    labels: ['Good', 'Warning', 'Bad', 'Disconnect'],
    datasets: [
      {
        label: '# of Count',
        data: [Math.random() * 20, Math.random() * 20,Math.random() * 20,Math.random() * 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderWidth: 2,
        borderColor: 'rgba(120,120,120,1)',
      },
    ],
};
const Container = styled.div`
  height:220px;
`;


interface Props{
  serverName: string,

}

const ChartTemplate = (props :Props )  => {
  return (
    <div className='chartTemplate'>
        <h2>{props.serverName} Status</h2>
        <Container>
          <Doughnut data={data} options={options}  style={{position:"relative"}}/>
        </Container>
    </div>
  )
}

export default ChartTemplate
