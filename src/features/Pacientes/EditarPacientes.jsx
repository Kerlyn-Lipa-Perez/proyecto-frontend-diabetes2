import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
 
const URI = "http://localhost:4000/api/pacientes";

const formSchema = z.object({
  nombres: z.string().min(1, { message: "El nombre es obligatorio." }),
  apellidos: z.string().min(1, { message: "El apellido es obligatorio." }),
  dni: z
    .string()
    .min(8, { message: "El DNI debe tener al menos 8 caracteres." }),
  telefono: z.string().optional(),
  genero: z.string().optional(),
});

const CompEditarPaciente = () => {

    const form = useForm({
      resolver: zodResolver(formSchema),
    });



    return (
      <>
        <h1>EDITAR PACIENTE</h1>
      </>
    )
    

};

export default CompEditarPaciente;