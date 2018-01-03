var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
     res.render('signup', { title: 'Signup' })
})

router.get('/supplier', function(req, res, next) {
     res.render('signup/supplier', { title: 'Signup' })
})

router.get('/consumer', function(req, res, next) {
     res.render('signup/consumer', { title: 'Signup' })
})

module.exports = router;
