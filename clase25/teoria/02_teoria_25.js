/*
Passport 
    - Es un middleware de autenticación para Node.js
    - Es una librería que nos permite autenticar usuarios
    - Es una librería que nos permite manejar sesiones
    - Es una librería que nos permite manejar cookies
    - Es una librería que nos permite manejar tokens
    - Es una librería que nos permite manejar OAuth
    - Es una librería que nos permite manejar Facebook, Twitter, Google, etc

    Strategies (cada una tiene un modulo diferente para instalar)
        - Local(usuarios mediante user y password)
        - passport-openid(estandar abierto para la autenticacion federada)
        - passport-oauth(mediante API de otros proveedores, como redes sociales)


!config inicial
    - npm passport
    - npm passport-local

    se requiere el modulo passport junto con el passport-local

    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    *inicializar passport 
    app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: config.TIEMPO_EXPIRACION
    },
 rolling: true,
 resave: true,
 saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

*Debemos definir las rutas 
Definimos las rutas de index, login, singup, logout y fail route

    *Se define una nueva instancia de LocalStrategy y se la carga mediante el método passport.use( ).
    *LocalStrategy espera encontrar por defecto las credenciales de usuario en los parámetros nombre de usuario ‘username’ y contraseña ‘password’ (si se definen con otros nombres, no los encontrará!)

!Middleware de rutas protegidas
function checkAuthentication(req,res,next){
if (req.isAuthenticated()){
//req.isAuthenticated() will return true if user is logged in
next();
}
else{
res.redirect("/login");
}
}

    !localStrategy login 

    passport.use('login', new LocalStrategy(
 (username, password, done) => {
   User.findOne({ username }, (err, user) => {
     if (err)
       return done(err);

     if (!user) {
       console.log('User Not Found with username ' + username);
       return done(null, false);
     }

     if (!isValidPassword(user, password)) {
       console.log('Invalid Password');
       return done(null, false);
     }

     return done(null, user);
   });
 })
);


    *Buscamos el usuario por su username en la base de datos mediante User.findOne( ).
    *Si el usuario se encuentra en la base de datos y es válido se devuelve en el done : null (indicando que no hubo error) y el usuario encontrado user.
     
    *La función isValidPassword es:
     isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
    }
!localStrategy signUp
passport.use('signup', new LocalStrategy({
 passReqToCallback: true
},
 (req, username, password, done) => {
   User.findOne({ 'username': username }, function (err, user) {

     if (err) {
       console.log('Error in SignUp: ' + err);
       return done(err);
     }

     if (user) {
       console.log('User already exists');
       return done(null, false)
     }

     const newUser = {
       username: username,
       password: createHash(password),
       email: req.body.email,
       firstName: req.body.firstName,
       lastName: req.body.lastName,
     }

    
     User.create(newUser, (err, userWithId) => {
       if (err) {
         console.log('Error in Saving user: ' + err);
         return done(err);
       }
       console.log(user)
       console.log('User Registration succesful');
       return done(null, userWithId);
     });
   });
 })
)

function createHash(password) {
  return bCrypt.hashSync(
            password,
            bCrypt.genSaltSync(10),
            null);
}


      
!serializar y deserializar
    *Se define una función para serializar el usuario en la sesión.
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

Para restaurar el estado de autenticación a través de solicitudes HTTP, Passport necesita serializar usuarios y deserializarlos fuera de la sesión.
Esto se hace de modo que cada solicitud subsiguiente no contenga las credenciales del usuario anterior.
Se suele implementar proporcionando el ID de usuario al serializar y consultando el registro de usuario por ID de la base de datos al deserializar.
Los métodos que proporciona Passport para esto son serializeUser y deserializeUser.

*Se puede ver que el método serializeUser utiliza el id del usuario y el deserializeUser utiliza el objeto de usuario, como lo mencionamos antes.


*/
