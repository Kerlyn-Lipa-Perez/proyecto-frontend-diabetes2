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
import  IconUserAdd  from "../../Icons/IconUserAdd";
const URI = "http://localhost:4000/api/pacientes";

const CompCreatePacientes = () => {
    const [paciente, setPaciente] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [genero, setGenero] = useState('');
    const [loading, setLoading] = useState(true);
    const [content,setContent] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getPacientes();
    }, []);


    //Metodos
    const storePaciente = async (e) => {
        e.preventDefault();
        try {
            await axios.post(URI, { paciente: nombres, apellidos:apellidos, dni:dni, telefono:telefono, genero:genero, });
            navigate('/pacientes');
        } catch (error) {
            
        }

    };


    return (
        <>
        </>
    )
};


export default CompCreatePacientes