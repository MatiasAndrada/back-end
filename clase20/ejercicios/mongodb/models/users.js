import mongoose from 'mongoose';


const usersCollectionName = "usuarios";
// schema = esquema o modelo
const usersSchema = new mongoose.Schema({
  nombre: {type: "String", require: true},
  apellido: {type: "String", require: true},
  dni: { type: "String", require: true, unique: true},
});

const users = mongoose.model(usersCollectionName, usersSchema)
export {users};
