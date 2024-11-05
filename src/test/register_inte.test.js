import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Registro from "../features/Auth/Registro";

jest.mock("axios");

describe("Registro Integration", () => {
  test("sends form data to backend on submit", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });
    render(<Registro />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan Pérez" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "juan@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4000/api/register",
      {
        nombre: "Juan Pérez",
        email: "juan@example.com",
        password: "password123",
        confirmPassword: "password123",
        dni: "",
        telefono: "",
      }
    );
  });
});
