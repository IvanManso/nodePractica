var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var auth = require("../../../lib/auth"); //nos traemos el módulo auth.js para que nos los traiga y usarlo donde quiera
var passwordHash = require('password-hash');
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
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/form', function(req, res, next){
	var Anuncio = mongoose.model("Spot");
	Anuncio.list({}, function(err, rows){
		res.render("vista",{spots:rows});
	});
});

//user.getUsers(function(err,users){

//});
module.exports = router;