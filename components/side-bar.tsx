"use client";

import React, { useState } from "react";
import { Button, Divider, User } from "@heroui/react";
import { Icon } from "@iconify/react";
import { CubeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Dashboard", icon: "solar:home-2-line-duotone", href: "/dashboard" },
  { label: "Produtos", icon: "solar:folder-line-duotone", href: "/products" },
];

interface SidebarProps {
  onToggle?: (isOpen: boolean) => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push("/"); 
  };

    const toggleSidebar = () => {
        setOpen(!open);
        if (onToggle) onToggle(!open);
    };


  return (
    <>
      <Button
        isIconOnly
        variant="flat"
        onPress={toggleSidebar}
        className={`fixed top-4 z-20 dark:bg-zinc-800 dark:text-white p-2 h-8 w-8 min-w-0
                    transition-all duration-300
                    ${open ? "left-58" : "left-18"}`}
      >
        <Icon icon="solar:hamburger-menu-line-duotone" width={18} />
      </Button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-neutral-950 border-r border-zinc-800 
                    p-3 flex flex-col transition-all duration-300 z-10
                    ${open ? "w-56" : "w-16"}`}
      >
        <div className="flex items-center mb-3 ml-1 w-full">
          <div className="bg-blue-700 flex items-center justify-center rounded-md w-8 h-8 mr-2">
            <CubeIcon className="w-4 h-4 text-white" />
          </div>

          {open && (
            <div
              className={`grid flex-1 text-left text-xs leading-tight overflow-hidden transition-all duration-300 ease-in-out 
                          ${open ? "max-w-full opacity-100 ml-1" : "max-w-0 opacity-0"}`}
            >
              <span className="truncate font-medium text-sm">Produtos</span>
              <span className="truncate text-[10px]">System</span>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg text-xs
                          text-zinc-500 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors`}
            >
              <Icon icon={item.icon} width={18} />
              {open && (
                <span
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                              ${open ? "max-w-full opacity-100 ml-1" : "max-w-0 opacity-0"}`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <Divider className="my-3" />

        <div className="mt-auto flex flex-col justify-between items-center">
          {user && open && (
            <User description={user.email} name={user.name} className="mb-3" />
          )}
            <Button
              variant="bordered"
              startContent={
                <Icon
                  icon="solar:logout-line-duotone"
                  className="w-6 h-6 flex-shrink-0" 
                />
              }
              className={`overflow-hidden transition-all duration-500 ease-in-out
                ${open ? "w-auto justify-start px-3" : "w-10 min-w-10 justify-center"}`}
              onPress={handleLogout}
            >
              {open && "Sair"}
            </Button>
        </div>
      </aside>
    </>
  );
}