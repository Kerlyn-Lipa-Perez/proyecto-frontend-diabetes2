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
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IconUserAdd from "../../Icons/IconUserAdd";


let token = null;


// Definir el esquema de validación usando Zod
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
    .min(8, { message: "El DNI debe tener al menos 8 caracteres." })
    .max(8, { message: "El DNI debe tener un máximo de 8 caracteres." })
    .regex(/^[0-9]+$/, { message: "El DNI debe contener solo números." }),

  telefono: z
    .string()
    .min(9, { message: "El teléfono debe tener al menos 9 dígitos." })
    .max(15, { message: "El teléfono no debe exceder los 15 dígitos." })
    .regex(/^[0-9]+$/, { message: "El teléfono debe contener solo números." }),

  genero: z.enum(["masculino", "femenino", "otro"], {
    message: "Por favor, selecciona un género válido.",
  }),


  embarazos: z
    .number()
    .int({ message: "Los embarazos deben ser un número entero." })
    .min(0, { message: "El número de embarazos no puede ser negativo." })
    .optional(),


  presion: z
    .number({ invalid_type_error: "La presión arterial debe ser un número." })
    .min(0, { message: "La presión arterial no puede ser negativa." })
    .max(300, { message: "La presión arterial parece irreal." })
    .optional(),


  grosor: z
    .number({ invalid_type_error: "El grosor debe ser un número." })
    .min(0, { message: "El grosor no puede ser negativo." })
    .optional(),

  // Insulina es opcional, pero debe ser un número positivo
  insulina: z
    .number({ invalid_type_error: "La insulina debe ser un número." })
    .min(0, { message: "La insulina no puede ser negativa." })
    .optional(),

  // IMC debe ser obligatorio, con un valor mínimo y máximo razonable
  imc: z
    .number({ invalid_type_error: "El IMC debe ser un número." })
    .min(1, { message: "Debe colocar el IMC del paciente." })
    .max(100, { message: "El valor del IMC parece irreal." }),
});

const URI = "http://localhost:4000/api/pacientes";

// const setToken = async (newToken) => {
//   token = `Bearer ${newToken}`;
// };

export function CompCreatePacientes() {

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
      genero: "",
      embarazos: undefined,
      presion: undefined,
      grosor: undefined,
      insulina: undefined,
      imc: undefined,
    },
  });

  const setToken =  (newToken) => {
    token = `Bearer ${newToken}`;
  };
1
  const { handleSubmit } = form;

  const storePaciente = async (data) => {
    const config = {
      headers: {
        Autorization: `Bearer ${localStorage.getItem("loggedInUser")}`,
      },
    };
    try {
      await axios.post(URI, data,config);
      navigate("/"); // Redirigir a la lista de pacientes
    } catch (error) {
      console.error("Error al crear el paciente:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Agregar Paciente</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(storePaciente)} className="space-y-8">
          {/* Campo de Nombres */}
          <FormField
            control={form.control}
            name="nombres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombres</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa los nombres" {...field} />
                </FormControl>
                <FormDescription>
                  Introduce los nombres del paciente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Apellidos */}
          <FormField
            control={form.control}
            name="apellidos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellidos</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa los apellidos" {...field} />
                </FormControl>
                <FormDescription>
                  Introduce los apellidos del paciente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de DNI */}
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DNI</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ingresa el DNI" {...field} />
                </FormControl>
                <FormDescription>
                  Introduce el DNI del paciente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Teléfono */}
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
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Introduce el número de teléfono del paciente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Género */}
          <FormField
            control={form.control}
            name="genero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <select {...field} className="border rounded-md p-2">
                    <option value="">Selecciona un género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </FormControl>
                <FormDescription>
                  Selecciona el género del paciente.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Embarazos */}
          {form.watch("genero") === "femenino" && (
            <FormField
              control={form.control}
              name="embarazos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Embarazos</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa el número de embarazos si es el caso"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Introduce el número de embarazos.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Campo de Presion Arterial */}

          <FormField
            control={form.control}
            name="presion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presion Arterial</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingresa la presion arterial del paciente"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Grosor de piel */}

          <FormField
            control={form.control}
            name="Grosor de piel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grosor de piel </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingresa el grosor de piel del paciente"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Insulina */}

          <FormField
            control={form.control}
            name="insulina"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insulina</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingresa la insulina del paciente"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de IMC */}

          <FormField
            control={form.control}
            name="imc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IMC</FormLabel>
                <FormControl>
                  <Input
                    type="decimal"
                    placeholder="Ingresa el IMC del paciente"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de  */}

          {/* Boton  */}
          <Button
            onSubmit={handleSubmit(storePaciente)}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            Agregar Paciente
            <IconUserAdd className=" p-10 mr-2 ml-2 " />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default {CompCreatePacientes};