import * as operaciones from "./lib/operaciones";

const lista: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
lista.map((x: number) => x * x)
console.log(lista);


const mensaje:string = "hola typescript";
console.log(mensaje);

let num :number = 10, num2:number = 4

console.log("La suma de " + num + " + " + num2 + " es " + operaciones.sumar(num, num2));
console.log("La resta de " + num + " - " + num2 + " es " + operaciones.restar(num, num2));
console.log("La multiplicacion de " + num + " * " + num2 + " es " + operaciones.multiplicar(num, num2));
console.log("La division de " + num + " / " + num2 + " es " + operaciones.dividir(num, num2));