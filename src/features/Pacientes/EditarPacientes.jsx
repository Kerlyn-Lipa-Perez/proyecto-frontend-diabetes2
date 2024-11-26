import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  Form,
  FormControl,
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { format, setYear, getYear } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

import { PacienteFormSkeleton } from "./EditarPacienteSkeleton";

const URI_PACIENTES = "http://localhost:4000/api/pacientes";
const URI_PREDICIONES = "http://localhost:4000/api/predictions";
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
    .min(8, { message: "El DNI debe tener al menos 8 dígitos." })
    .max(8, { message: "El DNI no puede exceder los 8 dígitos." })
    .regex(/^\d{8}$/, { message: "El DNI debe ser un número de 8 dígitos." }),
  telefono: z
    .string()
    .min(9, { message: "El teléfono debe tener al menos 9 dígitos." })
    .max(9, { message: "El teléfono no puede exceder los 9 dígitos." })
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
  glucosa: z
    .string()
    .regex(/^\d*$/, { message: "La glucosa debe ser un número." })
    .transform((val) => (val ? parseInt(val, 10) : 0)), // Convertir a número
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
  fecha_de_nacimiento: z.date({
    required_error: "La fecha de nacimiento es requerida.",
  }),
  factor_hereditario: z
    .number()
    .min(0, { message: "El factor hereditario no puede ser negativo." })
    .max(100, { message: "El factor hereditario no puede ser mayor a 100." })
    .transform((val) => (val ? parseInt(val, 10) : 0)),
    
});

