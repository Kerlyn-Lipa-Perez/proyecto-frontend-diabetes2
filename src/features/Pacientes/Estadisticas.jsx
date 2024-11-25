import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

import { MainLayaout } from "../../layout/MainLayaout";



const URI_PACIENTES = import.meta.env.VITE_URL_PACIENTES;


const Estadisticas = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:4000/api/pacientes");
      setData(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    if (ctx) {
      const chart = new Chart(ctx.getContext("2d"), {
        type: "radar",
        data: {
          labels: ["Edad", "Embarazos", "Insulina", "Grosor", "IMC"],
          datasets: data.map((paciente, index) => ({
            label: paciente.nombres,
            backgroundColor: `rgba(${(index * 30) % 255}, 99, 132, 0.2)`,
            borderColor: `rgba(${(index * 30) % 255}, 99, 132, 1)`,
            borderWidth: 1,
            data: [
              paciente.edad,
              paciente.embarazos,
              paciente.insulina,
              paciente.grosor,
              paciente.imc,
            ],
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: "Pacientes",
              font: {
                size: 24,
              },
            },
          },
          scales: {
            r: {
              beginAtZero: true,
            },
          },
        },
      });
      return () => chart.destroy();
    }
  }, [data]);

  return (
    <>
      <MainLayaout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            margin: "0 auto",
          }}
        >
          |
          <div className="w-11/12 max-w-4xl mx-auto">
            <canvas id="myChart" className="w-full h-[500px] mx-auto"></canvas>
          </div>
        </div>
      </MainLayaout>
    </>
  );
};

export default Estadisticas;


