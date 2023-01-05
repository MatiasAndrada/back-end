import mongoose from 'mongoose';
import {users} from './models/usuarios.js';


CRUD()
// La puedo llamar antes de declararla por que cuadno se ejecute la funcion se pone al inicio del codigo


async function CRUD(){
    /*Conexion hacia la base de datos  */
    try{
        const URL = "mongodb://127.0.0.1:27017/mongooseExample"
        let connection = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database Connected")
        const user = {nombre: "Carlos Peterson", email: "carlos24@gmail.com"}
        const schemaUser = await new users(user)
        const savedUser = await schemaUser.save()
        //console.log(savedUser)
        const userList = await users.find({})
        console.log(userList)
        console.log(userList.length)
    } catch (err){
        console.log(err)
    }
}
  
