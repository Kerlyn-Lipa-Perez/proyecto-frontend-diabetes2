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

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import IconUserAdd from "../../Icons/IconUserAdd";
//Iconos
import EyeIcon from "../../Icons/ViewPaciente";

import EditIcon from "../../Icons/editIcon";

import TrashIcon from "../../Icons/TrashIcon";

import {MainLayaout} from "../../layout";

import {TableSkeleton} from "./TableSkeleton";
import NumberFlow from "@number-flow/react";
import { LogOutIcon } from "lucide-react";

const URI_PREDICIONES = "http://localhost:4000/api/predictions";
const URI_PACIENTES = "http://localhost:4000/api/pacientes";

const CompMostrarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [predicion, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPacientes();
  }, []);

  //Obtener pacientes
  const getPacientes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(URI_PACIENTES);

      console.log("Datos recibidos:", response.data);

      const pacientesData = Array.isArray(response.data)
        ? response.data
        : response.data.pacientes || [];

      // Sort pacientes by most recent, with fallback to prevent errors
      const sortedPacientes = pacientesData.sort((a, b) => {
        const dateA = a.createdAt || a.fecha_creacion || 0;
        const dateB = b.createdAt || b.fecha_creacion || 0;
        return new Date(dateB) - new Date(dateA);
      });

      setPacientes(sortedPacientes);
      setLoading(false);

    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };


  const deletePaciente = async (id) => {
    try {
      await axios.delete(`${URI_PACIENTES}/${id}`);
      getPacientes();
    } catch (error) {
      return <h1> Error al eliminar el paciente : `${error}`</h1>;
    }
  };

   const handleLogout = () => {
     
     localStorage.removeItem("loggedInUser");
     
     navigate("/login");
   };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lista de Pacientes</h1>

          <div className="flex gap-5">
            <Link
              to="/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Agregar Paciente
              <IconUserAdd className="w-4 h-4" />
            </Link>
            <Link
              onClick={handleLogout}
              to="/login"
              className="bg-red-600 hover:bg-red-700 inline-flex items-center gap-2 px-4 py-2  text-white font-medium rounded-lg transition-colors"
            >
              Cerrar Sesión
              <LogOutIcon/>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          {loading ? (
            <TableSkeleton />
          ) : (
            <Table>
              <TableCaption className="text-center p-3 pb-6">
                No hay más registros...
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center whitespace-nowrap">
                    Nombres
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Apellidos
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    DNI
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap hidden sm:table-cell">
                    Teléfono
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap hidden md:table-cell">
                    Género
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    % de Riesgo
                  </TableHead>
                  <TableHead className="text-center whitespace-nowrap">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {pacientes.map((paciente) => (
                  <TableRow
                    key={paciente.id}
                    className="hover:bg-gray-50 text-center justify-center place-items-center"
                  >
                    <TableCell className="font-medium capitalize">
                      {paciente.nombres}
                    </TableCell>
                    <TableCell className="font-medium capitalize">
                      {paciente.apellidos}
                    </TableCell>
                    <TableCell className="font-medium">
                      {paciente.DNI}
                    </TableCell>
                    <TableCell className="font-medium hidden sm:table-cell">
                      {paciente.telefono}
                    </TableCell>
                    <TableCell className="font-medium hidden md:table-cell capitalize">
                      {paciente.genero}
                    </TableCell>
                    <TableCell
                      className={`text-center font-medium ${
                        paciente.predicciones &&
                        paciente.predicciones.length > 0
                          ? paciente.predicciones[0].puntaje_riesgo > 70
                            ? "text-red-600"
                            : paciente.predicciones[0].puntaje_riesgo > 40
                            ? "text-yellow-600"
                            : "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {paciente.predicciones && paciente.predicciones.length > 0
                        ? `${paciente.predicciones[0].puntaje_riesgo}%`
                        : "Sin predicción"}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {/* <Link to={`/view/${paciente.id}`}>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link> */}

                        <Link to={`/edit/${paciente.id}`}>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <EditIcon className="w-4 h-4" />
                          </Button>
                        </Link>

                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => deletePaciente(paciente.id)}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default CompMostrarPacientes;
