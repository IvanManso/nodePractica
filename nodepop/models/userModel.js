"use strict";

//creamos un modelo
var conn = require('../lib/connectMongoose');
var mongoose = require("mongoose");

//var conn = require('../lib/connectMongo'); conectar con drivers

//Creo el esquema

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

usuarioSchema.statics.list = function(sort, cb) {
    //preparamos la query sin ejecutarla (no ponemos callback a find)
    var query = User.find({});
    //añadimos más parámetros a la query
    query.sort(sort);


    //la ejecutamos
    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, rows);
        return;
    });
};

//Lo registro en mongoose
usuarioSchema.plugin(require('basic-auth-mongoose'));
var User = mongoose.model("User", usuarioSchema);
