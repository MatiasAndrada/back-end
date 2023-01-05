/*

!CLUSTERS Y ESCALABILIDAD
* Los clusters son una forma de escalar una aplicacion de node.js


!Modulo CLUSTER
* El modulo cluster nos permite crear procesos hijos
* que se encargan de ejecutar el codigo de nuestro servidor de forma paralela.
* Esto nos permite aprovechar al maximo los recursos de la maquina y asi poder atender a mas usuarios.  

?Como funciona?
*Node nos provee un modulo llamado cluster para hacer uso de esto, permite crear facilmente procesos hijo.
*Lo que hace es clonar el worker maestro y delegarle la carga a cada uno de ellos de esa forma evita la sobrecarga.
*Con un metodo similar al de fork(), se crea la copia del proceso actual, en donde el primer porceso se convierte en master, y la copia en un worker.
*El master se encarga de crear los workers y de asignarles la carga de trabajo.

?Comandos de cluster
* cluster.isMaster: Devuelve true si el proceso es el master.
* cluster.isWorker: Devuelve true si el proceso es un worker.
* cluster.fork(): Crea un nuevo worker.
* cluster.on(): Permite escuchar eventos de los workers.
* cluster.disconnect(): Cierra todos los workers.
* cluster.worker: Devuelve el worker actual.
* cluster.workers: Devuelve un array con todos los workers.

?Comandos utiles
*Si usamos Powershell:
? tasklist /fi "imagename eq node.exe"
lista todos los procesos de node.js activos
? taskkill /pid <PID> /f
mata un proceso por su número de PID
Si usamos Bash:
? fuser <PORT>/tcp [-k]
encuentra [y mata] al proceso ocupando el puerto PORT



!MODULO FOREVER
* Forever es un modulo que nos permite mantener un proceso de node.js ejecutandose en segundo plano.
* No ocupa la consola

El módulo Nodemon de Node, evita esto y se reinicia de forma automática ante cualquier cambio en los archivos del programa en ejecución.
Sin embargo, Nodemon solo nos sirve en desarrollo. Cuando estamos en producción, no se puede hacer uso de este módulo
Esta es la ventaja de Forever, ya que este puede utilizarse en producción. Además, nos sirve también para reiniciar el servidor ante un fallo del mismo.

?Uso de forever
* forever start <archivo.js> //Incia un nuevo proceso
* forever stop <PID> //Detiene un proceso segun su ID
* forever list //Lista los nuevos procesos
* forever stopall //Detiene los procesos activos
* forever --help //Muestra la ayuda completa




!MODULO PM2 PROCESS MANAGER
* PM2 es un gestor de procesos de Node.js que nos permite mantener nuestros procesos ejecutándose en segundo plano.
* PM2 nos permite reiniciar nuestros procesos en caso de que fallen, y también nos permite monitorearlos.
* Lo mas importante es que simplifica las aplicacionde de Node para ejecutarlas como cluster.
* Es decir, que podemos ecribir nuestra aplicacion sin pensar en el cluster, y luego PM2 se encarga de crear un numero dado de worker processes para ejecutar la aplicacion.
* es capaz de 
?Instalacion
* npm install pm2 -g
Iniciar  la ejecucion de forma generica
* pm2 start <archivo.js> //Incia un nuevo proceso
*Se puede iniciar la ejecución en modo fork o en modo cluster. Los comandos que utilizamos son:


MODO FORK -------------------

app.js --name="ServerxX"
app.js --name="Server1"
app.js --name="Server2"

MODO CLUSTER -------------------

pm2 start app.js --name="ServerX" --watch -i max -- PORT
pm2 start app.js --name="Server3" --watch -i max -- 8083

?Comandos utiles
* pm2 list //Lista los nuevos procesos
* pm2 stop <PID> //Detiene un proceso segun su ID
* pm2 stopall //Detiene los procesos activos
* pm2 restart all //Reinicia todos los procesos
* pm2 restart <PID> //Reinicia un proceso segun su ID
* pm2 delete <PID> //Elimina un proceso segun su ID
* pm2 delete all //Elimina todos los procesos
* pm2 monit //Muestra la informacion de los procesos
* pm2 logs //Muestra los logs de los procesos
* pm2 --help //Muestra la ayuda completa
















*/