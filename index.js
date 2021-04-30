'use strict'

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE, // Nunca va  a dejar de intentar reconexión
    reconnectInterval: 500, // Reconexión cada 500 ms
    poolSize: 10, // Mantiene 10 conexiones de socket
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Falla la conexión inicial luefo de 10 Segundos
    socketTimeoutMS: 45000, // Cierra los sockets después de 45 segundos de inactividad
};


const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 5555;

mongoose.connect('mongodb://localhost:27017/mean', options,
    (err, res) => {
        if(err) {
            throw err
        }
        console.log('Bases de datos: ', 'online');

        app.listen(port, ()=> {
            console.log(`Servidor del api rest en http://localhost:${port}`);
        })
    });

