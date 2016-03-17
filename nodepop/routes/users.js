var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var passwordHash = require('sha256');



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*
router.post("/", function(req, res) {
    var user = new User(req.body);
    user.clave = passwordHash(user["clave"]);
    user.save(function(err, saved) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: saved });
        }
    });
}); */


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
        var queryName = User.find({nombre: req.body.nombre});
        queryName.exec(function(err, rows) {

            console.log("Todas las rows son", rows);
            if (err) {
                return console.error("error al registrar");
            } else if (rows.length !== 0) {
                console.log("Hola soy el del nombre");
                return console.error("Algún campo se encuentra repetido");
            } else {
                var queryEmail = User.find({email: req.body.email});
                queryEmail.exec(function(err, rows) {
                    console.log("Las rows de email son", rows);
                    if (err) {
                        return console.error("error al registrar");
                    } else if (rows.length !== 0) {
                        console.log("Hola soy el del email");
                        return console.error("Algún campo se encuentra repetido");
                    } else {
                        user.clave = passwordHash(user["clave"]);
                        console.log("El usuario es", user);
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
