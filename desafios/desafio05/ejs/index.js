const express = require("express");
const morgan = require("morgan");



const app = express();

app.set("PORT", 8500);

app.use(express.static("public"))
app.set("view engine", "ejs");
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
