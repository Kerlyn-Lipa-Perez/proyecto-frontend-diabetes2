import React from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { MainLayaout } from '../../layout';


export default function Predicciones() {
  return (
    <>
      <MainLayaout>
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">
              Predicción de Diabetes
            </CardTitle>
            <CardDescription>
              Ingrese los datos del paciente para obtener una predicción
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/predict" method="post" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Pregnancies" className="text-blue-500">
                    Número de embarazos:
                  </Label>
                  <Input
                    type="number"
                    id="Pregnancies"
                    name="Pregnancies"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Glucose" className="text-blue-500">
                    Glucosa:
                  </Label>
                  <Input type="number" id="Glucose" name="Glucose" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="BloodPressure" className="text-blue-500">
                    Presión Arterial:
                  </Label>
                  <Input
                    type="number"
                    id="BloodPressure"
                    name="BloodPressure"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="SkinThickness" className="text-blue-500">
                    Grosor de la Piel:
                  </Label>
                  <Input
                    type="number"
                    id="SkinThickness"
                    name="SkinThickness"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Insulin" className="text-blue-500">
                    Insulina:
                  </Label>
                  <Input type="number" id="Insulin" name="Insulin" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="BMI" className="text-blue-500">
                    IMC:
                  </Label>
                  <Input
                    type="number"
                    id="BMI"
                    name="BMI"
                    step="0.1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="DiabetesPedigreeFunction"
                    className="text-blue-500"
                  >
                    Función de Pedigree de Diabetes:
                  </Label>
                  <Input
                    type="number"
                    id="DiabetesPedigreeFunction"
                    name="DiabetesPedigreeFunction"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Age" className="text-blue-500">
                    Edad:
                  </Label>
                  <Input type="number" id="Age" name="Age" required />
                </div>
              </div>
              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Predecir
                </Button>
              </CardFooter>
              <h2 className="text-center">
                Riesgo de tener diabetes : <h1>SI</h1>
              </h2>
            </form>
          </CardContent>
        </Card>
      </MainLayaout>
    </>
  );
}