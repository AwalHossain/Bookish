import React from "react";
import { Sidebar } from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <div className="flex">
        <div className="sticky h-screen left-0 top-0">
          <Sidebar />
        </div>
        <div className="flex-1 max-w-xl mx-auto">
          <main className={` overflow-x-auto`}>{children}</main>
        </div>
      </div>
    </div>
  );
}
