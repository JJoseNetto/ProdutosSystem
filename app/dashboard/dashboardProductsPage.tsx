"use client"

import Sidebar from "@/components/side-bar";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useState } from "react";
import CustomerAcquisitionCard from "@/app/dashboard/components/CustomerAcquisitionCard";
import TrafficSourcesCard from "@/app/dashboard/components/TrafficSourcesCard";
import SalesPerformanceCard from "@/app/dashboard/components/SalesPerformanceCard";
import VisitorsTrendCard from "@/app/dashboard/components/VisitorsTrendCard";


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

export default function DashboardProducts() {
  const { token, isLoading } = useRequireAuth("/");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) return null;
  if (!token) return null;

  return (
    <div className="flex">
      <Sidebar onToggle={setSidebarOpen} />
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-20" : "ml-15"} overflow-auto p-4`}>
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
    </div>
  );
}