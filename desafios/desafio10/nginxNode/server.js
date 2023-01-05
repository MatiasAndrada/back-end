/*
>> Consigna: 
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
Agregar en la vista info, el número de procesadores presentes en el servidor.
Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

*/


import express from 'express';
import cluster from 'cluster';
import * as os from 'os';

const modoCluster = process.argv[3] == 'CLUSTER';
console.log("argv:" +  process.argv)
console.log('Modo Cluster: ' + modoCluster);

if(modoCluster && cluster.isPrimary){
    const numCPUs = os.cpus().length;
    console.log('Numero de procesadores:' + numCPUs);
    console.log('PID MASTER: ' + process.pid);
    for(let i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died');
        cluster.fork();
    }
    );
}else{
    const app = express();
    const PORT = parseInt(process.argv[2] || 8080)

    app.get('/datos', (req, res) => {
        res.send(`Server en PORT(${PORT}) - PID(${process.pid}) - FYH(${new Date().toLocaleString()})`)
    });
    app.get('/api/randoms', (req, res) => {
        res.send(`Server en PORT(${PORT}) - PID(${process.pid}) - FYH(${new Date().toLocaleString()})`)
    });
    //mostrar proceesadores
    app.get('/info', (req, res) => {
        res.send(`Server en PORT(${PORT}) - PID(${process.pid}) - FYH(${new Date().toLocaleString()}) - Procesadores(${os.cpus().length})`)
    });

    app.listen(PORT, (err) => {
        if (err) {
            console.log('Error en servidor express', err);
        }
        console.log(`Servidor express escuchando en el puerto ${PORT}`);

    }); 
}

