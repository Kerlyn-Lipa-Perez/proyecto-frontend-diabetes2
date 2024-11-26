import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import App from './App'
import CompMostrarPacientes from './features/Pacientes/MostrarPacientes';
import Registro from './features/Auth/Registro';
import Login from './features/Auth/Login';
import { CompCreatePacientes } from './features/Pacientes/CrearPacientes';
import EditarPacientes from './features/Pacientes/EditarPacientes';
function AppRouter() {
  return (
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/pacientes" element={<CompMostrarPacientes />} />
        <Route path="/pacientes/create" element={<CompCreatePacientes />} />
        <Route path="/pacientes/view/:id" element={<EditarPacientes />} />
        <Route path="/pacientes/edit/:id" element={<EditarPacientes />} />
        <Route path="/edit/:id" element={<EditarPacientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;