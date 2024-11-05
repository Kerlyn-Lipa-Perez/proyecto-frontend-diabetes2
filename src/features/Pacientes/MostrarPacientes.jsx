import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import IconUserAdd from "../../Icons/IconUserAdd";
//Iconos
import EyeIcon from "../../Icons/ViewPaciente";

import EditIcon from "../../Icons/editIcon";

import TrashIcon from "../../Icons/TrashIcon";
import { Home, LogOut, Users } from "lucide-react";
import {MainLayaout} from "../../layout";
import DataTable from "react-data-table-component";


const URI_PACIENTES = "http://localhost:4000/api/pacientes";

const CompMostrarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPacientes();
  }, []);

  //Obtener pacientes
  const getPacientes = async () => {
    try {
      const response = await axios.get(URI_PACIENTES);
      setPacientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  const deletePaciente = async (id) => {
    try {
      await axios.delete(`${URI}/${id}`);
      getPacientes();
    } catch (error) {
      return <h1> Error al eliminar el paciente : `${error}`</h1>;
    }
  };
  const createPaciente = async (id) => {
    try {
    } catch (error) {}
  };

  return (
    <>
      <MainLayaout>
        <br />
        <br />

        <Table className="m-5">
          <TableCaption>
            {" "}
            <div className="flex-">
              <Link
                to="/create"
                className="inline-flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ml-6"
              >
                Agregar Paciente
                <IconUserAdd className="ml-2 w-4 h-4" />{" "}
                {/* Ajustar tamaño del ícono */}
              </Link>
            </div>{" "}
          </TableCaption>
          <TableHeader className="m-0 border-t p-0 even:bg-muted">
            <TableRow className="">
              <TableHead className="w-[100px] text-center">Nombres</TableHead>
              <TableHead className="w-[100px] text-center">Apellidos</TableHead>
              <TableHead className="w-[100px] text-center">DNI</TableHead>
              <TableHead className="w-[100px] text-center">Telefono</TableHead>
              <TableHead className="w-[100px] text-center">Genero</TableHead>
              <TableHead className="w-[100px] text-center">
                % de Riego de diabetes
              </TableHead>
              <TableHead className="w-[100px]   text-center">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className=" text-center">
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id}>
                <TableCell className="font-medium">
                  {paciente.nombres}
                </TableCell>
                <TableCell className="font-medium">
                  {paciente.apellidos}
                </TableCell>
                <TableCell className="font-medium">{paciente.DNI}</TableCell>
                <TableCell className="font-medium">
                  {paciente.telefono}
                </TableCell>
                <TableCell className="font-medium">{paciente.genero}</TableCell>

                <TableCell className="text-center"> Positivo</TableCell>
                <TableCell>
                  <Link to={`/view/${paciente.id}`}>
                    <Button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      <EyeIcon />
                    </Button>
                  </Link>

                  <Link to={`/edit/${paciente.id}`}>
                    <Button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => deletePaciente(paciente.id)}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MainLayaout>
    </>
  );
};

export default CompMostrarPacientes;