const CompEditarPaciente = () => {
 
  const navigate = useNavigate(); // Para redireccionar después de guardar

  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
      genero: "",
      embarazos: "",
      presion: "",
      glucosa: "",
      grosor: "",
      insulina: "",
      imc: "",
      factor_hereditario: "",
    },
    // Añade esta configuración para mensajes personalizados
    criteriaMode: "all",
    mode: "onChange",
    messages: {
      required: "Este campo es obligatorio",
      pattern: "El formato no es válido",
      min: "El valor es demasiado bajo",
      max: "El valor es demasiado alto",
      maxLength: "El campo excede la longitud máxima",
      minLength: "El campo no alcanza la longitud mínima",
    },
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Cargar los datos del paciente cuando se monta el componente
  // Cargar los datos del paciente cuando se monta el componente
  useEffect(() => {
    const getPaciente = async () => {
      try {
        const response = await axios.get(`${URI_PACIENTES}/${id}`);
        const paciente = response.data.data;
      
        const prediccion = paciente.predicciones[0] || {};
        console.log(paciente);

       const formData = {
         nombres: paciente.nombres || "",
         apellidos: paciente.apellidos || "",
         dni: paciente.DNI?.toString() || "",
         telefono: paciente.telefono || "",
         genero: paciente.genero.toLowerCase() || "", // Convertir a minúsculas para matchear el schema
         fecha_de_nacimiento: paciente.fecha_nacimiento
           ? new Date(paciente.fecha_nacimiento)
           : new Date(),

         // Usar los datos de predicción o valores por defecto
         embarazos: prediccion.embarazos ? String(prediccion.embarazos) : "",
         presion: prediccion.presion_arterial
           ? String(prediccion.presion_arterial)
           : "",
         glucosa: prediccion.glucosa ? String(prediccion.glucosa) : "",
         grosor: prediccion.grosor_de_piel
           ? String(prediccion.grosor_de_piel)
           : "",
         insulina: prediccion.insulina ? String(prediccion.insulina) : "",
         imc: prediccion.imc ? String(prediccion.imc) : "",
         factor_hereditario: prediccion.factor_hereditario
           ? String(prediccion.factor_hereditario)
           : "",
       };

        form.reset(formData);

        setSelectedYear(
          paciente.fecha_nacimiento
            ? new Date(paciente.fecha_nacimiento).getFullYear()
            : new Date().getFullYear()
        );
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el paciente:", error);
        setLoading(false);
      }
    };

    getPaciente();
  }, [id, form]);

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    try {
      // await axios.patch(`${URI_PACIENTES}/${id}`, data);

   
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const userId = loggedInUser ? loggedInUser.userId : null;

      const dataToSend = {
        ...data,
        userId,
      };

      // Send update request
      await axios.patch(`${URI_PACIENTES}/${id}`, dataToSend);

      navigate("/");


    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
    }
  };

  const years = Array.from(
    { length: 121 },
    (_, i) => new Date().getFullYear() - i
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Card className="mx-auto my-10 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">Editar Paciente</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <PacienteFormSkeleton />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
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
                        className="appearance-none"
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
                        className="appearance-none"
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
                          placeholder="Ingresa el número de embarazos"
                          min="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
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
                        max="300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="glucosa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Glucosa</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingresa la presión arterial"
                        min="0"
                        max="300"
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

              {/* New Date of Birth field */}
              <FormField
                control={form.control}
                name="fecha_de_nacimiento"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Fecha de Nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", {
                                locale: es,
                              })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="flex items-center justify-between p-2 border-b">
                          <Select
                            value={selectedYear.toString()}
                            onValueChange={(value) => {
                              const newYear = parseInt(value, 10);
                              setSelectedYear(newYear);
                              if (field.value) {
                                const newDate = new Date(field.value);
                                newDate.setFullYear(newYear);
                                field.onChange(newDate);
                              }
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Selecciona un año" />
                            </SelectTrigger>
                            <SelectContent>
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newYear = selectedYear - 1;
                                setSelectedYear(newYear);
                                if (field.value) {
                                  const newDate = new Date(field.value);
                                  newDate.setFullYear(newYear);
                                  field.onChange(newDate);
                                }
                              }}
                            >
                              <ChevronUpIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                const newYear = selectedYear + 1;
                                setSelectedYear(newYear);
                                if (field.value) {
                                  const newDate = new Date(field.value);
                                  newDate.setFullYear(newYear);
                                  field.onChange(newDate);
                                }
                              }}
                            >
                              <ChevronDownIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-3">
                          <DayPicker
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (date) {
                                const newDate = new Date(date);
                                newDate.setFullYear(selectedYear);
                                field.onChange(newDate);
                              } else {
                                field.onChange(date);
                              }
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                            defaultMonth={
                              field.value || new Date(selectedYear, 0)
                            }
                            locale={es}
                            formatters={{
                              formatCaption: (date, options) => {
                                return format(date, "MMMM ", { locale: es });
                              },
                            }}
                            classNames={{
                              caption:
                                "flex justify-center pt-1 relative items-center",
                              caption_label: "text-sm font-medium capitalize",
                              nav: "space-x-1 flex items-center",
                              nav_button:
                                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                              nav_button_previous: "absolute left-1",
                              nav_button_next: "absolute right-1",
                              table: "w-full border-collapse space-y-1",
                              head_row: "flex",
                              head_cell:
                                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] capitalize",
                              row: "flex w-full mt-2",
                              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                              day_selected:
                                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                              day_today: "bg-accent text-accent-foreground",
                              day_outside: "text-muted-foreground opacity-50",
                              day_disabled: "text-muted-foreground opacity-50",
                              day_range_middle:
                                "aria-selected:bg-accent aria-selected:text-accent-foreground",
                              day_hidden: "invisible",
                            }}
                            components={{
                              IconLeft: ({ ...props }) => (
                                <ChevronLeftIcon className="h-4 w-4" />
                              ),
                              IconRight: ({ ...props }) => (
                                <ChevronRightIcon className="h-4 w-4" />
                              ),
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  Factor Hereditario  */}
              <FormField
                control={form.control}
                name="factor_hereditario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Factor Hereditario</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingresa el factor hereditario"
                        min="0"
                        max="100"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    
                  </FormItem>
                )}
              />

              <div className=" ph-23 col-span-2 flex justify-center items-center p-5">
                <Link
                  to={"/"}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 align-middle flex transition-colors duration-200"
                >
                  Regresar
                </Link>
                <Button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6 align-middle flex transition-colors duration-200 ml-5"
                >
                  Actualizar Paciente
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default CompEditarPaciente;
