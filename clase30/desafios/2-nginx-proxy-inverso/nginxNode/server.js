const express = require('express');

const app = express();

const PORT = parseInt(process.argv[2]) || 8080

app.get('/', (req, res) => {
    console.log(`port: ${PORT} -> fyh ${Date.now()}`)
    res.send(`servidor express <span style="color:blueviolet;">{Ngix}</span> en ${PORT} -
    <b>PID ${process.pid}<b>} - ${new Date().toLocaleString()}`)
});

app.get('/datos', (req, res) => {
    console.log(`port: ${PORT} -> fyh ${Date.now()}`)
    res.send(`servidor express <span style="color:blueviolet;">{Ngix}</span> en ${PORT} - 
    <b>PID ${process.pid}<b>} - ${new Date().toLocaleString()}`)
});

app.listen(PORT, err => {
    if(!err) console.log(`servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
    else console.log(err)
});
