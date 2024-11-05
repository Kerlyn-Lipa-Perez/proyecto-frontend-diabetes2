import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const URI_PACIENTES = "http://localhost:4000/api/pacientes";

const formSchema = z.object({
  nombres: z
    .string()
    .min(4, { message: "Los nombres deben tener al menos 4 caracteres." })
    .max(50, { message: "Los nombres no pueden exceder los 50 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Los nombres solo deben contener letras y espacios.",
    }),
  apellidos: z
    .string()
    .min(4, { message: "Los apellidos deben tener al menos 4 caracteres." })
    .max(50, { message: "Los apellidos no pueden exceder los 50 caracteres." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Los apellidos solo deben contener letras y espacios.",
    }),
  dni: z
    .string()
    .regex(/^\d{8}$/, { message: "El DNI debe ser un número de 8 dígitos." })
    .transform((val) => parseInt(val, 10)), // Transformar a número
  telefono: z
    .string()
    .regex(/^\d{9}$/, {
      message: "El teléfono debe ser un número de 9 dígitos.",
    })
    .transform((val) => parseInt(val, 10)), // Transformar a número
  genero: z.enum(["masculino", "femenino", "otro"], {
    message: "Por favor, selecciona un género válido.",
  }),
  embarazos: z
    .string()
    .regex(/^\d*$/, { message: "Los embarazos deben ser un número entero." })
    .transform((val) => (val ? parseInt(val, 10) : 0)),
  presion: z
    .string()
    .regex(/^\d*$/, { message: "La presión arterial debe ser un número." })
    .transform((val) => (val ? parseInt(val, 10) : 0)),
  grosor: z
    .string()
    .regex(/^\d*$/, { message: "El grosor debe ser un número." })
    .transform((val) => (val ? parseInt(val, 10) : 0)),
  insulina: z
    .string()
    .regex(/^\d*$/, { message: "La insulina debe ser un número." })
    .transform((val) => (val ? parseInt(val, 10) : 0)),
  imc: z
    .string()
    .regex(/^\d*\.?\d*$/, { message: "El IMC debe ser un número." })
    .transform((val) => (val ? parseFloat(val) : 0)),
});


const CompEditarPaciente = () => {
  const { userId } = useParams(); // Obtener el ID del paciente desde los parámetros de la URL
  const navigate = useNavigate(); // Para redireccionar después de guardar
  const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga
  
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // Cargar los datos del paciente cuando se monta el componente
  // Cargar los datos del paciente cuando se monta el componente
    useEffect(() => {
      // Cargar los datos del paciente
      const fetchPaciente = async () => {
        try {
          const response = await axios.get(`${URI_PACIENTES}/${userId}`);
          const data = response.data;

          // Rellena el formulario con los datos del paciente
          form.reset(data);
        } catch (error) {
          console.error("Error al cargar los datos del paciente:", error);
        }
      };

      fetchPaciente();
    }, [userId, form]);

  // Manejar el envío del formulario
  const handleSubmit = async (data) => {
    try {
      await axios.patch(`${URI_PACIENTES}/${userId}`, data);
      alert("Paciente actualizado con éxito");
      navigate("/pacientes"); // Redirigir a la lista de pacientes o a otra página
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
  };

  if (loading) return <p>Cargando datos...</p>; // Muestra mientras se cargan los datos

  return (
    <Card className="mx-auto my-10 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">Editar Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa los nombres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa los apellidos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa el DNI"
                      maxLength={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa el teléfono"
                      maxLength={9}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="femenino">Femenino</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="presion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presión Arterial</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa la presión arterial"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grosor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grosor de Piel</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa el grosor de piel"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insulina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insulina</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa la insulina"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMC</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa el IMC"
                      min="1"
                      max="100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="ph-23 col-span-2 flex justify-center items-center">
              <Button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 align-middle flex transition-colors duration-200"
              >
                Actualizar Paciente
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );


  
};

export default CompEditarPaciente;