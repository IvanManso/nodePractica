"use strict";

//creamos un modelo
var express = require('express');
var router = express.Router();
var conn = require('../lib/connectMongoose');
var mongoose = require("mongoose");

/**
 * En esta parte utilizaremos un esquema a través de mongoose para establecer el tipo de parámetros que debe de llevar cada anuncio.
 */

//Creo el esquema

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

/**
 * Utilizaremos de manera estática un listado que tendrá asignada una función a la que le llegarán los filtros y el callback correspondiente.
 */

anuncioSchema.statics.list = function(filter, sort, limit, start, cb) {
    var query = Spot.find(filter);
    if (sort !== null) {
        query.sort(sort);
    }

    if (limit !== null) {
        query.limit(limit);
    }

    if (start !== null) {
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

/**
 * Realizaremos una petición básica de POST para introducir un anuncio
 */

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

/**
 * Realizaremos una petición básica de DELETE para borrar un anuncio
 */

router.delete("/", function(req, res) {
    var spot = new Anuncio(req.body);
    spot.remove(function(err) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: "" });
        }
    });
});

/**
 * Realizaremos una petición básica de PUT para editar un anuncio
 */

router.put("/:id", function(req, res) {
    var spot = new Anuncio(req.body);
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
