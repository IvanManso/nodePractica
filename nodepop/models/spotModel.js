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

 /**
 * @api {post} /api/v1/anuncio
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *      "nombre": "Camión",
 *       "venta": true,
 *       "precio": 600.15,
 *       "foto": "camión.jpg",
 *       "tags": ["lifestyle", "motor"]
 *     }
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

 /**
 * @api {delete} /api/v1/anuncio
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *
 *     }
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

 /**
 * @api {put} /api/v1/anuncio
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *      "nombre": "Bicicleta",
 *       "venta": true,
 *       "precio": 23.15,
 *       "foto": "bici.jpg",
 *       "tags": ["lifestyle", "ciclismo"]
 *     }
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
