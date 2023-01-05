/*Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello:Definir una ruta “cookies”.Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.Definir un método GET que devuelva todas las cookies presentes.Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.*/

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser("signed"));

//save
app.get("/set", (req, res) => {
  res.cookie("regular", "cookie").send("Set Cookie");
});
app.get('/setSigned', (req, res) => {
    res.cookie('signedCookie', "banana", { signed: true }).send('Set Cookie')
  });
//con expiracion
app.get("/setEx", (req, res) => {
  res
    .cookie("cookieCon", "expiracion", { maxAge: 30000 })
    .send("Set Cookie con expiracion");
});
//read
app.get("/getCookies", (req, res) => {
  res.send(req.cookies);
});

app.get("/getWithSignedCookies", (req, res) => {
  res.send({ cookies: req.cookies, signedcookies: req.signedCookies });
});
//delete
app.get("/clear", (req, res) => {
  res.clearCookie("regular").send("Cookie borrada");
});

app.listen(3000, () => console.log("Server running on port 300"));
