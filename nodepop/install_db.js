"use strict";

var fs = require("fs");

require("./models/spotModel.js");
require("./models/userModel.js");


var passwordHash = require('sha256');
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Spot");
var User = mongoose.model("User");

/**
 * Cargamos los anuncios que se encuentren en el archivo .JSON que tenemos creado por defecto. Los carga de manerá síncrona con un for (se precisa de mejor para realizarlo de manera asíncrona. PE: con async)
 */

function cargaAnunciosDefect(callback) {
    Anuncio.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Anuncios eliminados");
        fs.readFile("./anuncios.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else {
                var defecto = JSON.parse(data);
                for (var i = 0; i < defecto.anuncios.length; i++) {
                    var anuncio = new Anuncio(defecto.anuncios[i]);
                    anuncio.save(function(err, saved) {
                        if (err) {
                            console.log("Ha ocurrido un error con el anuncio", err);
                            return;
                        }
                        console.log("Anuncio guardado con éxito");
                    });
                }
            }
            console.log("FIN");
        });
    });

}

/**
 * Cargamos los usuarios que se encuentren en el archivo .JSON que tenemos creado por defecto. Los carga de manerá síncrona con un for (se precisa de mejor para realizarlo de manera asíncrona. PE: con async)
 */

function cargaUsuariosDefect(callback) {
    User.remove({}, function(err) {
        if (err) {
            return cb(err);
        }
        console.log("Usuarios eliminados");
        fs.readFile("./usuarios.json", { encoding: "utf8" }, function(error, data) {
            if (error) {
                console.log("Ha habido un error: \n", err);
            } else {
                var defecto = JSON.parse(data);
                for (var i = 0; i < defecto.usuarios.length; i++) {
                    var user = new User(defecto.usuarios[i]);
                    console.log(user["nombre"]);
                    console.log(user["clave"]);
                    user.clave = passwordHash(user["clave"]);
                    console.log(user["clave"]);
                    user.save(function(err, saved) {
                        if (err) {
                            console.log("Ha ocurrido un error con el usuario", err);
                            return;
                        }

                        console.log("Usuario guardado con éxito");
                    });
                }
            }
            console.log(defecto);
            console.log("FIN");
        });
    });

}

/**
 * Llamamos a la función de carga de anuncios
 */

cargaAnunciosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Anuncios por defecto cargados \n ", str);

});

/**
 * Llamamos a la función de carga de usuarios
 */

cargaUsuariosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Usuarios por defecto cargados \n ", str);

});
