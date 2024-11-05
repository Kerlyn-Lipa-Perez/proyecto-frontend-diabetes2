import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React from 'react'
import SidebarComponent from "../components/SidebarComponent";

export const MainLayaout = ({children})=> {
  return (
    <>
      <SidebarProvider>
        <SidebarComponent />
        <SidebarTrigger />
        <>{children}</>
      </SidebarProvider>
      {/* Sidebar */}

      {/* Footer */}
    </>
  );
}
