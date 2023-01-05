import mongoose from "mongoose";
import { users } from "./models/users.js";

CRUD();
// La puedo llamar antes de declararla por que cuadno se ejecute la funcion se pone al inicio del codigo

async function CRUD() {
  /*Conexion hacia la base de datos  */
  try {
    const URL =
      "mongodb+srv://Pichulitoo7:Pichu2909@cluster0.rfxozjp.mongodb.net/ecommerce?retryWrites=true&w=majority";
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }), err => {
      if (err) {
        console.log(err);
      }
    }
    console.log("Database Connected");
    /*
    const usersArray = [
            { nombre: 'Pedro', apellido: 'Mei', dni: '31155898'},
            { nombre: 'Ana', apellido: 'Gonzalez', dni: '27631878'},
            { nombre: 'José', apellido: 'Picos', dni: '34554398'},
            { nombre: 'Lucas', apellido: 'Blanco', dni: '30355874',},
            { nombre: 'María', apellido: 'García', dni: '29575148'},
            { nombre: 'Federico', apellido: 'Perez', dni: '320118321'},
            { nombre: 'Tomas', apellido: 'Sierra', dni: '38654790'},
            { nombre: 'Carlos', apellido: 'Fernández', dni: '26935670'},
            { nombre: 'Fabio', apellido: 'Pieres', dni: '4315388'},
            { nombre: 'Daniel', apellido: 'Gallo', dni: '37923460'}
        ]
        await usersArray.forEach((item => {
            const schemauser = new users(item)
            schemauser.save()
        }))
        */
    const usersList = await users.find({});
    console.log(usersList);
    console.log(usersList.length);

    //update one
    /*
        const userUpdated  = await users.updateOne({nombre: "Fabio"}, {$set: {apellido: "Oso"} })
        console.log(userUpdated)
        */
    //delete many
    
    /*const userDeleted = await users.deleteMany({ apellido: "Picos"});
    console.log("delete", userDeleted);
    */
  } catch (err) {
    console.log(err);
  }
}
