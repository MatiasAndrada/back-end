const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

const usuarios = [];

//!PASSPORT
passport.use(
  "signUp",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const { email } = req.body;
      const userExist = usuarios.find(
        (usuario) => usuario.username == username
      );
      if (userExist) {
        return done("Usuario ya registrado");
      }
      const user = {
        username,
        password,
        email,
      };
      usuarios.push(user);
      return done(null, user);
    }
  )
);
passport.use(
  "signIn",
  new LocalStrategy((username, password, done) => {
    const user = usuarios.find((usuario) => usuario.username == username);
    if (!user) {
      return done(null, false);
    }
    if (user.password != password) {
      return done(null, false);
    }
    user.contador = 0;
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});
passport.deserializeUser((username, done) => {
  const user = usuarios.find((usuario) => usuario.username == username);
  done(null, user);
});

//!INITIALIZE
const app = express();

app.use(
  session({
    secret: "shhhh",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//!HANDLEBARS
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//!AUTH
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/signIn");
  }
}

//!ROUTES
//signUp
app.get("/signUp", (req, res) => {
  res.sendFile(__dirname + "/views/signUp.html");
});
app.post(
  "/signUp",
  passport.authenticate("signUp", {
    failureRedirect: "/failSignUp",
    successRedirect: "/",
  })
);
app.get("/failSignUp", (req, res) => {
  res.render("signUp-error");
});

//signIn
app.get("/signIn", (req, res) => {
  res.sendFile(__dirname + "/views/signIn.html");
});
app.post(
  "/signIn",
  passport.authenticate("signIn", {
    successRedirect: "/datos",
    failureRedirect: "/failSignIn",
  })
);
app.get("/failSignIn", (req, res) => {
  res.render("signIn-error");
});

//datos
app.get("/datos", isAuth, (req, res) => {
  if (!req.user.contador) {
    req.user.contador = 0;
  }
  req.user.contador++;
  res.render("datos", {
    datos: usuarios.find((usuario) => usuario.username == req.user.username),
    contador: req.user.contador,
  });
});

//logOut
app.get("/logout", (req, res) => {
    req.logout(err =>{
        if(err) return res.send(err
        )   
    })
    res.redirect("/");
});
//home
app.get("/", isAuth, (req, res) => {
  res.redirect("/datos");
});

//!SERVER
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
