"use client"
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-black border-2 border-zinc-800 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "" }: CardProps) => (
  <div className={`pb-1 pt-3 px-3 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = "" }: CardProps) => (
  <div className={`py-1 px-2 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "" }: CardProps) => (
  <div className={`pt-0 pb-2 px-3 ${className}`}>
    {children}
  </div>
);