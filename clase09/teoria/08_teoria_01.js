//motores de plantilas
//Por un lado se puede crear una plantilla y por otro se desarrolla el back-end.
//data + template => Template Engine = Result Page
//handlebars

//Para poder usar handlebars se debe instalar el paquete express-handlebars
const handlebars = require("express-handlebars");

//formas de usar handlebars
//1.
app.engine(
  "hbs",
  handlebars({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);
//2.
app.engine("hbs", handlebars());
app.set("view engine", "hbs");
app.set("views", "./views");
//handlebars hace un renderizado de una plantilla y le pasamos los datos que queramos, es un renderizado desde el servidor.
