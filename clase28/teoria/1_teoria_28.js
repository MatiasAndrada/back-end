/*
!Global & Child Process
?Objeto Process
*Como ya hemos visto, el objeto process es una variable global disponible en NodeJS que nos ofrece diversas informaciones y utilidades acerca del proceso que está ejecutando un script Node. 
*Contiene diversos métodos, eventos y propiedades que nos sirven no solo para obtener datos del proceso actual, sino también para controlarlo.
*Al ser un objeto global quiere decir que lo puedes usar en cualquier localización de tu código NodeJS, sin tener que hacer el correspondiente require().

?Ejemplos de datos que se pueden obtener con el objeto process
'Directorio actual de trabajo:' + process.cwd();
'execPath:' + process.execPath; ?Ruta del ejecutable de Node
'Id del proceso:' + process.pid; 
'Version de Node:' + process.version; 
'Titulo del proceso:' + process.title;
'Sistema operativo:' ‘ + process.platform; ?Linux, Windows, etc.
'Uso de la memoria:'+ process.memoryUsage(); ?Objeto con datos de uso de memoria
?Salir de ejecución
A veces, se necesita salir de la ejecución de un programa en Node. Esto lo podemos conseguir mediante el método exit del objeto process.
process.exit(0); ?Código de salida 0, sin errores
process.exit(1); ?Código de salida 1, con errores
?Funcion .on()
*la mayor funcionalidad de process esta contenida en este fn.
*Dicha función está escuchando durante todo el proceso que se ejecuta, es por eso que solo se puede actuar sobre su callback.
*El primer parámetro es el nombre del evento que queremos escuchar.
*El segundo parámetro es la función que se ejecutará cuando se dispare el evento.
process.on('exit', code => {
    console.log('SAlida con codigo' + code);
});

?Eventos:

?Evento exit 
*El evento exit se dispara cuando el proceso termina su ejecución.
*Es muy útil para realizar tareas de limpieza, como cerrar conexiones a bases de datos, archivos, etc.
*El evento exit recibe como parámetro opcional el código de salida del proceso.
*El código de salida es un número entero que indica si el proceso terminó con éxito o no.
*Si el código de salida es 0 (default), quiere decir que el proceso terminó sin errores.
*Si el código de salida es distinto de 0, quiere decir que el proceso terminó con errores.
*El evento exit se dispara antes de que el proceso termine su ejecución.
*Por lo tanto, si se ejecuta un proceso asíncrono dentro del evento exit, el proceso no se detendrá hasta que el proceso asíncrono termine su ejecución.
?Evento beforeExit
*En el momento que termina todas las instrucciones y la aplicacion se cierra.
*Normalmente, el proceso de Node se cerrará cuando no haya trabajo programado, pero un oyente registrado en el evento beforeExit puede realizar llamadas asincrónicas y, por lo tanto, hacer que el proceso de Node continúe.
*No es alternativa al exit 
?Evento uncaughtException
*El evento uncaughtException se dispara cuando ocurre un error no capturado en el proceso.
*Si se agregó un listener a esta excepción, no se producirá la acción por defecto (imprimir una traza del stack y salir).
*Es un mecanismo muy básico para manejar excepciones.
?process.execPath
*Devuelve la ruta del ejecutable de Node.
?process.stdout.write
*La propiedad process.stdout devuelve una secuencia conectada a stdout.
*Es un stream de escritura para stdout.
!CHILD PROCESS
*El módulo child_process proporciona una forma de ejecutar comandos de línea de comandos en un subproceso y comunicarse con ellos.
    !Single Thread (unico hilo)
    *NodeJS es un entorno de ejecución de JavaScript que se ejecuta en un único hilo.
    *VENTAJA permite atender mayor demanda con menor recursos 
    *DESVENTAJA no se puede ejecutar código en paralelo
    *Todas las operaciones que NodeJS no puede realizar al instante (operaciones no bloqueantes),liberan el proceso, atiende otras solicitudes.
    *El hilo principal podrá estar atento a solicitudes, pero una vez que se atiendan, Node podrá levantar de manera interna otros procesos para realizar todo tipo de acciones que se deban producir como respuesta a esas solicitudes. Estos procesos secundarios pueden crearse con el módulo child_process.
    *El módulo child_process nos permite ejecutar comandos de línea de comandos en un subproceso y comunicarnos con ellos.
!PROCESO HIJO
*Un proceso hijo es un proceso que se ejecuta dentro de otro proceso.
*Node nos permite ejecutar un comando del sist dentro dentro de un proceso hijo y escuchar su entrada/salida
*Los desarroladores crean procesos secundarios habitualmente para ejecutar comandos sobre su sist op cuando necesitan manipular el resultado de sus programas Node con un shell.
*Los procesos secundarios son muy útiles para ejecutar comandos de línea de comandos en sistemas operativos como Windows o Linux.
?4 formar CREAR procesos HIJOS
*exec()
*execFile()
*spawn()
*fork()

?exec()
*El método exec() ejecuta un comando de línea de comandos en un shell y devuelve el resultado en un buffer.
*Recibe como primer arg el comando ls-lh, este enumera los files y folders del directorio en un formato largo.
*El segundo arg es un objeto con las opciones del comando.
*El tercer arg es una función callback que se ejecuta cuando el proceso hijo termina su ejecución.
*El callback recibe como primer arg un error, si el comando no se ejecutó correctamente.
?execFile()
*El primer parametro es la ruta, como puede ser un script de bash.
*Luego funciona de la isma manera que con el comando exec
?spawn()
*Envio el proceso spam para quedarme esperando algun evento, como los datos de respuesta
*La función spawn() ejecuta un comando en un proceso. Esta función devuelve datos a través de la API del flujo. Por tanto, para obtener el resultado del proceso secundario, debemos escuchar los eventos del flujo.
*Con exec() y execFile(), todos los datos procesados se guardan en la memoria de la computadora. Para cantidades de datos más grandes, esto puede degradar el rendimiento del sistema. 
*En el caso de spawn(), con un flujo, los datos se procesan y transfieren en pequeños trozos. Por lo tanto, puede procesar una gran cantidad de datos sin usar demasiada memoria en un momento dado.
*Requerimos el método spawn del módulo child_process.
*El método spawn() recibe como primer parámetro el comando a ejecutar.
*El segundo parámetro es un array con los argumentos del comando.
*Le estamos indicando que Node ejecute el comando find con el argumento '.', lo que hace que encuentre todos los files del directorio.
*Los comandos pueden devolver datos en el flujo stdout o el flujo stder
*Puede añadir oyentes invocando el método on() de cada objeto de los flujos.
*Los comandos pueden devolver datos en el flujo stdout o el flujo stder
*Puede añadir oyentes invocando el método on() de cada objeto de los flujos.
*El evento data se dispara cuando el proceso hijo envía datos al flujo stdout.
*El evento data se dispara cuando el proceso hijo envía datos al flujo stderr.
*El evento close se dispara cuando el proceso hijo termina su ejecución.
*El evento error se dispara cuando el proceso hijo no puede ejecutarse.
*El evento exit se dispara cuando el proceso hijo termina su ejecución.
*El evento disconnect se dispara cuando el proceso hijo se desconecta del proceso padre.
*El evento message se dispara cuando el proceso hijo envía un mensaje al proceso padre.
?fork()
*El método fork() es una variante de spawn() para ejecutar scripts de Node, permite la comunicacion entre el proceso principal y el secundario.
*Al recuperar datos desde el proceso secundario, el principal puede enviar mensajes al proceso secundario en ejecucion, y vicebersa.
*Si un servidor web esta bloqueado, no puede procesar ninguna nueva solicitud entrante hasta q el codigo de bloqueo haya completado su ejecucion.
*Si el codigo de bloqueo es costoso, el servidor web no podra atender a los clientes durante ese tiempo.
*Fork evita el bloqueo corriendo el proceso secundario bloqueante a un hilo aparte.
*El proceso secundario puede ejecutar codigo bloqueante sin afectar al proceso principal.




















 

    

*/