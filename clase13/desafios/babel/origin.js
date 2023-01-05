// Language: javascript
const obj = {name:"coder", age: 2, country: "Argentina"}
const name = obj?.name

class Color{
    get(){
        const colorRandom = Math.floor(Math.random() * 16777215).toString(16);
        return `#${colorRandom}`;
    }
}

const color = new color()
console.log(color.get())