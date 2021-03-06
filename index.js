'use strict';
const express = require('express')
const app = express();
var path = require('path');
var React = require('react');
var nodemailer = require('nodemailer');
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var transporter = nodemailer.createTransport({
  service: '****',
  auth: {
    user: '****',
    pass: '***'
  }
});
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
app.get('/mail', function (req, res) {

  var getusername = req.query.name;
  var getuseremail= req.query.email;
  var mailOptions = {
    to: 'kaylaforddev@gmail.com',
    subject: getusername +' wants to contact you!',
    text: 'Hi, I would like to contact you, my email is ' + getuseremail
  };
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
});





app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT || 8000, function () {
  console.log('Local host 8000')
});
/*db.connect('mongodb://development:one@ds143707.mlab.com:43707/web_deployment', function(err){
  if (err){
    console.log('connection failed');
  }
  else{
app.listen(process.env.PORT || 8000, function () {
  console.log('Local host running on port 8000 :)');
})
}
})*/


module.exports = app;
