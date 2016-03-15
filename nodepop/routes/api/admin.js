"use strict";

var express = require('express');
var router = express.Router();

router.get("/", function(req, res){

	if(req.query.name){
		//recorremos todos los nombres de la DB para comprobar si coincide con alguno
	}
	if(req.query.tag){
		//recorremos todos los tags de la DB para comprobar si coincide con alguno
	}
	console.log(req.query);
	res.send("Hola express");

});

module.exports = router;