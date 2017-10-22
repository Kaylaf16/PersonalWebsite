const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.json('Testing')
})

app.set('view engine','ejs');
app.use(express.static("public"));

app.listen(8000, function () {
  console.log('Local host 8000')
})
module.exports = app;
