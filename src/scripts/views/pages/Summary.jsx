import {
  Chart as ChartJS, ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Bar } from 'react-chartjs-2';
import NoteiDB from '../../data/dataNote';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function Summary() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1 , 2 ,3 , 4 , 5 , 6, 7],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Do Now aka Level 1',
      },
    },
  };

  return (
    <div className="container-fluid">
      <Bar options={options} data={data} role="img" aria-label="progress" />
    </div>
  );
}
export default Summary;
