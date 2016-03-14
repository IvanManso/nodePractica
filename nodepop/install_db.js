"use strict";

var fs = require("fs");

function cargaAnunciosDefect(callback) {
    fs.readFile("./anuncios.json", { encoding: "utf8" }, function(error, data) {
        if (error) {
            console.log("Ha habido un error: \n", err);
        } else { //o lanzar excepción o return; o return console.log(...);
            var defecto = JSON.parse(data); //ahora recorremos el array
            /*for (i in data) {
                var nombre = json.data.nombre;
                var venta = json.data.venta;
                var foto = json.data.foto;
                for (j in json.data.tags[]){
                	var tags = json.data.tags[j];
                }*/
            }
            console.log("Anuncios por defecto cargados \n");
        //}
        console.log(defecto);
        console.log("FIN");
    });

}

cargaAnunciosDefect(function(err, str) {
    if (err) {
        console.log("Ha ocurrido un error: \n", err);
        return;
    }
    console.log("Anuncios por defecto cargados \n ", str);

});
