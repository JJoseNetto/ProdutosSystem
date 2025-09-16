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

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleSidebar = () => setOpen(!open);
  const toggleMobileSidebar = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen bg-neutral-950 border-r border-zinc-800 p-3 flex flex-col transition-all duration-300 z-30
          ${open ? "w-56" : "w-16"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:translate-x-0
        `}
      >
        <Button
          isIconOnly
          variant="flat"
          onPress={toggleSidebar}
          className="dark:bg-zinc-800 dark:text-white mb-5 transition-all duration-300"
        >
          <Icon icon="solar:hamburger-menu-line-duotone" width={18} />
        </Button>

        <div className="flex items-center mb-3 ml-1 w-full">
          <div className="bg-blue-700 flex items-center justify-center rounded-md w-8 h-8 mr-2">
            <CubeIcon className="w-4 h-4 text-white" />
          </div>

          {open && (
            <div className="grid flex-1 text-left text-xs leading-tight overflow-hidden transition-all duration-300 ease-in-out">
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
                <span className="overflow-hidden transition-all duration-300 ease-in-out">
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <Divider className="my-3" />

        <div className="mt-auto flex flex-col justify-between items-center">
          {user && open && <User description={user.email} name={user.name} className="mb-3" />}
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

      {!mobileOpen && (
        <Button
          isIconOnly
          variant="flat"
          onPress={toggleMobileSidebar}
          className="fixed bottom-4 left-4 z-40 md:hidden"
        >
          <Icon icon="solar:hamburger-menu-line-duotone" width={18} />
        </Button>
      )}
    </>
  );
}
