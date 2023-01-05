"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var operaciones = __importStar(require("./lib/operaciones"));
var lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
lista.map(function (x) { return x * x; });
console.log(lista);
var mensaje = "hola typescript";
console.log(mensaje);
var num = 10, num2 = 4;
console.log("La suma de " + num + " + " + num2 + " es " + operaciones.sumar(num, num2));
console.log("La resta de " + num + " - " + num2 + " es " + operaciones.restar(num, num2));
console.log("La multiplicacion de " + num + " * " + num2 + " es " + operaciones.multiplicar(num, num2));
console.log("La division de " + num + " / " + num2 + " es " + operaciones.dividir(num, num2));
