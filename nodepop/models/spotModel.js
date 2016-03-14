"use strict";

//creamos un modelo
var conn = require('../lib/connectMongoose');
var mongoose = require("mongoose");
//var conn = require('../lib/connectMongo'); conectar con drivers

//Creo el esquema

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


anuncioSchema.statics.list = function(sort, cb) {
    //preparamos la query sin ejecutarla (no ponemos callback a find)
    var query = Spot.find({});
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

var Spot = mongoose.model("Spot", anuncioSchema);

