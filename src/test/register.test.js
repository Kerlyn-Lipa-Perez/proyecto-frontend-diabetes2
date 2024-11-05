// Registro.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../features/Auth/Registro";


describe("Registro Component", () => {
  test("renders form fields correctly", () => {
    render(<Registro />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/DNI/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Numero de celular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirmar contraseña/i)).toBeInTheDocument();
  });

  test("displays error if passwords do not match", () => {
    render(<Registro />);
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "differentPassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));
    expect(
      screen.queryByText(/Las contraseñas no coinciden/i)
    ).toBeInTheDocument();
  });
});
