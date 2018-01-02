var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
     res.render('signin', { title: 'Signin' })
})

module.exports = router;
