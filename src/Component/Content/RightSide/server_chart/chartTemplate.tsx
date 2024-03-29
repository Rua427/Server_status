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
const Container = styled.div`
  height:220px;
`;


interface Props{
  statusName: string,

  good: number,
  warning: number,
  bad: number,
  disconnect: number, 
}

const ChartTemplate = (props :Props )  => {
  const data = {
    labels: ['Good', 'Warning', 'Bad', 'Disconnect'],
    datasets: [
      {
        label: '# of Count',
        data: [props.good, props.warning, props.bad, props.disconnect],
        backgroundColor: [
          'rgba(60, 179, 113, 0.9)',
          'rgba(246, 187, 67, 0.9)',
          'rgba(219, 68, 85, 0.9)',
          'rgba(100, 100, 100, 0.9)',
        ],
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.4)',
      },
    ],
  };
  return (
    <div className='chartTemplate'>
        <h2>{props.statusName} Status</h2>
        <Container>
          <Doughnut data={data} options={options}  style={{position:"relative"}}/>
        </Container>
    </div>
  )
}

export default ChartTemplate
