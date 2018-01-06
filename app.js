     /* Modules */

var express = require('express'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon'),
    flash = require('connect-flash'),
    index = require('./web/routes/index'),
    logger = require('morgan'),
    session = require('express-session'),
    path = require('path'),
    User = require('./models/user.js');

var app = express();


     /* Environment variables */

const ev = process.env;
const ENV = ev.ENV,
      HOST = ev.HOST,
      PORT = ev.PORT,
      DBNAME = ev.DBNAME,
      DBUSER = ev.DBUSER
      DBPASS = ev.DBPASS,
      SECRET = ev.SECRET; // <- Used for salting, cookies, etc


      /* View engine config */

app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'pug');


     /* Middleware config */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(flash())
app.use(logger('dev'));
app.use('scripts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));


     /* Session management */

var options = {
     resave: false,
     saveUninitialized: false,
     secret: SECRET
};

var clearIfLoggedOut = (req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
};


var checkSession = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }
};

app.use(session(options));


     /* Routing */

app.use('/', index);


     /* Signup */

const success = JSON.stringify({ 'success': '/' }),
      error = JSON.stringify({ 'error': '/' });

app.use('/users/new', function(req, res, next) {
     res.setHeader('Content-Type', 'application/json');
     User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          type: req.params.type
     }).then(
          user => {
               req.session.user = user.dataValues;
               res.send(success);
          }
     ).catch(
          error => {
               res.send(error);
          }
     )
});

app.post('/auth', function(req, res) {
     User.findOne({ where: { email: req.body.email } }).then(function (user) {
          console.log("PASSWORDIS " +req.body.password)
          if (!user || !user.checkPass(req.body.password) ) {
               console.log("failed to validate pass2")
               res.setHeader('Content-Type', 'application/json');
               res.send(error);
          } else {
               console.log("validated pass")
               req.session.user = user;
               res.send(success);
          }
     });
});


/* Error handling */

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('partials/error');
});

module.exports = app;
