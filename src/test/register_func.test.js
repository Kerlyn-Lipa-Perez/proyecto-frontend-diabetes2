import Registro from "../features/Auth/Registro";
import axios from "axios";

describe("Registro Functional Tests", () => {
  test("form submits successfully when filled out correctly", async () => {
    axios.post.mockResolvedValueOnce({ status: 201 });
    render(<Registro />);

    fireEvent.change(screen.getByLabelText(/Nombre/i), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), {
      target: { value: "juan@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByLabelText(/Confirmar contraseña/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Registrarse/i }));

    await screen.findByText(/Usuario registrado con éxito/i);
  });
});
