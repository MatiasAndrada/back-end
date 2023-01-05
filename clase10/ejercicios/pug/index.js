const express = require("express");

const app = express();

app.set("PORT", 8080);
app.set("views", "./views");
app.set("view engine", "pug");

/* app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 */
app.get("/", (req, res) => {
  res.render('prueba.pug', {
    mensaje: "Hola mundo",
  });
});


app.get("/datos", (req, res) => {
  //para pasarle datos a la vista por url se usa el metodo query
  //http://localhost:8080/datos?min=20&max=100&value=50
    const {min, max, value} = req.query;
  res.render('meter.pug', {
    min: min,
    max: max,
    value: value,
  });
});

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
