const express = require("express");

const app = express();

app.set("PORT", 8080);

app.set("view engine", "ejs");

const fakeAPI = [
  {
    name: "Juan",
    age: "20",
  },
  {
    name: "Pedro",
    age: "18",
  },
  {
    name: "Maria",
    age: "34",
  },
];
app.get("/", (req, res) => {
  res.render("", {
    list: fakeAPI,
    listExists: true,
  });
});

app.listen(app.get("PORT"), () => {
  console.log(`Server on port ${app.get("PORT")}`);
});
