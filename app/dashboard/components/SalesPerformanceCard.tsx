"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Vendas',
      data: [120, 190, 300, 250, 400, 350],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      tension: 0.3,
    },
  ],
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
    y: {
      ticks: { color: 'rgba(255, 255, 255, 0.7)' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' },
    },
  },
};

export default function SalesPerformanceCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h4 className="text-sm md:text-md font-bold text-gray-200">Desempenho de Vendas</h4>
      </CardHeader>
      <CardBody className="h-40 md:h-48">
        <Line data={lineData} options={lineOptions} />
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-xs text-gray-400">Último trimestre</p>
      </CardFooter>
    </Card>
  );
}
