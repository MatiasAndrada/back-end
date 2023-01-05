/*
Proceso principal del servidor 

PASAJE DE PARAMETROS AL SERVER


!ARGUMENTOS DE LA LÍNEA DE COMANDOS EN NODE
*Los argumentos de la línea de comandos son cadenas de texto que se utilizan para pasar información adicional a un programa, cuando se ejecuta una aplicación a través del interfaz de línea de comandos (CLI) de un sistema operativo. 
*Suelen incluir información que se utiliza para establecer la configuración o los valores de propiedad de una aplicación.
*En la mayoría de los casos, los argumentos se pasan después del nombre del programa en su indicador. Un ejemplo de la sintaxis de los argumentos de la línea de comandos se ve así:
?   $ [runtime] [script_name] [argument-1 argument-2 argument-3]
*El tiempo de ejecución (runtime), en nuestro caso es Node.

?VENTAJAS
*Puede pasar información a una aplicación antes de que comience. Esto es útil si deseamos realizar ajustes de configuración de gran número.
*Los argumentos de la línea de comandos se pasan como cadenas al programa. Los tipos de datos de cadena se pueden convertir fácilmente a otros tipos de datos dentro de una aplicación, lo que hace que los argumentos sean muy flexibles.
*Puede pasar un número ilimitado de argumentos a través de la línea de comando.
*Los argumentos de la línea de comandos se utilizan junto con scripts y archivos por lotes, lo que es útil para las pruebas automatizadas.
?DESVENTAJAS
*Las aplicaciones de línea de comandos pueden ser difíciles de usar, si no se tiene experiencia en CLI

?Uso de process.argv
*La forma más sencilla de recuperar argumentos en Node es a través del process.argv. Este es un objeto global que podemos usar sin importar bibliotecas adicionales.
*Simplemente necesitamos pasar argumentos a una aplicación Node, tal como mostramos anteriormente, y se puede acceder a estos argumentos dentro de la aplicación a través del process.argv.
?Ejemplo
*En el siguiente ejemplo, pasamos dos argumentos a la aplicación Node. El primer argumento es el nombre del archivo de script, y el segundo argumento es el argumento que pasamos a la aplicación.
   $ node app.js "Hello World"
*El resultado de la ejecución de este script es el siguiente:
   [ 'C:\\Program Files\\nodejs\\node.exe', 'C:\\Users\\Your Name\\Desktop\\app.js', 'Hello World' ]

?Accediendo a los argumentos
*Para acceder a los argumentos, podemos usar el índice del array. El primer argumento se encuentra en el índice 2, el segundo argumento en el índice 3, y así sucesivamente.
*En el siguiente ejemplo, recuperamos el primer argumento y lo asignamos a una variable llamada argumento1. Luego recuperamos el segundo argumento y lo asignamos a una variable llamada argumento2.
   const argumento1 = process.argv[2];
   const argumento2 = process.argv[3];
   console.log(argumento1);
   console.log(argumento2);

!MINIMIST
*Minimist es una biblioteca de Node que nos permite recuperar argumentos de la línea de comandos de una manera más fácil y conveniente.
*Minimist analiza los argumentos de la línea de comandos y devuelve un objeto que contiene los argumentos como propiedades.
*Para instalar minimist, ejecutamos el siguiente comando en la terminal:
    $ npm install minimist
    Argumentos en la linea de comandos
    $ node app.js --name="John Doe" --greeting="Hello"
    *Una vez instalado, podemos importar la biblioteca en nuestro archivo de script y usarla para recuperar los argumentos de la línea de comandos.
    const minimist = require('minimist');
    const args = minimist(process.argv.slice(2));
    console.log(args);
    *El resultado de la ejecución de este script es el siguiente:
    { _: [], name: 'John Doe', greeting: 'Hello' }
    *Como puede ver, minimist devuelve un objeto que contiene los argumentos como propiedades.

?Accediendo a los argumentos
*Para acceder a los argumentos, podemos usar la notación de puntos. Por ejemplo, para acceder al argumento name, podemos usar args.name.

!YARGS
*Yargs es una biblioteca de Node que nos permite recuperar argumentos de la línea de comandos de una manera más fácil y conveniente.
*Yargs analiza los argumentos de la línea de comandos y devuelve un objeto que contiene los argumentos como propiedades.
*Para instalar yargs, ejecutamos el siguiente comando en la terminal:   
      $ npm install yargs
*Una vez instalado, podemos importar la biblioteca en nuestro archivo de script y usarla para recuperar los argumentos de la línea de comandos.
      const yargs = require('yargs/yargs')(process.argv.slice(2))
      console.log(yargs.argv)
?Agregar valores por defecto
*Si deseamos agregar valores por defecto a los argumentos, podemos usar la función default() de yargs.
      const yargs = require('yargs/yargs')(process.argv.slice(2))
      const argv = yargs.default('name', 'John Doe').argv
      console.log(argv)
?Agregar alias
*Si deseamos agregar alias a los argumentos, podemos usar la función alias() de yargs, se pude usar junto a default().
?Agregar descripción
*Si deseamos agregar descripción a los argumentos, podemos usar la función describe() de yargs, se pude usar junto a default() y alias().
?Agregar ayuda
*Si deseamos agregar ayuda a los argumentos, podemos usar la función help() de yargs, se pude usar junto a default(), alias() y describe().
?Agregar validación
*Si deseamos agregar validación a los argumentos, podemos usar la función demandOption() de yargs, se pude usar junto a default(), alias(), describe() y help().
?Agregar booleano
*Si deseamos agregar booleano a los argumentos, podemos usar la función boolean() de yargs, se pude usar junto a default(), alias(), describe(), help() y demandOption().
?Otras funcionalidades en sitio oficial
*https://www.npmjs.com/package/yargs
      
!VARIABLES DE ENTORNO 
*Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Una variable de entorno es simplemente un nombre asignado a un valor.
*Nos permiten administrar la configuración de nuestras aplicaciones por separado de nuestro código base
*Por convención, el nombre se escribe con mayúscula, por ejemplo: 
?PORT=8080.
*Al confiar en configuraciones externas, nuestra aplicación se puede implementar fácilmente en diferentes entornos. Estos cambios son independientes de los cambios en el código, por lo que no requieren que nuestra aplicación sea reconstruida.
*Los datos que cambian segun su entorno en el que se ejecuta deben configurarse como variables de entorno, ejemplos:
?Puertos y Direccion
?Credenciales de base de datos
?Credenciales de API
?Credenciales de autenticación
?Ubicacion de archivos y carpetas estaticos

?Usando variables de entorno
config.js
module.exports = {
NODE_ENV: process.env.NODE_ENV || ‘development’,
HOST: process.env.HOST || '127.0.0.1',
PORT: process.env.PORT || 3000
}
*Luego en el archivo server.js requerimos el archivo config.js, creamos un server con express usando las variables definidas.
server.js
const express = require('express');
const config = require('./config');
const app = express();
app.listen(config.PORT, () => {
console.log(`Server running on port ${config.PORT}`);
});
*El acceso a las variables de entorno en Node es compatible desde que inicia nuestra aplicación, cuando el proceso Node se inicia, proporciona automáticamente el acceso a todas las variables de entorno existentes mediante el objeto process.env. 


!DOTENV           
*Dotenv es una biblioteca de Node que nos permite cargar variables de entorno desde un archivo .env en nuestro entorno de desarrollo.
*Para instalar dotenv, ejecutamos el siguiente comando en la terminal:
$ npm install dotenv
*Una vez instalado, podemos importar la biblioteca en nuestro archivo de script y usarla para cargar las variables de entorno.
const dotenv = require('dotenv');
dotenv.config();
*El archivo .env debe estar en la raíz del proyecto y debe tener el siguiente formato:
?KEY=VALUE
*Por ejemplo, si queremos cargar una variable de entorno llamada PORT, podemos agregar la siguiente línea al archivo .env:
?PORT=8080
*Una vez que el archivo .env se ha cargado, podemos acceder a las variables de entorno usando process.env.
console.log(process.env.PORT);
*Si queremos cargar un archivo .env diferente, podemos usar la función config() de dotenv y pasarle el nombre del archivo como argumento.
dotenv.config({ path: ‘./config/.env’ });


*/