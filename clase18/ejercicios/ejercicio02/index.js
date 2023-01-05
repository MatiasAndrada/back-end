import mongoose from "mongoose";
import { students } from "./models/students.js";

CRUD();
// La puedo llamar antes de declararla por que cuadno se ejecute la funcion se pone al inicio del codigo

async function CRUD() {
  /*Conexion hacia la base de datos  */
  try {
    const URL = "mongodb://127.0.0.1:27017/mongooseExample";
    let connection = await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
    /*const studentsArray = [
            { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
            { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27631878', curso: '1A', nota: 8 },
            { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
            { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
            { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
            { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
            { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
            { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
            { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
            { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        ]
        await studentsArray.forEach((item => {
            const schemaStudent = new students(item)
            schemaStudent.save()
        }))
        */
    const studentsList = await students.find({});
    console.log(studentsList);
    console.log(studentsList.length);

    //update one
    /*
        const studentUpdated  = await students.updateOne({nombre: "Ana"}, {$set: {nota: 9} })
        console.log(studentUpdated)
        */
    //delete many
    /*
    const studentDeleted = await students.deleteMany({ nota: { $lt: 10 } });
    console.log(studentDeleted);
    */
    //delete one
    /*
    const studentDeleted = await students.deleteOne({ nota: 9 });
    console.log(studentDeleted);
    */
   
  } catch (err) {
    console.log(err);
  }
}
