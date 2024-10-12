import { useState } from 'react'

import './App.css'
import CompMostrarPacientes from './features/Pacientes/MostrarPacientes'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CompCreatePacientes from './features/Pacientes/CrearPacientes'
function App() {
  

  return (
    <div className="App">
      <h1>DIABIETES</h1>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompMostrarPacientes />} />
          <Route path="/create" element={<CompCreatePacientes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
