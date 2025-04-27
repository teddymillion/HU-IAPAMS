import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ApplicationsChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Applications',
        data: [320, 450, 380, 520, 610, 750, 800],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Under Review',
        data: [280, 400, 350, 450, 500, 600, 650],
        backgroundColor: 'rgba(249, 168, 37, 0.6)',
      },
      {
        label: 'Accepted',
        data: [120, 180, 200, 220, 250, 300, 350],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      },
      {
        label: 'Rejected',
        data: [80, 120, 100, 150, 180, 200, 220],
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Applications Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ApplicationsChart;