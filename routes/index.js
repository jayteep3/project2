var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'One Good Home' });
});

router.get('/diagram', function(req, res, next) {
  res.render('diagram', { title: 'Shelter Diagram' });
});

router.get('/relationalSchema', function(req, res, next) {
  res.render('relationalSchema', { title: 'Shelter Schema' });
});
module.exports = router;
