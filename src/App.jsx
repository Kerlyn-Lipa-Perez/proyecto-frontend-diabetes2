import { useState } from 'react'

import './App.css'
import CompMostrarPacientes from './features/Pacientes/MostrarPacientes'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompCreatePacientes from './features/Pacientes/CrearPacientes'
import Login from './features/Auth/Login';
import Registro from './features/Auth/Registro';

function App() {
  

  return (
    <div className="App">
     

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompMostrarPacientes />} />
          <Route path="/create" element={<CompCreatePacientes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
