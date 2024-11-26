import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const URI = "http://localhost:4000/api/register";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    dni: "",
    telefono: "",
  });

  const [loading, setLoading] = useState(false); // Para controlar el estado de carga
  const navigate = useNavigate(); // Cambiar por useNavigate para redirigir
  // const { toast } = useToast();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    

    console.log("Datos del formulario:", formData);


    // Envío al backend
    setLoading(true); // Activa el estado de carga
    try {
      const response = await axios
        .post(URI, formData)
        .then((res) => console.log("Registro exitoso", res))
        .then((res) => navigate("/login"))
        .catch((err) => console.log("Error al registrar", err));
      if (response.status === 201) {
        console.log("Usuario registrado con éxito");
        // Redirigir a login u otra página si es necesario
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoading(false); // Desactiva el estado de carga
    }
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Registro</CardTitle>
          <CardDescription className="text-center">
            Crea una cuenta nueva{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu_nombre@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">DNI</Label>
              <Input
                id="dni"
                name="dni"
                type="number"
                placeholder=""
                required
                value={formData.dni}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Numero de celular</Label>
              <Input
                id="celular"
                name="telefono"
                type="number"
                placeholder="999 999 999"
                required
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-[#FFFFFF] bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground ">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline "  
            >
              Inicia sesión
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
export default Registro;
