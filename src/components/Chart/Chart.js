import React from "react";
import styled, { css } from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['월', '화', '수', '목', '금', '토', '일'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};


function Chart() {
    return (
        <>
            <ChartBox>
                <Bar options={options} data={data} />
            </ChartBox>
            
        </>
    )
}

export default Chart;

const ChartBox = styled.div`

  
`;
