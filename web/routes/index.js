var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
     res.render('home', {
          authenticated: ( typeof req.session.user != "undefined" )
     });
});

router.get('/signin', function(req, res, next) {
     res.render('signin', { title: 'Signin' })
})

router.get('/signup', function(req, res, next) {
     res.render('signup/signup', { title: 'Signup' })
})

router.get('/signup/supplier', function(req, res, next) {
     res.render('signup/supplier', { title: 'Signup' })
})

router.get('/signup/consumer', function(req, res, next) {
     res.render('signup/consumer', { title: 'Signup' })
})

module.exports = router;
