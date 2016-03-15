"use strict";

require('../models/userModel.js');
require('basic-auth-mongoose');

var basicAuth = require("basic-auth");
var mongoose = require("mongoose");
var User = mongoose.model("User");

/*    PREGUNTAR MAÑANA ( COMENTARIOS AQUÍ Y EN ANUNCIO.JS HAY 2)

var fn = function() {
    return function(req, res, next) {
        var userRequest = basicAuth(req);
        console.log(userRequest);
        User.findOne({ "nombre": userRequest.name }, function(err, rows) {
            if (err) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.sendStatus(401);
            }
            if (rows.authenticate(userRequest.pass)) {
                next();
            } else {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                return res.sendStatus(401);
            }
        });
    };
};

module.exports = fn;
*/