/*
Estrategias de autenticacion con redes sociales
Flujo de funcionamiento
    - El usuario se loguea con su cuenta de google
    - Google le devuelve un token al usuario
    - El usuario envia el token a la aplicacion
    - La aplicacion envia el token a google
    - Google verifica el token
    - Google devuelve la informacion del usuario si el token es correcto
    

JWT(JSON WEB TOKEN) 
    - Es un estandar abierto para el intercambio de informacion entre partes
    - Es un estandar de autenticacion
    - Es un estandar de autorizacion.
    - Es un estandar de informacion

    *Flujo JWT
        - El cliente envia credenciales al servidor
        - El servidor verifica, genera un JWT y lo envia como respuesta
        - Las solicitudes posteriores del cliente tienen el JWT en el header de la solicitud
        - El servidor verifica el JWT y responde con la informacion solicitada


    *Estructura de un JWT
        - Header
        - Payload
        - Signature
        
        Header
            - Algoritmo de firma
            - Tipo de token
        Payload 
            - Informacion del usuario
            - Informacion de la aplicacion
            - Informacion de la sesion
        Signature
            - Codigo de verificacion

    *Utilizar modulo
        - npm install jsonwebtoken
        const jwt = require("jsonwebtoken")
        cosnt PRIVATE_KEY = "myprivatekey"
        *La constante PRIVATE_KEY pude tener cualquier string se usa para encriptar y desencriptar


    *Funciones
    !generateToken
    La funcion generateToken recibe como parametro un user y devuelve el token, es decir inicia sesion
        function generateToken(user){
            const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '24h'});
            return token;
        }
    Se utiliza el metodo jwt.sign, el terce parametro es el tiempo hasta q se expire el token 
    !verifyToken
    La funcion verifyToken recibe como parametro un token y devuelve el usuario, es decir verifica si el token es correcto
        function verifyToken(token){
            const user = jwt.verify(token, PRIVATE_KEY);
            return user;
        }
    Se utiliza el metodo jwt.verify, el segundo parametro es la llave privada que se utilizo para generar el token
    
    
    !RUTA REGISTER  
    ?generateToken
    *Primero se chequea que no exista el usuario.
    *Si no existe, se crea un usuario nuevo, y se guarda en la BD.
    *Luego, si está todo bien, se genera un token, que llama a la función generateToken y le pasa el usuario creado como parámetro.
app.post('/register', (req, res) => {
const { nombre, password, direccion } = req.body

const yaExiste = usuarios.find(usuario => usuario.nombre == nombre)
    if (yaExiste) {
     return res.json({ error: 'ya existe ese usuario' });
    }

const usuario = { nombre, password, direccion }

    usuarios.push(usuario)

const access_token = generateToken(usuario)

 res.json({ access_token })
})

    !RUTA LOGIN
     ?generateToken
    *Busca el usuario en la BD. Si lo encuentra, chequea la contraseña.
    *Si coinciden las contraseñas, se genera el token, que llama a la función generateToken y le pasa el usuario encontrado como parámetro para iniciar sesión.
 app.post('/login', (req, res) => {

 const { nombre, password } = req.body

 const usuario = usuarios.find(u => u.nombre == nombre && u.password == password)
 if (!usuario) {
   return res.json({ error: 'credenciales invalidas' });
 }

 const access_token = generateToken(usuario)

 res.json({ access_token })
})

    !Middleware de verificacion
    *Verifica que exista un token, y si existe, trae los datos de ese usuario.
    *Lo usamos para autorizar ciertas rutas a ciertos usuarios.
    *Extrae el token desde el encabezado de la petición (generalmente del campo authorization, y generalmente precedido por la palabra ‘Bearer’ y un espacio).
    *Si existe, entonces utiliza jwt.verify para poder obtener los datos del usuario, que luego los guarda en req.user.
function auth(req, res, next) {
 const authHeader = req.headers.authorization;

 if (!authHeader) {
   return res.status(401).json({
     error: 'not authenticated'
   });
 }

 const token = authHeader.split(' ')[1];

 jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
   if (err) {
     return res.status(403).json({
       error: 'not authorized'
     });
   }

   req.user = decoded.data;
   next();
 });
};


    
*/
