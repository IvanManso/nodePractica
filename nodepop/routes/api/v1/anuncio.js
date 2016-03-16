var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../../lib/auth"); //nos traemos el módulo auth.js para que nos los traiga y usarlo donde quiera
var passwordHash = require('password-hash');
var Anuncio = mongoose.model("Spot");
//var RegExp = require('requires-regex');

/*router.use(auth());*/

//llamamos a la función auth que queremos que aparezca (middleware)

/* GET users listing. */
/*router.get("/", auth("admin", "pass"), function(req, res) { //podemons meter varios middleware en cuanto coincida esa ruta "/"

    var sort = req.query.sort || "nombre";

    User.list(sort, function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            return;
        }
        //lo mando en JSON
        res.json({ result: true, rows: rows });
    });
}); */
/* GET users listing. */
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
     patternMenor =  /-\d/;
     patternMayor = /\d-/;
     patternBetween = /\d-\d/;
     patternDigito = /\d/;


     if (nombre !== "") {
         filter.nombre = new RegExp('^' + nombre, "i");
         //filter.nombre = nombre;
     }
     //console.log(filter, tags);
     if (tags !== "") {
         filter.tags = tags;
         //console.log(filter, tags);
     }
     if (venta !== "") {
         filter.venta = venta;
     }
     if (limit !== "") {
         limit = parseInt(limit);
     }
     if(start !== ""){
         start = parseInt(start);
     }
     if (precio !== "") {
         if (patternBetween.test(precio)) {
             filter.precio = { '$gte': precioSplit[0], '$lte': precioSplit[1] };
         }
         else if (patternMayor.test(precio)) { //precio mayor que pmax
             filter.precio = { '$gte': precioSplit[0] };
         }
         else if (patternMenor.test(precio)) { //precio menor a pmax
             filter.precio = { '$lte': precioSplit[1] };
         }
         else if(patternDigito.test(precio)) { //un sólo precio con pmax
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


router.get('/form', function(req, res, next) {
    var Anuncio = mongoose.model("Spot");
    Anuncio.list({}, null, function(err, rows) {
        res.json({ result: true, spots: rows });
    });
});

//user.getUsers(function(err,users){

//});
module.exports = router;
