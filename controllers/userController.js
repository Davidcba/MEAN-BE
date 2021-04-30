'use strict'

const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const path = require('path');


// Debera ser post para registro

function login(req, res) {
    const requested_data = req.body;
    const username = requested_data.username;
    const password = requested_data.password;
    User.findOne({
        username: username
    },
        (err, user)=> {
        if (err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    res.status(200).send({
                        user
                    })
                } else {
                    res.status(404).send({
                        message: 'El usuario no ha podido loguearse',
                        err
                    });
                }
            })
        }
        });
}

function registrarUsuario(req, res) {
    let user = new User();
    let requested_data = req.body;
    console.log(requested_data);

    user.username = requested_data.username;
    user.name = requested_data.name;
    if (requested_data.password) {
        bcrypt.hash(requested_data.password, 10, (err, hash) => {
            user.password = hash;
            if (user.name !== null && user.username !== null){
                user.save((err, userStored) =>{
                    if(err){
                        res.status(500).send({
                            message: 'Error al guardar el usuario',
                            errors: err.errors
                        });
                    } else {
                        if (!userStored) {
                            res.status(404).send({
                                message: 'No se ha registrado el usuario'
                            });
                        } else {
                            res.status(200).send({
                                user: userStored
                            });
                        }
                    }
                })
            } else {
                res.status(200).send({
                    message: 'Rellena todos los datos'
                });
            }
        });
    } else {
        res.status(500).send({
            message: 'Introduce la contraseña'
        });
    }
}
module.exports = {
    registrarUsuario,
    login
}
