const express = require('express')
const { engine: exphbs } = require('express-handlebars')
const session = require('express-session')

/******************  DATABASE  ******************/

const usuarios = []

/******************  SERVER  ******************/

const app = express()

/******************  MIDDLEWARES  ******************/

app.use(
  session({
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
)

app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main.hbs' }))
app.set('view engine', '.hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (req.session.nombre) {
      return true
    } else {
      return false
    }
  }
  req.logout = done => {
    req.session.destroy(done)
  }
  next()
})

/******************  ROUTES  ******************/

// REGISTER
app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const { nombre, password, direccion } = req.body

  const usuario = usuarios.find(usuario => usuario.nombre == nombre)
  if (usuario) {
    return res.render('register-error')
  }

  usuarios.push({ nombre, password, direccion })
  res.redirect('/login')
})

// LOGIN
app.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/datos')
  }
  res.render('login')
})

app.post('/login', (req, res) => {
  const { nombre, password } = req.body

  const usuario = usuarios.find(
    usuario => usuario.nombre == nombre && usuario.password == password
  )
  if (!usuario) {
    return res.render('login-error')
  }

  req.session.nombre = nombre
  req.session.contador = 0
  res.redirect('/datos')
})

function requireAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

function includeUserData(req, res, next) {
  if (req.session.nombre) {
    req.user = usuarios.find(usuario => usuario.nombre == req.session.nombre)
  }
  next()
}

// DATOS
app.get('/datos', requireAuthentication, includeUserData, (req, res) => {
  req.session.contador++
  res.render('datos', {
    datos: req.user,
    contador: req.session.contador,
  })
})

// LOGOUT
app.get('/logout', (req, res) => {
  req.logout(err => {
    res.redirect('/login')
  })
})

// INICIO
app.get('/', requireAuthentication, (req, res) => {
  res.redirect('/datos')
})

/******************  LISTEN  ******************/

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en servidor: ${error}`))