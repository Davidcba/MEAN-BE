'use strict'

const express = require('express');
const userController = require('../controllers/userController');
const api = express.Router();

api.post('/registrar-usuario', userController.registrarUsuario);
api.post('/login-usuario', userController.login);

module.exports = api;