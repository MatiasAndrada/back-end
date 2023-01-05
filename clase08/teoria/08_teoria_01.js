const express = require('express');
const { Router } = express;

const app = express();
const router = Router();
// req y res son peticion y respuesta
router.get('/recurso', (req, res) => {
    res.send('get ok');
});

router.post('/recurso', (req, res) => {
    res.send('post ok');
});


// use hace que las rutas las maneje con un middleware(es decir algo que se ejecuta antes)
// router lo uso como middleware
app.use('/api', router);

app.listen(8080);
