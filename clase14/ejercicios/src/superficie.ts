export class Superficie {
    cuadrado(lado: number): number {
        return lado * lado;
    }
    rectangulo(base: number, altura: number): number {
        return base * altura;
    }  
    triangulo(base: number, altura: number): number {
        return (base * altura) / 2;
    }
}

