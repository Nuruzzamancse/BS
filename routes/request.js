var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('studentRequest', { title: 'Express' });
});

module.exports = router;