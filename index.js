'use strict';
const express = require('express')
const app = express();
var path = require('path');
var React = require('react');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({layoutsDir: path.join(__dirname, "views/layout"),
  partialsDir: path.join(__dirname, "views/partials"),
  extname: 'handlebars'}));
 app.set('view engine', 'handlebars');
app.get('/', function (req, res) {

  res.render('layout/index');
});
app.get('/about', function (req, res) {

  res.render('layout/about');
});
app.get('/contact', function (req, res) {

  res.render('layout/contact');
});
app.get('/test', function (req, res) {

  res.sendfile('public/UserHome.html');
});





app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8000, function () {
  console.log('Local host 8000')
});


module.exports = app;
