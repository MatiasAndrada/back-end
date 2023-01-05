/*

!Session 
es un paquete de Node, el cual permite que una variable sea accesible desde cualquier lugar del sitio. Se almacena del lado del servidor.
*La información que se quiera guardar en session se almacena del lado del servidor.
*Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
*Los datos almacenados en session se borran al cerrar la ventana del navegador.
*Se utiliza principalmente para guardar los datos de usuario al iniciar sesión.
Además, se puede crear la variable admin, también en session, con el valor de true, lo que indica que el usuario logueado es un administrador

Se debe instalar el módulo de express-session para empezar a utilizar session:
Tiene que ser requerido e incluido en la aplicación en la que se lo va a utilizar.
Es un middleware que se requiere a nivel de aplicación.

save:
Tener en cuenta que tanto para inicializar una nueva variable en session como para leer los datos de la misma se utiliza el parámetro de request.
En el else se crea la variable en session llamada “contador” la cual tiene inicialmente un valor de 1.
En el if, si ya existe esta variable en session, se aumenta su valor en 1.

delete:
Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Como parámetro se pasa un callback.



midleware de autenticacion con session
function auth(req, res, next) {

if (req.session?.user === 'pepe' && req.session?.admin) {
return next ()
}
*/