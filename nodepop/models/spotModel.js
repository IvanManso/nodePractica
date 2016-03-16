"use strict";

//creamos un modelo
var express = require('express');
var router = express.Router();
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

anuncioSchema.statics.list = function(filter, sort, limit, start, cb) {
    //preparamos la query sin ejecutarla (no ponemos callback a find)
    console.log(filter);
    console.log(limit);
    var query = Spot.find(filter);
    //console.log(query);
    //añadimos más parámetros a la query
    if (sort !== null) {
        query.sort(sort);
    }

    if (limit !== null) {
        query.limit(limit);
    }

    if(start !== null){
        query.skip(start);
    }

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

router.post("/", function(req, res) {
    var spot = new Anuncio(req.body);
    spot.save(function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: rows });
        }
    });
});

router.delete("/", function(req, res) {
    spot.remove(function(err) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: "" });
        }
    });
});

router.put("/:id", function(req, res) {
    spot.update({ id: req.params.id }, { $set: req.body }, { multi: false }, function(err, data) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: data });
        }
    });
});

//Lo registro en mongoose

var Spot = mongoose.model("Spot", anuncioSchema);
