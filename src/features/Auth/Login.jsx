import { Input } from "@/components/ui/input";
import IconoDiabetes from "../../Icons/IconoLogo";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:4000/api/login";

const loading = false;
function Login() {
  const [login, setLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLoggingIn = (e) => {
    e.preventDefault();
    console.log({email: email, password: password});

    const data = {
      email: email,
      password: password
    };
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.token);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLogin(true);
          navigate("/");
        } else {
          setLogin(false);
          <Navigate to="/login" />

        }
        
      })
      .catch(error =>{ console.log(error)});
      
    
  };

  return (
    <>
      <div className=" m-40 flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
        <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
          <div className="flex justify-center items-center h-full">
            <IconoDiabetes className="align-middle" />
          </div>
          <h1 className="text-3xl font-bold  text-[#4B5563] my-auto">
            Aplicativo de diabetes
          </h1>
        </div>
        <div className="text-sm font-light text-[#6B7280] pb-8 mx-auto">.</div>
        <form className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Email
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="email"
                name="email"
                id="email"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="name@email.com"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Contraseña
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-square-asterisk"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="m8.5 14 7-4"></path>
                  <path d="m8.5 10 7 4"></path>
                </svg>
              </span>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <button
            onClick={handleLoggingIn}
            type="submit"
            className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
            disabled={loading} // Deshabilitar el botón si está cargando
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          <div className="text-sm font-light text-[#6B7280] text-center">
            No tienes una cuenta todavia?
            <br />
            <Link
              to="/registro"
              className="font-medium text-[#4F46E5] hover:underline"
            >
              Registrate
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;