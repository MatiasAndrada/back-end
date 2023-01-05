const router = require('express').Router();
const parseArgs = require("minimist");

const options = {
    alias: {
        p: "puerto"
    },
    default: {
        puerto: 8080
    }
}
const commandLineArgs = process.argv.slice(2);
const { puerto } = parseArgs(commandLineArgs, options);

router.get('/info', (req, res) => {
    res.json({
        'Argumentos de entrada': puerto,
        'Nombre del sistema operativo': process.platform,
        'Version de Node': process.version,
        'Memoria libre': process.memoryUsage().rss,
        'Path de ejecucion': process.cwd(),
        'Proceso ID': process.pid,
        'Path ejecutable': process.execPath,


    })
    })

router.get('/randoms', (req, res) => {
    const { cant } = req.query;
    const cantRandoms = cant || 400000000;
    const fork = require('child_process').fork;
    const child = fork('./src/fork.js');
    child.send(cantRandoms);
    child.on('message', (message) => {
        res.json(message);
    })
})

module.exports = router;
