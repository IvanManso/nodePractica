"use strict";

//creamos un modelo
var express = require('express');
var router = express.Router();
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

router.post("/", function(req, res){
    var user = new User(req.body);
    user.save(function(err, rows){
         if (err) {
            return res.json({result:false, err:err});
        }
        else{
            return res.json({result:true, rows:rows});
        }
    });
});

router.delete("/", function(req, res){
    User.remove(function(err){
          if (err) {
            return res.json({result:false, err:err});
        }
        else{
            return res.json({result:true, rows:""});
        }
    });
});

//Lo registro en mongoose
usuarioSchema.plugin(require('basic-auth-mongoose'));
var User = mongoose.model("User", usuarioSchema);
