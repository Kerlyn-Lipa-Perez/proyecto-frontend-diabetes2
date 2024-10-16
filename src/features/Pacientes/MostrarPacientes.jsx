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
import { Button } from "@/components/ui/button";
import IconUserAdd from "../../Icons/IconUserAdd";
const URI = "http://localhost:4000/api/pacientes";


const CompMostrarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPacientes();
  }, []);

  //Metodos
  const getPacientes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/pacientes");
      setPacientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  const deletePaciente = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getPacientes();
    } catch (error) {
      return <h1> Error al eliminar el paciente : `${error}`</h1>;
    }
  };

  return (
    <>
    <br />
    <br />
      <Link
        to="/create"
        className=" m-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5  py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {" "}
        Agregar {IconUserAdd}
      </Link>
      <Table className="m-5" >
        <TableCaption> ....</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nombres</TableHead>
            <TableHead className="w-[100px]">Apellidos</TableHead>
            <TableHead className="w-[100px]">DNI</TableHead>
            <TableHead className="w-[100px]">Telefono</TableHead>
            <TableHead className="w-[100px]">Genero</TableHead>
            <TableHead className="w-[100px]">% de Riego de diabetes</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pacientes.map((paciente) => (
            <TableRow key={paciente.id}>
              <TableCell className="font-medium">{paciente.nombres}</TableCell>
              <TableCell className="font-medium">
                {paciente.apellidos}
              </TableCell>
              <TableCell className="font-medium">{paciente.DNI}</TableCell>
              <TableCell className="font-medium">{paciente.telefono}</TableCell>
              <TableCell className="font-medium">{paciente.genero}</TableCell>

              <TableCell className="text-center">...</TableCell>
              <TableCell>
                <a
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  to={`/edit/${paciente.id}`}
                >
                  Editar
                </a>
                <Button 
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={() => deletePaciente(paciente.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </>
  );
};

export default CompMostrarPacientes;
