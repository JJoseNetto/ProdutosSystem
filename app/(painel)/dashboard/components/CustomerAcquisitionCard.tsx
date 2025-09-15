"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Chart as ChartJS, BarElement, CategoryScale,ArcElement, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const barData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Novos Clientes',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
};

export default function CustomerAcquisitionCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-sm font-bold text-gray-200">Aquisição de Clientes</h2>
      </CardHeader>
      <CardBody className="h-40 md:h-48">
        <Bar data={barData} options={barOptions} />
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-xs text-gray-400">Desempenho dos últimos 6 meses</p>
      </CardFooter>
    </Card>
  );
}