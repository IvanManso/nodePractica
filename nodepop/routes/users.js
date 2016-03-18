var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passwordHash = require('sha256');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Aquí validaremos el usuario cuando se le intenta registrar. Para ello comprobamos que ningún campo se encuentre vacío.
Tras esto comprobamos si el nombre ya se encuentra en nuestra DB y si este no se encuentra realizamos la misma comprobación con el email. Si no se encuentran en la DB se registrará con éxito.
 */

/**
 * @api {post} /routes/users
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *       "nombre": "Jacinto",
 *       "email": "jacinto@gmail.com",
 *       "clave": "hash(jacinto)"
 *     }
 */

router.post("/", function(req, res) {
    validar(req, res);
});

function validar(req, res) {
    var user = new User(req.body);
    var nombre = req.body.nombre;
    var email = req.body.email;
    var clave = req.body.clave;
    if (nombre === "" || email === "" || clave === "") {
        return console.error("Campos vacíos");
    } else {
        var filter = {};
        filter.nombre = nombre;
        filter.email = email;
        var queryName = User.find({ nombre: req.body.nombre });
        queryName.exec(function(err, rows) {
            if (err) {
                return console.error("error al registrar");
            } else if (rows.length !== 0) {
                return console.error("Algún campo se encuentra repetido");
            } else {
                var queryEmail = User.find({ email: req.body.email });
                queryEmail.exec(function(err, rows) {
                    if (err) {
                        return console.error("error al registrar");
                    } else if (rows.length !== 0) {
                        return console.error("Algún campo se encuentra repetido");
                    } else {
                        user.clave = passwordHash(user["clave"]);
                        user.save(function(err, saved) {
                            if (err) {
                                return res.json({ result: false, err: err });
                            } else {
                                console.log("Registro completado");
                                return res.json({ result: true, row: saved });
                            }
                        });
                    };
                });
            };
        });
    }
}

module.exports = router;
