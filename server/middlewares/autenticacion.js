const jwt = require('jsonwebtoken');

// ==================
// Verificar token
// ==================
let verificaToken = (req, res, next) => {

    //'token' = header que estoy buscando. 
    let token = req.get('token'); //Authorizacion

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'Token no valido'
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: 'El usuario no es administrador'
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}