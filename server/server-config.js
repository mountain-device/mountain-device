var express = require('express');
var partials = require('express-partials');
var handler = require('./app/controllers/controller');
var util = require('./app/lib/utility');

var app = express();

// connect to MongoDB
require('./db-config');

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
});

/*
  Define all routes here
 */
app.get('/module/:module', util.checkUser, handler.dispatchModule);

app.get('/login', handler.loginForm);
app.post('/login', handler.login);
app.get('/index', handler.renderIndex);
app.get('/*', handler.loginForm);
//app.get('/*', handler.loginForm);

app.get('/modules/password', function(req, res){
  var passwordModule = require('./modules/passwordModule/auth.js');
  var html = passwordModule.setupRender();
  res.send(html);
});


module.exports = app;
