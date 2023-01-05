/*

Las Cookies son archivos que podemos guardar del lado del cliente, en el navegador del usuario.

A las cookies se les puede configurar un tiempo de vida. Una vez finalizado el mismo, la cookie se elimina del navegador.
Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.
Hay que recordar que no se deben almacenar datos sensibles en las cookies.


Primero hay que instalar el paquete de cookie parser para poder utilizarlas:
cookie-parser
Hay que requerirlo e incluirlo en la aplicación en la que se lo va a utilizar.
Es un middleware que se requiere a nivel de aplicación.

CREAR COOKIE
En la ruta /set se crea una cookie de nombre “server” y valor “express”. La misma no tiene un tiempo de vida límite.
En la ruta /setEX se crea una cookie de nombre “server2” y valor “express”. En esta, se le seteó un tiempo de vida máximo de 30 segundos.
LEER COOKIE
Este es el código para leer las cookies del ejemplo anterior.
Se utiliza el parámetro de request, y el nombre asignado a la cookie que se quiere leer.
req.cookie.name
ELIMINAR COOKIE
Para eliminar una cookie, se utiliza el parámetro response y el método clearCookie((). El parámetro que se le pasa al método es el nombre de la cookie que se desea borrar.



*Signed cookies
Es una cookie con mecanismo de validacion que consiste en adjuntar a cada cookie una version encriptada a su contenido,
se realiza mediante clave definido en el server y desconocido por los clientes

El server es capaz de verificar si la cookie que recibe desde el cliente ha sido adulterada o no.
cookieParser("secret")
*Secret: string o array de strings que se utiliza para firmar las cookies enviadas, y para analizar las recibidas.
*Es opcional y, si no se especifica, no firmará ni analizará las cookies recibidas. 
*Si es un string, se utiliza como secret. Si es un array de strings, se firmará la cookie con cada string en el orden provisto (y lo mismo al analizar).
*Si el cliente devuelve una cookie cambiada retorna false
*Crear una cookie firmada
Se pasa como argumento tipo objeto en el tercer argumento con propiedad {signed: true}
Las cookies firmadas recibidas, que hayan pasado la verificación de su firma, ya no se encontrarán en req.cookies, sino que aparecerán en req.signedCookies. 
Aquellas que no hayan pasado la verificación, no aparecerán, como si no existieran.
























*/
