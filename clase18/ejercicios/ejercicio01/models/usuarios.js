import mongoose from 'mongoose';


const usersCollectionName = "users";
// schema = esquema o modelo
const userSchema = new mongoose.Schema({
  name: {type: "String", require: true},
  email: {type: "String", require: true, max:30},
});

const users = mongoose.model(usersCollectionName, userSchema)
export {users};
