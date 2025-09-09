"use client"
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/card";
import { Doughnut } from 'react-chartjs-2';

const doughnutData = {
  labels: ['Direto', 'Social', 'Referência', 'Orgânico'],
  datasets: [
    {
      label: 'Fontes de Tráfego',
      data: [30, 25, 20, 25],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
};

export default function TrafficSourcesCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <h4 className="text-sm md:text-md font-bold text-gray-200">Fontes de Tráfego</h4>
      </CardHeader>
      <CardBody className="h-40 md:h-48">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </CardBody>
      <CardFooter className="justify-center">
        <p className="text-xs text-gray-400">Distribuição percentual</p>
      </CardFooter>
    </Card>
  );
}