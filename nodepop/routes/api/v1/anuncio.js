var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");



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