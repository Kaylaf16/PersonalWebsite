// requiring express for our application
const express = require('express')
const app = express()
 // '/' basically is the localhost:8000 endpoint we're going to on our website
 // it returns a json object that says testing, we'll change this later
 // this is a controller <-- key term
app.get('/', function (req, res) {
  res.json('Testing 1')
})
/*notice the endpoint to the controller changed. To see this
go to localhost:8000/test2 */
app.get('/test2',function(req,res){
  res.json('Testing 2')
})
/* app.set and ejs is basically allowing us to direct any files that
are under the public folder to be displayed. files with the extension .ejs
will be displayed specifically.
*/
app.set('view engine','ejs');

// referencing the public folder
app.use(express.static("public"));

// 8000 is the port number and we're console logging local host to our terminal for feedback
app.listen(8000, function () {
  console.log('Local host 8000')
})

// just boring exporting stuff :)
module.exports = app;


/*if you look into the package.json file you'll see "start": "nodemon index.js"
 this means when we specify npm start the application will load up this file.
 nodemon basically allows you to make updates to the file without restarting the server.
 Try making changes and saving the file and looking at the terminal, you'll see what i mean*/
