//======================================
//Puerto, si la aplicación no esta desplegado en producción usara el puerto local (3000)
//======================================
process.env.PORT = process.env.PORT || 3000;

//======================================
//ENTORNO
//======================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//======================================
//BASE DE DATOS
//======================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
};
process.env.urlDB = urlDB;