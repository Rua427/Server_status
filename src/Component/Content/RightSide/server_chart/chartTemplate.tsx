import React, { forwardRef } from 'react'
import {useEffect, useRef} from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import  styled  from 'styled-components';
import './chartTemplate.css'
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export const options={
    responsive:false,
    plugins:{
        legend:{
            position:'right' as const,
            align:'center' as const,
            fullsize:true,
        },
        title:{
            display:true,
            text:'DashBoard',
        }

    }
}
export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Count',
        data: [Math.random() * 20, Math.random() * 20,Math.random() * 20,Math.random() * 20,Math.random() * 20,Math.random() * 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.5)',
      },
    ],
};
const Container = styled.div`
  width: 30vw;
  max-width: 100vw;
`;

const ChartTemplate = () => {

    const polarRef = useRef<ChartJSOrUndefined>(null);


    useEffect(() => {
        const chart = polarRef.current;

        if(chart){
            chart.width= 500;
            chart.height= 200;
        }
    },[]);
  return (
    <div className='chartTemplate'>
        <Container>
            <PolarArea ref={polarRef} data={data} options={options} />
        </Container>
    </div>
  )
}

export default ChartTemplate
