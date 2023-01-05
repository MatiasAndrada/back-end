/*

!ARTILLERY
Artillery es una dependencia de Node moderna, potente, fácil y muy útil para realizar test de carga a servidores.
Cuenta con un conjunto de herramientas para tests de performance que se usa para enviar aplicaciones escalables que se mantengan eficaces y resistentes bajo cargas elevadas.
Podemos usar Artillery para ejecutar dos tipos de pruebas de rendimiento:
Pruebas que cargan un sistema, o sea, pruebas de carga, de estrés.
Pruebas que verifican que un sistema funciona como se esperaba, es decir, pruebas funcionales continuas.

👉 Solo puede ser utilizado en sistemas de backend, no se puede utilizar en el front.


?Usando Artillery
Ejemplo en: "../desafios/1-artillery"

?Comandos para ininciar
1.	Prendemos el servidor en modo Fork con el comando:
$ node server.js 8081 FORK
2.	Abrimos otra terminal sobre la carpeta del proyecto y con el siguiente comando hacemos el test de carga:
artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_fork.txt
3.	Hacemos lo mismo con el servidor en modo Cluster:
$ node server.js 8081 CLUSTER
4.	Y con el siguiente comando hacemos el test de carga:
artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_cluster.txt
📝 NOTA: En las query seteamos max en 100000 para calcular números primos hasta 100.000.

?Comparando los resultados
Nos interesará fijamos en la última parte de los mismos:
Mean response/sec: 
Response time (msec):
    min: 0
    max: 0
    median: 0/
    p95: 0
    p99: 0
    
¿Qué vemos?
Podemos ver que la media de respuestas (Mean response/sec) por segundo es mucho más alta en el Cluster, por lo que, comprobamos que es más eficiente.
Los milisegundos de latencia (Response time, median) es más alto en el Fork que en Cluster. Por lo que se vuelve a comprobar que es mejor el servidor en modo Cluster.

!PROFILING
Profiling en español es análisis de rendimiento. Es la investigación del comportamiento de un programa usando información reunida desde el análisis dinámico del mismo.
El objetivo es averiguar el tiempo dedicado a la ejecución de diferentes partes del programa para detectar los puntos problemáticos y las áreas donde sea posible llevar a cabo una optimización del rendimiento (ya sea en velocidad o en consumo de recursos).​
Un profiler puede proporcionar distintas salidas, como una traza de ejecución o un resumen estadístico de los eventos observados.
?Profiling en NodeJs
Cualquier navegador moderno, tiene un built-in profiler integrado en DevTools, que registra toda la información sobre las funciones y cuánto tiempo lleva ejecutarlas en un archivo de registro.
Luego, el navegador analiza este archivo de log, brindándonos información legible sobre lo que está sucediendo, para que podamos entenderlo y encontrar cuellos de botella.
Node también tiene un built-in profiler pero con una diferencia: este no analiza archivos de log como los navegadores, sino que simplemente recopila toda la información en estos archivos de log.
Significa que necesita tener alguna herramienta separada que pueda comprender este archivo de log y proporcionarnos la información de forma legible.

!Curl 
Antes de empezar a ver cómo utilizamos el Node built-in profiler, vamos a ver qué es Curl y cómo lo podemos usar para esto.
Curl es una herramienta de línea de comandos que nos permite enviar solicitudes HTTP a un servidor y ver la respuesta. como un postman en linea de comandos
Es utilizado a diario por prácticamente todos los usuarios de Internet en el mundo.
Además, se utiliza en automóviles, televisores, teléfonos móviles, tabletas, entre otros y es el motor de transferencia de Internet para miles de aplicaciones de software en más de diez mil millones de instalaciones.

?Curl - Instalación
Para usarlo, debemos descargarlo e instalarlo. Lo podemos hacer desde: https://curl.se/download.html
Una vez descargado, descomprimimos el zip y en la carpeta “bin” encontramos el archivo de instalación “.exe” llamado curl.exe. (Posiblemente tengamos que ejecutarlo como administrador)
Una vez instalado, ya lo podemos utilizar como comando en la consola.

?Curl - Uso
Ejemplo en: "../desafios/2-curl"
?Comandos para ininciar
Prender el servidor en modo profiler
$ node server.js 8081 --prof
Ahora abrimos otra terminal, en la carpeta del proyecto, y procedemos con los siguientes pasos.
1.Con el siguiente comando, creamos un nuevo usuario:
curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"
2.Ahora, puedo usar el test de carga. Para eso, utilizo el siguiente comando:
artillery quick --count 10 -n 50 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123" > result_bloq.txt
Va a hacer un test de 10 request con 50 usuarios a la url especificada. Y el resultado lo va a guardar en el archivo result_bloq.txt. Para ver este archivo debo salir del servidor (sino no nos deja abrirlo).
Con lo hecho, se crea también un archivo llamado Isolate que está encriptado. Primero, lo debemos renombramos como bloq-v8.log y antes de decodificar el archivo, hacemos lo mismo pero cuando la ruta es la no bloqueante.
1.Creamos nuevamente un nuevo usuario igual que antes.
2.Luego, el comando es similar pero la url es hacia la ruta no bloqueante de login
artillery quick --count 10 -n 50 “http://localhost:8080/auth-noblog?username=dani&password=qwerty123" > result_noblog.txt
Pasamos ahora a decodificar los archivos log que se crearon.
Para eso, utilizamos el siguiente comando para cada uno:
$ node --prof-process bloq-v8.log > result_prof-bloq.txt

$ node --prof-process nobloqg-v8.log > result_prof-nobloq.txt
Se crean entonces los archivos result_prof-bloq.txt y result_prof-nobloq.txt con la información de los primeros archivos decodificada.

?Curl - Resultados
¿Qué vemos?
Vemos que en Shared libraries el proceso no bloqueante se lleva muchos menos ticks (un poco menos de la mitad) de los que se lleva en el proceso bloqueante.
De esta forma, y analizando ambos archivos por completo, podemos ir haciendo una inspección de los procesos.

!NODE INSPECT
Veamos otro modo de hacer lo recién visto con pasos más sencillos.
1.	Para eso, primero prendemos el servidor con el comando:
$ node --inspect server.js 
2.	Luego, en el navegador Google Chrome, ponemos:
chrome://inspect
3.  Abrimos el DevTools
4.	Se nos abre una nueva ventana, y vamos a la pestaña profiler. Allí, cliqueo en el botón de start.
5.	Una vez hecho esto, puedo volver a la consola y correr nuevamente los comandos del test de carga artillery que mencionamos anteriormente. Para los procesos bloqueante y no bloqueante.
6.	Una vez que finaliza, ponemos el botón stop en el navegador, y nos muestra algo como esto, con la misma información que los archivos vistos anteriormente.
Si vamos a “run” y luego desplegamos también el proceso que se nos abre, podemos ver, mirando a la derecha que en el archivo server.js línea 32 tenemos un proceso bloqueantes.
Podemos entonces hacer click sobre eso (server.js:32).
*Si vamos a “run” y luego desplegamos también el proceso que se nos abre, podemos ver, mirando a la derecha que en el archivo server.js línea 32 tenemos un proceso bloqueantes.
Podemos entonces hacer click sobre eso (server.js:32).

?Ejempo en: "../desafios/3-inspect"

?Comandos
$ node --inspect server.js 
Acceder a "chrome://inspect"
$ artillery quick --count 10 -n 50 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123" > result_bloq.txt
$ artillery quick --count 10 -n 50 "http://localhost:8080/auth-noblog?username=dani&password=qwerty123" > result_nobloq.txt

?Resultado
¿Qué vemos?
Vemos que en Shared libraries el proceso no bloqueante se lleva muchos menos ticks (un poco menos de la mitad) de los que se lleva en el proceso bloqueante.
De esta forma, y analizando ambos archivos por completo, podemos ir haciendo una inspección de los procesos.

!Aprender anoracion big o


!AUTOCANNON Y 0x
Autocannon es una dependencia de Node (similar a Artillery) que nos ayuda a realizar los test de carga.
Es una herramienta de evaluación comparativa HTTP / 1.1.
0x es una dependencia que perfila y genera un gráfico de flama (flame graph) interactivo para un proceso Node en un solo comando.
En este caso, vamos a hacer los test de carga por código, en lugar de por consola como hicimos con Artillery.

?Ejemplo en: "../desafios/4-autocannon"

?Realizando test de carga
Hacemos parecido a lo anterior, y con la función run ejecutamos el test para la ruta del proceso bloqueante y para la del no bloqueante.
Los test los vamos a realizar en un archivo llamado benchmark.js.
En él, requerimos Autocannon y creamos el test.
En el package.json cambiamos en el script “start”, en vez de Node como siempre, ponemos 0x.
Con esto, lo que hacemos es que se genere el gráfico de flama.
Además, en el script “test” tenemos que decirle qué archivo va a testear, aclarando que es de Node (como vemos en el código).

“scripts: {
    “test”: “node benchmark.js",
    "start": "0x server.js”
    ;
    
    
    
?Comandos
$ npm install autocannon --save
$ npm install 0x -g
Autocannon lo vamos a instalar como dependencia del proyecto, ya que como dijimos, los test los vamos a realizar por código.
0x lo instalamos de forma global.
$ npm start
$ curl -X GET “http://localhost:8080/newUser 2username=dani&password=qwerty123”
npm test
Ambos test se ejecutan en paralelo.
Se genera en consola un reporte parecido a los que vimos con los métodos anteriores. Uno por cada test.
Cuando apagamos el servidor, se crea una carpeta de nombre aleatorio.
Esta contiene los resultados en archivo Isolate, similar a los visto y además un html con los diagramas de flama.
Este archivo HTML lo podemos abrir en un navegador, y de esa forma podemos ver los diagramas.

*Explorar y navegar el diagrama
Con los botones de abajo en el medio, podemos ir cambiando el color, eligiendo qué procesos se muestran, cuáles no, etc.
La altura del diagrama representa la profundidad del stack de Node. Cuanto más arriba llegue el diagrama de flamas, más anidado está dentro del stack de procesos.
Los procesos de más arriba son los que primero tienen que resolverse para dejar liberados los procesos de abajo. Es decir, los procesos de arriba son los que bloquean a los de abajo y son los que están en color más oscuro (“hot”).
Esto es justamente porque es el test sobre el proceso bloqueante.
La horizontalidad es la duración en el stack, entonces cuanto más largos sean, mayor duración tienen. Por eso observamos que en el proceso bloqueante, los procesos duran mucho tiempo en el stack. Y con esto vemos también su planitud, no tiene picos, como si tiene el no bloqueante.
En el caso del no bloqueante, vemos que tiene picos, y esto es porque los procesos no duran mucho tiempo en el stack, sino que se van liberando rápidamente.














*/