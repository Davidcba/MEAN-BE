'use strict'

const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username obligatorio']
    },
    name: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Password obligatorio']
    }
})

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('User', userSchema);
