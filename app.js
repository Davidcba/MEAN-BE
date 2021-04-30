'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app  = express();

// cargar ruta, en este caso dado la baja complejidad solo es una

const userRoutes = require('./routes/usersRoutes');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

// Configuración cabeceras http

//CORS MW para evitar conflictos con Cross Origins

const allowCrossDomain= (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Origin', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
// Rutas base
app.use('/api', userRoutes)
app.get('/test', (req,res)=>{
    res.status(200).send({message: 'Ruta de prueba funcionando'})
})

module.exports = app;

