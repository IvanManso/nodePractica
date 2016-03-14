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

var User = mongoose.model("User", usuarioSchema);




/*var user = {
	getUsers: function(cb){
		//imaginamos que lee un fichero

		conn.db.collection('agentes').find({}).toArray(function(err, usuariosLeidos) {
		if (err){
			cb(err); //añadir siempre un return cuando tenemos un callback metido en una condición, ya que debe terminar la función
			return;
		}
			cb(null, usuariosLeidos);
			return; //para marcar al finalización de la función
		});


		//Con mongoose
		var User = mongoose.model("User");

		User.find({}, function(err, datos){
			if (err){
				cb(error);
				return;
			}
			cb(null, datos);
			return;
		});

	}

};*/

//module.exports = User;
