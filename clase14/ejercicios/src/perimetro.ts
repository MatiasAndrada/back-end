export class Perimetro {
    cuadrado(lado: number ): number{
        return lado * 4;
    }
    rectangulo(base: number, altura: number): number {
        return (base * 2) + (altura * 2);
    }
    triangulo(lado1: number, lado2: number, lado3: number): number {
        return lado1 + lado2 + lado3;
    }

}