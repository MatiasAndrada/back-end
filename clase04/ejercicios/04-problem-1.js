//Operaciones asincronas fs (se maneja con un cb, promesa, async await)
//readFile: lectura de archivos
//writeFile: escritura de archivos
//appendFile: actualizar contenido a un archivo
//unlink: eliminar archivos
//mkdir: crear directorios
//rename: renombrar archivos

const fs = require("fs");
const fecha = data();

//cb
fs.readFile("./fyh.txt", "utf8", (err, fileData) => {
  if (err) {
    console.log("Hubo un error", err);
  } else {
    console.log(fileData);
  }
});
//promise
//se pone fs.promises
//example retorna una promesa
const example = fs.promises
  .readFile("./fyh.txt", "utf8")
  .then((fileData) => {
    console.log(fileData);
  })
  .catch((err) => {
    console.log(err);
  });
//async await
//se pone fs.promises
//es el mejor paara ejecutar varias operaciones y para el testeo ya que tenemos una unica funcion que se ejecuta
async function readFile() {
try{
    await fs.promises.writeFile("./fyh.txt", "Hello World");
    const fileData = await fs.promises.readFile("./fyh.txt", "utf8");
    console.log(fileData);
    return fileData;
}catch(err){
    console.log(err);
}}

async function manipularArchivos(){
    const contenido = await readFile();
    console.log(contenido);
}
