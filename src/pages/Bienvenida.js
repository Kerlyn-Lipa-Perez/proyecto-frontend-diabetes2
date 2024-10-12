import React, { useState } from "react";
import "./estilos/App.css"; // Asegúrate de tener estilos básicos

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el inicio de sesión, como hacer una llamada a la API
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="app-container">
      <h1>Bienvenido a la Aplicación</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Iniciar Sesión
        </button>
      </form>
      <div className="register-section">
        <p>¿No tienes una cuenta?</p>
        <button className="btn-register">Registrarse</button>
      </div>
    </div>
  );
};

export default App;
