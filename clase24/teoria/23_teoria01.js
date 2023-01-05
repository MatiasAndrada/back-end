/* 

!MemoryStore
Cuando nos manejamos con session-memory, de forma predeterminada estaremos utilizando el almacenamiento en memoria: el memoryStore.
Al reiniciar el servidor, estos datos se borran, de modo que no tienen persistencia. Por eso, memoryStore solo está disponible en desarrollo (nunca en producción).

>> Para superar esta limitación utilizaremos Session FileStore.


!FileStore session-file-store
Se utiliza igual que memoryStore, con la diferencia de que se crea una carpeta de archivos en donde se almacenan los datos de session.
Estos tendrán persistencia, ya que quedarán guardados en el servidor.
Se incluye session como middleware a nivel aplicación.

Pero se agrega la clave store en el objeto, de la forma que se muestra en la imagen. El path especificado es la ubicación y nombre de la carpeta que se crea.
Una vez que se ejecuta el código y se guardan datos en req.session, se crea la carpeta con un archivo .json.
El nombre de este archivo corresponderá a las cookies de session, como se muestra en las siguientes imágenes:
En npm se puede ver todas las option q se le puede agregar

{"cookie": {
    originalMaxAge null,
    "expires": null,
    "httpOnly": true,
    "path": "/"
},
"contador": 5,
"_lastAccess: 3524545
"}


!Redis
Es un servidor de diccionarios remoto (Remote Dictionary Server). 
Almacén de datos clave-valor en memoria de código abierto que se puede utilizar como base de datos, caché y agente de mensajes.

caracteristicas:
Los datos de Redis se almacenan en memoria del servidor, por lo que el acceso a los mismos es muy rápido.
Tiene mucha flexibilidad en cuanto a las estructuras de datos que admite (strings, listas, hashes, sets, entre otros). De esta forma, el código queda mucho más simple y con menos líneas.
Por persistencia, Redis admite copias de seguridad puntuales (guarda el conjunto de datos en el disco).
Crea soluciones con un alto nivel de disponibilidad, lo que ofrece fiabilidad y rendimiento estables.

Las Redis Keys son binarias y seguras. Esto significa que puede usar cualquier secuencia binaria como clave, ya sea un string o un archivo de imagen.
El tipo más usado y recomendado por su mayor simpleza es un string como Redis Keys.
Con el uso de los comandos SET y GET configuramos y recuperamos un valor de un string.

SET
Es el comando con el que se pueden setear nuevos key value.
Se le puede especificar un tiempo de expiración en segundos o milisegundos.
Da como respuesta “OK” si el comando SET se ejecutó correctamente y, si hubo algún problema, devuelve “Null”.
GET
Es el comando con el que se puede leer el valor de la key.
Devuelve un error si el valor de la key es distinto de un string.
Si se ejecuta correctamente devuelve el valor de la key. Si esta no existe, devuelve la palabra reservada nil.
TLL KEY
Es el comando con el que se puede leer el valor de la key.
Devuelve un error si el valor de la key es distinto de un string.
Si se ejecuta correctamente devuelve el valor de la key. Si esta no existe, devuelve la palabra reservada nil.

!RedisLab
Es lo mismo solo que los datos estan almacenados en la nube, parecido a mongoATLAS

!Session mongo
Mediante el paquete de Node llamado connect-mongo se puede utilizar la base de datos de MongoDB para persistir los datos almacenados en Session.
Se agrega en el app.use de session una clave en el objeto, especificando la url de Mongo local donde se van a guardar los datos almacenados en session.
El código queda como se muestra en la imagen.

!Session mongoAtlas
Es lo mismo que session con Mongo pero la diferencia es que Atlas es la base de datos en la nube, por lo que allí se van a almacenar los datos de session. 
Se necesitan los mismos módulos que para mongo session y se requieren como se muestra a continuación:
Para utilizarlo, debemos conectar con la URL de la base de datos en Atlas, es decir, en la nube.
La constante de advancedOptions definida anteriormente se utiliza para las opciones avanzadas de la conexión con la BD.



*/