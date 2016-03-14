var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", function(req, res){
	//post a http://localhost:3000/index
	console.log(req.body);
	res.send("body recogido");
});

module.exports = router;
