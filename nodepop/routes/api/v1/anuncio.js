var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../../lib/auth"); //nos traemos el módulo auth.js para que nos los traiga y usarlo donde quiera
var Anuncio = mongoose.model("Spot");
var User = mongoose.model("User");


//Lanzamos la autentificación
router.use(auth());

/**
 * Aquí realizamos la petición de anuncios a través de filtros, para ello obtenelos los parámetros de la query de nuestra request y para el filtro de precio utilizaremos patrones y la el método "split()" que nos dividirá un string a partir del carácter que le digamos en un array.
 */

/**
 * @api {get} /api/v1/anuncio
 * @apiSuccessExample {json} Success-Response:
 *     {
 *       "result": true
 *     }
 *     {
 *      "nombre": "Bicicleta",
 *       "venta": true,
 *       "precio": 230.15,
 *       "foto": "bici.jpg",
 *       "tags": ["lifestyle", "motor"]
 *     }
 */

router.get('/', function(req, res) {
    var nombre = req.query.nombre || "";
    var venta = req.query.venta || "";
    var precio = req.query.precio || "";
    var foto = req.query.foto || "";
    var tags = req.query.tags || "";
    var sort = req.query.sort || "nombre";
    var limit = req.query.limit || "";
    var start = req.query.start || "";
    var filter = {};
    var precioSplit = precio.split("-");
    patternMenor = /-\d/;
    patternMayor = /\d-/;
    patternBetween = /\d-\d/;
    patternDigito = /\d/;

    if (nombre !== "") {
        filter.nombre = new RegExp('^' + nombre, "i");
    }
    if (tags !== "") {
        filter.tags = tags;
    }
    if (venta !== "") {
        filter.venta = venta;
    }
    if (limit !== "") {
        limit = parseInt(limit);
    }
    if (start !== "") {
        start = parseInt(start);
    }
    if (precio !== "") {
        if (patternBetween.test(precio)) {
            filter.precio = { '$gte': precioSplit[0], '$lte': precioSplit[1] };
        } else if (patternMayor.test(precio)) {
            filter.precio = { '$gte': precioSplit[0] };
        } else if (patternMenor.test(precio)) {
            filter.precio = { '$lte': precioSplit[1] };
        } else if (patternDigito.test(precio)) {
            filter.precio = precioSplit[0];
        }
    }


    Anuncio.list(filter, sort, limit, start, function(err, rows) {
        if (err) {
            return res.json({ result: false, err: err });
        } else {
            return res.json({ result: true, rows: rows });
        }
    });

});

/**
 * Ruta establecida a partir de la cual podremos ver la lista de anuncios
 */

router.get('/form', function(req, res, next) {
    var Anuncio = mongoose.model("Spot");
    Anuncio.list({}, null, function(err, rows) {
        res.json({ result: true, spots: rows });
    });
});



module.exports = router;
