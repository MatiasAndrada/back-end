const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("PORT", 8080);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", require("./routes/api.js"));

app
  .listen(app.get("PORT"), () => {
    console.log(`Server running on port ${app.get("PORT")}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
