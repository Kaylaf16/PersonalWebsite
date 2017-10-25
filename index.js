'use strict';
const express = require('express')
const app = express();
var path = require('path');
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({layoutsDir: path.join(__dirname, "views/layout"),
  partialsDir: path.join(__dirname, "views/partials"),
  defaultLayout: 'index',
  extname: 'handlebars'}));
 app.set('view engine', 'handlebars');
app.get('/', function (req, res) {

  res.render('layout/index');
})

app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8000, function () {
  console.log('Local host 8000')
})


module.exports = app;
