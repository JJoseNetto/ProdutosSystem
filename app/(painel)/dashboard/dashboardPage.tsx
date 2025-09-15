import CustomerAcquisitionCard from "@/app/(painel)/dashboard/components/CustomerAcquisitionCard";
import TrafficSourcesCard from "@/app/(painel)/dashboard/components/TrafficSourcesCard";
import SalesPerformanceCard from "@/app/(painel)/dashboard/components/SalesPerformanceCard";
import VisitorsTrendCard from "@/app/(painel)/dashboard/components/VisitorsTrendCard";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Divider } from "@heroui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  return (
    <div className="flex-1 transition-all duration-300  overflow-auto p-4">
        <div className="mb-8 text-2xl">
            <h1>Dashboard</h1>
          <Divider />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <CustomerAcquisitionCard />
          <TrafficSourcesCard />
          <SalesPerformanceCard />
        </div>
        
        <VisitorsTrendCard />
    </div>
  );
}