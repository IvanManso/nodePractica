"use strict";

var express = require('express');
var router = express.Router();
var conn = require('../lib/connectMongoose');
var mongoose = require("mongoose");
var Anuncio = mongoose.model("Spot");

//router.get("/", function(req, res){ //los filtros más específicos antes de los más genéricos

//Anuncio.find({});

router.get("/:name[((a-z)|(A-Z)|(0-9))+]", function(req, res){
	if(req.params.name === undefined){
		console.log("Parámetros sin definir");
		return res.sendStatus(401);
	}
	else{
		var nombreBusq = Anuncio.find({name: req.params.name});
		console.log("El nombre de la búsqueda es", req.params.name);
		if(nombreBusq === undefined){
			console.log("El nombre de la búsqueda está sin definir");
			return res.sendStatus(404);
		}
		else{
			console.log("Se va a renderizar los objetos con el nombre de búsqueda", nombreBusq);
			res.render("vista",{spots:nombreBusq});
		}
		}
	}
});



module.exports = router;