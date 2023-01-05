/*
Realizar un servidor Node.js basado en express al que se le pase como parámetro el número de puerto de escucha. De no recibir este dato, el servidor iniciará en el puerto 8080.
Al ponerse en línea el servidor representará por consola el puerto de conexión y su número de proceso (pid).
En el endpoint raíz '/' deberá devolver un mensaje con el siguiente formato:
'Servidor express en (PORT) - PID (pid) - (fecha y hora actual)}'
 */

const express = require('express')
const app = express()
const PORT = process.argv[2] || 8080
const PID = process.pid
const moment = require('moment')



app.get('/', (req, res) => {

    res.json({
        msg: `Servidor express en ${PORT} - PID ${PID} - ${moment().format('DD/MM/YYYY HH:mm:ss')}`
    })

})

const server = app.listen(PORT, () => {
    console.log(`Servidor express en ${PORT} - PID ${PID} - ${moment().format('DD/MM/YYYY HH:mm:ss')}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))
