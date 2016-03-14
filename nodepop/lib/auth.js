"use strict";

var basicAuth = require("basic-auth");


var fn = function(user, pass, email) {
    return function(req, res, next) {
        var userRequest = basicAuth(req);
        console.log(user);
        if (!userRequest || userRequest.name !== user || userRequest.pass !== pass || userRequest.email !== email) { // aquí haríamos un find del identificador
            res.set("WWW-Authenticate", "Basic realm=Authorization Required"); //saca el prompt para que introduzca u y p
            res.send(401);
            return;
        }
        next(); //para dejarle seguir al usuario al haberlo verificarlo
    };
};

module.exports = fn;
