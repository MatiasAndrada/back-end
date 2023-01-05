const express = require("express");
const morgan = require("morgan");
/* const pug = require("pug"); */



const app = express();

app.set("PORT", 8080);

app.set("view engine", "pug");
app.use(express.static("public"))
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/", require("./routes/api.js"));


app
  .listen(app.get("PORT"), () => {
    console.log(`Server running on port ${app.get("PORT")}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
