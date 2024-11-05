import * as React from "react";
import { Link } from "react-router-dom";
import { Home, Users, LogOut, UserRoundIcon, ChartColumn, SearchIcon } from "lucide-react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar";

// Definimos los elementos del menú
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Pacientes",
    url: "/",
    icon: UserRoundIcon,
  },
  {
    title: "Estadísticas",
    url: "/stats",
    icon: ChartColumn,
  },
  {
    title: "Buscar",
    url: "/buscar-paciente",
    icon: SearchIcon,
  },
  {
    title: "Cerrar sesión",
    url: "/logout",
    icon: LogOut,
  },
];
 

// Componente Sidebar
export function SidebarComponent() {
  return (
    <Sidebar className="h-screen w-64 bg-gray-900 text-black"> 
      <SidebarHeader className="p-4 text-center">
        <h1 className="text-xl font-semibold">Aplicativo Diabetes</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="p-4 hover:bg-gray-700">
              <Link to={item.url} className="flex items-center space-x-2">
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center border-t border-gray-700">
        <p className="text-xs">© 2024 Aplicativo Diabetes</p>
      </SidebarFooter>
    </Sidebar>
  );  
}

export default SidebarComponent;