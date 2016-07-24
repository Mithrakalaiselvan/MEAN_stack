var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Home' });
})
router.get('/example', function(req, res, next) {
  res.render('pages/example', { data: [
        "Alfreds Futterkiste",
        "Berglunds snabbköp",
        "Centro comercial Moctezuma",
        "Ernst Handel",
    ]});
})
router.get('/register',function(req,res,next){
	res.render('pages/register',{title:'Register'});
})
router.get('/contact',function(req,res,next){
	res.render('pages/contact',{title:'Contact'});
})
module.exports = router;
