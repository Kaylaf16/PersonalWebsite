
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.render('index');
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(8000, function () {
  console.log('Local host 8000')
})


module.exports = app;
