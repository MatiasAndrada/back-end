/*
!Logs, profiling & debug - Parte I



!RENDIMIENTO EN PRODUCCIÓN

?COSAS QUE HACER EL EL CODIGO

*1)UTILIZAR LA COMPRESION DE GZIP
Su uso puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilizamos gzip, un middleware de compresión de Node para la compresión en aplicaciones Express.
Atención: No resulta la mejor opción para una aplicación con tráfico elevado en producción.

*2)NO UTILIZAR FUNCIONES SINCRONAS
Las funciones síncronas bloquean el hilo de ejecución principal de Node.js, lo que significa que no se pueden ejecutar otras funciones mientras se ejecuta una función síncrona. Por lo tanto, las funciones síncronas no deben utilizarse en aplicaciones Node.js de alto rendimiento.
Evitar su uso en produccion. Para esto utilizar funciones asincronas.
La unica vez que esta justificado utilizar funcion sincrona es en el arranque inicial

*3)REALIZAR UN REGISTRO CORRECTO
El uso de console.log() o console.err() para imprimir mensajes de registro en la terminal es una practica comun en desarrollo, estas son sincronas por lo que no resultan adecuadas para produccion, a menos que se canalize a otro porgrama
Hay dos motivos de realizar un registro desde la aplicacion:
    -A efectos de depuracion: en lugar de ocnsole.log(), utilice un modulo de depuracion especial como debug.
    -Para registrar eventos de la aplicacion: utilice un modulo de registro como winston o bunyan.

*4)MANEJAR LAS EXEPCIONES CORRECTAMENTE
Las excepciones no capturadas en Node.js pueden provocar que la aplicación se cierre inesperadamente. Por lo tanto, es importante capturar las excepciones y manejarlas correctamente.
Para capturar las excepciones, utilice el bloque try-catch. Si no se captura una excepción, la aplicación se cerrará inesperadamente.
Si seguimos el consejo de asegurarnos de que la aplicacion se reinicia automaticamente mas abajo, este se recuperara de un bloqueo.
Las aplicaciones de express necesitan un breve tiempo de arranque, Igualmente, deseamos evitar el bloquo en primer lugar, para ello debemos manejar las exepciones 


?COSAS QUE HACER EN EL ENTORNO/CONFIGURACIÓN

*1)Establecer NODE_ENV en producción
La variable de entorno NODE_ENV especifica el entorno en el que se ejecuta una aplicación (normalmente, desarrollo o producción). Una de las cosas más sencillas que puede hacer para mejorar el rendimiento es establecer NODE_ENV en producción. Puede mejorarlos hasta 3 veces.
Al establecerlo, Express almacenar en caché las plantillas de vistas y los archivos CSS generador y genera menos mensajes de error detallados.
Si necesitamos escribir código específico del entorno, podemos comprobar el valor de NODE_ENV con process.env.NODE_ENV. 
Tener en cuenta que comprobar el valor de una variable de entorno supone una reducción de rendimiento, por lo que debe hacerse 
de forma moderada.

*2)QUE LA APLICACION SE INICIE AUTOMATICAMENTE
En producción, no deseamos que la aplicación esté fuera de línea en ningún momento. Esto significa que debe asegurarse de que se reinicia si la aplicación o el servidor se bloquean. 
Aunque esperamos que no se produzca ninguno de estos sucesos, si somos realistas, debemos tener en cuenta ambas eventualidades de la siguiente manera:
-- Utilizando un gestor de procesos para reiniciar la aplicación (y Node) cuando se bloquea.
-- Utilizando el sistema init que proporciona su OS para reiniciar el gestor de procesos cuando se bloquea el OS.

*3)EJECUTAR APP EN UN CLUSTER
En un sistema multinúcleo, podemos multiplicar el rendimiento de una aplicación Node iniciando un clúster de procesos. 
Como ya vimos, un clúster ejecuta varias instancias de la aplicación, idealmente una instancia en cada núcleo de CPU, lo que permite distribuir la carga y las tareas entre las instancias.
En las aplicaciones en clúster, los procesos worker pueden bloquearse individualmente sin afectar al resto de los procesos. 
Aparte de las ventajas de rendimiento, el aislamiento de errores es otro motivo para ejecutar un clúster de procesos de aplicación. Siempre que se bloquee un proceso worker, hay que asegurarse de registrar el suceso y generar un nuevo proceso utilizando cluster.fork().

*4)ALMACENAR EN CACHE LOS RESULTADOS DE LA SOLICITUD    
Si la aplicación realiza una consulta a una base de datos o a un servicio externo, es posible que desee almacenar en caché los resultados de la consulta para que no se vuelva a realizar la consulta en el futuro.
Para almacenar en caché los resultados de una consulta, puede utilizar un módulo de caché como memcached o redis.
Utilizar un servidor de almacenamiento en memoria cache como Nginx, mejora significativamente la velocidad y el rendimiento.

*5)UTILIZAR BALANCEADOR DE CARGA 
Una única instancia sólo puede manejar una cantidad limitada de carga y tráfico. Una forma de escalar una aplicación es ejecutar varias instancias de la misma y distribuir el tráfico utilizando un balanceador de carga.
Un balanceador de carga, es un proxy inverso que orquesta el tráfico hacia y desde los servidores y las instancias de aplicación. 
Entonces, con el balanceador de carga, configurado por ejemplo con Nginx, podemos mejorar el rendimiento y velocidad de la aplicación permitiendo escalarla más que con una sola instancia.

*6)UTILIZAR UN PROXY INVERSO
Se coloca delante de una aplicación web y realiza operaciones de soporte en las solicitudes, aparte de dirigir las solicitudes a la aplicación. 
Puede manejar las páginas de errores, la compresión, el almacenamiento en memoria caché, el servicio de archivos y el equilibrio de carga, entre otros.
La entrega de tareas que no necesitan saber el estado de la aplicación a un proxy inverso permite a Express realizar tareas de aplicación especializadas. Por este motivo, se recomienda ejecutar Express detrás de un proxy inverso como Nginx en producción.

!PROBANDO GZIP
const express = require('express')
const compression = require('compression')
const app = express()
app.use(compression())


!LOGGERS
Cuando llevamos un sist a produccion, uno de los problemas mas importantes a la 
hora de detectar cualquier anomalia son los logs.
Los logs son registros de eventos que ocurren en el sistema.
Los logs son muy importantes para detectar errores, problemas de rendimiento, y cualquier otro tipo de problema que pueda ocurrir en el sistema.
Cuando hay muchas peticiones concurrentes, los logs se mezclan haciendo imposible su seguimiento a salvo de q tengan un ID.

?Los LOGGERS son librerias para facilitar la impresion con ID, no necesitamos usar console.log() para el registro de sucesos en el server, lo cual es mas eficiente y permiten clasificar los mensajes por niveles de debug y enviarlos a distintos medios: file, database, email, consola, etc.

*LOG4JS
Es una de las mas utilizadas, Actualmente esta siendo remplazada por Winston y luego por Pino, q son mas modernas.
?UTILIZAR:
const log4js = require('log4js')
log4js.configure({
 appenders: {
   miLoggerConsole: { type: "console" },
   miLoggerFile: { type: 'file', filename: 'info.log' },
   miLoggerFile2: { type: 'file', filename: 'info2.log' }
 },
 categories: {
   default: { appenders: ["miLoggerConsole"], level: "trace" },
   consola: { appenders: ["miLoggerConsole"], level: "debug" },
   archivo: { appenders: ["miLoggerFile"], level: "warn" },
   archivo2: { appenders: ["miLoggerFile2"], level: "info" },
    todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" }
 }
})
miLoggerConsole usa el appender stdout escribe en la salida estándar (consola). Los otros 2, usan el archivo adjunto. miLoggerFile escribe en el archivo info.log y miLoggerFile2 en el archivo info2.log.
Definimos 5 categorías con distintos niveles:
Las categorías default y consola utilizan el apéndice del tipo consola.
Las categorías archivo y archivo2 utilizan los apéndices de tipo file.
La categoría todos utiliza apéndice de tipo consola y tipo file.

?niveles de salida
const logger = log4js.getLogger('cheese');
logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');

Definimos 6 niveles de salida: Trace, Debug, Info, Warn, Error, Fatal.
Por ejemplo, si el nivel configurado es Warn, se imprimirá solo Warn, Error y Fatal.
La ventaja de esto es que en un entorno de producción podemos solo preocuparnos por las excepciones y errores y no por la información de depuración.
Otra ventaja es que el código se puede mezclar con varios códigos de impresión de registros. Siempre que modifiquemos el nivel de salida en un archivo de configuración, la salida del registro cambiará sin modificar todo el código.

Es posible definirle a un appender directamente un nivel para que loguee usando ese criterio siempre, independientemente de la categoría que lo use. Esto nos permite, por ejemplo, definir una categoría que loguee en un archivo todo lo que sea nivel info, y loguee por consola todos los errores.
Luego al definir las categorías, defino una que utilice más de un appender. Es importante que al momento de utilizar appenders con niveles personalizados, definamos el nivel de la categoría como ‘all’, para que permita los distintos valores que definimos anteriormente.



*Winston

?UTILIZAR:
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service
  ' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
logger.log({
  level: 'info',
  message: 'Hello distributed log files!'
});
logger.info('Hello again distributed logs');
logger.error('Error log');
logger.warn('Warning log');
logger.debug('Debugging info');
logger.verbose('Verbose info');
logger.silly('Silly info');

?Niveles de salida
Los niveles de salida son los mismos que en log4js: error, warn, info, verbose, debug, silly.
Si el nivel de salida es info, se imprimirá info, warn, error.
Si el nivel de salida es error, se imprimirá error.
Si el nivel de salida es debug, se imprimirá debug, verbose, info, warn, error.
Si se escribe con codigo 'label' se imprime en todos los transportes

?Transports
Winston tiene varios transports, como Console, File, Http, etc.
En el ejemplo anterior, definimos el transport como File, pero también podemos definirlo como Console, que es el transport por defecto.

Podemos definir varios transports, como en el siguiente ejemplo:
new winston.transports.Console({ level:'verbose' })
new winston.transports.File({ filename: 'info.log', level:'error' })
new winston.transports.File({ filename: 'error.log', level:'error' })

?Formatos de salida
Winston tiene varios formatos de salida, como json, simple, printf, etc.
En el ejemplo anterior, definimos el formato como json, pero también podemos definirlo como simple, que es el formato por defecto.

Podemos definir un formato personalizado usando printf, como en el siguiente ejemplo:
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = createLogger({
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

*Pino
Pino es la librería más moderna de las utilizadas actualmente. Es veloz y cuenta con un buen ecosistema de trabajo.

?Para empezar a utilizarlo:
const logger = require('pino')()
logger.level('hello world')

Los métodos por default son: Trace, Debug, Info, Warn, Error y Fatal.
Todos los métodos tienen la siguiente forma genérica:
 logger.method([mergingObject], [message], [...interpolationValues]).

? Instancias de Logger

MergingObject
Opcionalmente, se puede proporcionar un objeto como primer parámetro. Cada par clave valor enumerable del mergingObject se copia en la línea de log JSON.
Es un objeto que se puede utilizar para agregar información adicional al log. Por ejemplo, si queremos agregar información sobre el usuario que está realizando la acción, podemos agregarla en el mergingObject.

Message
Se puede proporcionar opcionalmente, un string como parámetro. Por default, se fusiona en el log JSON, en la clave msg.
Este parámetro tiene prioridad respecto al de mergingObject. Es decir, si mergingObject tiene un mensaje y además se especifica el parámetro message, el que se va a imprimir es el de message.
Los string de message, pueden contener algún marcador de posición (placeholder). Estos son “%s” para string, “%d” para dígitos, “%0”, “%o” y “%j” para objetos. Los valores para estos marcadores de posición se proporcionan como un parámetro extra.

InterpolationValues
Todos los argumentos suministrados después del mensaje se serializan e interpolan de acuerdo con los marcadores de posición de estilo printf, suministrados para formar el valor de mensaje de salida final para la línea de log JSON.

En el siguiente código, en la primera línea usamos el marcador de posición “%d” para el número 42. En las siguientes líneas, utilizamos mergingObjects con distintos objetos.
logger.info('La respuesta es %d',42)
logger.info({a:42},'Hola mundo')
logger.info({a:42,b:2},'Hola mundo')
logger.info({c: {a:42,b:2}},'Hola mundo')

en consola se imprime:
“level” :30, “time” : 1619999533848, “pid” :19704, “hostname” :"LAPTOP-V5331C85", "msg": "La respuesta es 42”}
“Level” :30, "time" : 1619999533849, “pid” :19704, “hostname” : "LAPTOP-V5331C85","a":42, "msg": "Hola mundo™}
“level” :30, “time™ :1619999533849, “pid” : 19704, “hostname” : "LAPTOP-V5331C85","a":42,"b":2, "msg": "Hola mundo”}
“Level” :30, "time" : 1619999533850, “pid” :19704, “hostname” : "LAPTOP-V5331C85","c":{"a":42,"b":2}, "msg": "Hola mundo™}

?Metodo logger.child
Este método nos permite crear instancias de logger que heredan las propiedades del logger padre.
const child = logger.child({a: 'property'})
child.info('Hola child info')
child.info('Hola child info 2')
child.error('Hola child error')

En consola:

“level” :30, at a 1620000279082, “pid” :5580, “hostname” : "LAPTOP-V5331C85", "a": “property”, “msg”:"Hola child info"}
“level” :30, “time” : 1620000279083, “pid” :5580, “hostname” : “LAPTOP-V5331C85", "a": "property", “msg”:"Hola child info 2”}
“level” :50, “time” : 1620000279083, “pid” :5580, “hostname” : “LAPTOP-V5331C85", "a": "property", “msg”:"Hola child error"}


*Pino 
Pino es la librería más moderna de las utilizadas actualmente. Es veloz y cuenta con un buen ecosistema de trabajo.

?utilizarlo:
  const logger = require('pino')()
  logger.level('hello world')

Los métodos por default son: Trace, Debug, Info, Warn, Error y Fatal.
Todos los métodos tienen la siguiente forma genérica:
logger.method([mergingObject], [message], [...interpolationValues]).
  
?Instancias de Logger
MergingObject
Message
InterpolationValues

Logger child
El método logger.child permite la creación de registradores con estado (stateful loggers), donde los pares clave-valor se pueden anclar a un logger, lo que hace que se generen en cada línea de log.
Los logger.child usan el mismo flujo de salida que el padre y heredan el nivel de log actual del padre en el momento en que se generan.
El nivel de registro de un logger.child es mutable. Se puede configurar independientemente del padre, ya sea configurando el acceso de nivel después de crear el log secundario o usando la clave reservada bindings.level.
Los logger.child heredan los serializadores del log principal.
const child = logger.child({a: 'property'})






















*/