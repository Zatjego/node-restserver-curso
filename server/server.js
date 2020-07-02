//Se ejecuta el config antes que nada.
require('./config/config.js');

//______REQUIRES_________
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//_______________________

const app = express();


// parse application/x-www-form-urlencoded <- Middlewares
//app-express sirve para parsear las paginas en formato JSON - Ver en postman
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));


mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;
        console.log('Base de datos ONLINE');

    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});