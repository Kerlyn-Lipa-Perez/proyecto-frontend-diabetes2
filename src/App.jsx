
import CompMostrarPacientes from "./features/Pacientes/MostrarPacientes";
import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
import {CompCreatePacientes} from "./features/Pacientes/CrearPacientes";
import Login from "./features/Auth/Login";
import Registro from "./features/Auth/Registro";
import SidebarComponent from "./components/SidebarComponent";
import Predicciones from "./features/prediciones/Predicciones";
import EditarPacientes from "./features/Pacientes/EditarPacientes";
import LeerPacientes from "./features/Pacientes/LeerPacientes";
import Estadisticas from "./features/Pacientes/Estadisticas";


function parseJwt(token) {
  if (!token) {
    console.error("Token is null or undefined.");
    return null; // O maneja el error según tu necesidad
  }

  const base64Url = token.split(".")[1];
  if (!base64Url) {
    console.error("Invalid token format.");
    return null;
  }

  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

let token = localStorage.getItem("token");

let isAuthenticated = false; // Inicialmente asumimos que no está autenticado.

if (token) {
  const decodedToken = parseJwt(token);

  if (decodedToken && decodedToken.exp) {
    isAuthenticated = decodedToken.exp * 1000 > Date.now(); // Verificamos si el token ha expirado.
  }
}

window.localStorage.setItem("token", token);

console.log("¿Autenticado?", isAuthenticated);



function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompMostrarPacientes />} />
          <Route path="/create" element={<CompCreatePacientes />} />
          <Route path="/edit/:id" element={<EditarPacientes />} />
          <Route path="/read/:id" element={<LeerPacientes />} />

          <Route path="/prediciones" element={<Predicciones />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/stats" element={<Estadisticas />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
