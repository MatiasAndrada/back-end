/*Realizar los endpoints get que permitan recibir las peticiones de cálculo con los parámetros correspondientes. La respuesta será en formato objeto y representará el tipo de cálculo, la figura, los parámetros de entrada y el resultado.*/
import express from "express";
import { Superficie } from "./superficie";
import { Perimetro } from "./perimetro";
const app = express();
app.set("PORT", 8080);
const superficie = new Superficie();
const perimetro = new Perimetro();

app.get("/perimetro/:figura/:param1/:param2?/:param3?", (req, res) => {
    const { figura, param1, param2, param3 } = req.params;
    let result
    switch (figura) {
        case "cuadrado":
             result = perimetro.cuadrado(Number(param1));
            break;
        case "rectangulo": 
             result = perimetro.rectangulo(Number(param1), Number(param2));
            break;
        case "triangulo":
             result = perimetro.triangulo(Number(param1), Number(param2), Number(param3));
            break;
        default:
            result = "Figura no válida";
            break;
    }
    res.send({
    operacion: "perimetro",
    figura: figura,
    parametros: [param1, param2, param3],
    resultado: result});
});
app.get("/superficie/:figura/:param1/:param2?", (req, res) => {
    const { figura, param1, param2} = req.params;
    let result
    switch (figura) {
        case "cuadrado":
             result = superficie.cuadrado(Number(param1));
            break;
        case "rectangulo":
             result = superficie.rectangulo(Number(param1), Number(param2));
            break;
        case "triangulo":
             result = superficie.triangulo(Number(param1), Number(param2));
            break;
        default:
            result = "Figura no válida";
            break;
    }
    res.send({
        operacion: "superficie",
        figura: figura,
        parametros: [param1, param2,],
        resultado: result});
    })
app.listen(app.get("PORT"), () => {
  console.log(`Server running on port ${app.get("PORT")}`);
});
