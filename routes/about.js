/**
 * Created by JT on 12/9/2016.
 */

var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about', { title: 'About Shelters' });
});

module.exports = router;