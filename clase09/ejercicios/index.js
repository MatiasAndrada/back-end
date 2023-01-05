const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
app.set("PORT", 8080);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");


const userList = [
  {
  nombre:"Juan",
  apellido:"Perez"
},
  {
  nombre:"Pedro",
  apellido:"Gutierrez"
},   
{
  nombre:"Maria",
  apellido:"Gomez",
}]
app.get("/", (req, res) => {
    res.render("list", {
        userList: userList,
        listExist: true,
    });
})

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
