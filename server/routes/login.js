const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');
const app = express();


app.post('/login', (req, res) => {

    //Obtencion del body 
    let body = req.body; // <- Correo y password

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //Si el usuario no existe en la base de datos
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ')Usuario( o contraseña incorrectos.'
                }
            });
        }

        //Valida si las contraseñas encriptadas son validas.
        //Si no son iguales
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o )contraseña( incorrectos.'
                }
            });
        }

        let token = jwt.sign({
            //Payload
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); //segundos:minutos:horas:dias

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});

module.exports = app;