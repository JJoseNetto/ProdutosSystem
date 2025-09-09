"use client"
import Sidebar from "@/components/side-bar";
import TabelaProducts from "./tabela-products";
import { useState } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function DashboardProductsPage(){
    const { token, isLoading } = useRequireAuth("/");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (isLoading) return null;
    if (!token) return null;
    return(
        <div>
            <Sidebar onToggle={setSidebarOpen} />
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-20" : "ml-15"} overflow-auto`}>
                <TabelaProducts/>
            </div>
        </div>
    )
}