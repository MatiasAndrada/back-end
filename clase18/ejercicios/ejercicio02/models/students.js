import mongoose from 'mongoose';


const studentsCollectionName = "students";
// schema = esquema o modelo
const studentsSchema = new mongoose.Schema({
  nombre: {type: "String", require: true},
  apellido: {type: "String", require: true},
  edad: { type: "Number", require: true},
  dni: { type: "String", require: true, unique: true},
  curso: { type: "String", require: true},
  nota: { type: "Number", require: true},

});

const students = mongoose.model(studentsCollectionName, studentsSchema)
export {students};
