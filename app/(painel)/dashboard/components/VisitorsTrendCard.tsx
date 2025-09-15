"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Line } from 'react-chartjs-2';

const largeChartData = {
  labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12'],
  datasets: [
    {
      label: 'Visitantes',
      data: [1200, 1900, 1500, 2100, 1800, 2500, 2200, 2300, 2500, 2800, 2700, 3000],
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const largeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
};

export default function VisitorsTrendCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h4 className="text-sm md:text-md font-bold text-gray-200 truncate">Tendência de Visitantes - Últimos 3 Meses</h4>
      </CardHeader>
      <CardBody className="h-56 md:h-64">
        <Line data={largeChartData} options={largeChartOptions} />
      </CardBody>
      <CardFooter className="justify-between">
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-3 text-xs">
          <div>
            <span className="text-gray-400">Últimos 3 meses: </span>
            <span className="font-semibold text-gray-200">45.678</span>
          </div>
          <div>
            <span className="text-gray-400">Últimos 30 dias: </span>
            <span className="font-semibold text-gray-200">15.432</span>
          </div>
          <div>
            <span className="text-gray-400">Últimos 7 dias: </span>
            <span className="font-semibold text-gray-200">3.789</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}