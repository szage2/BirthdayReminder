var express = require('express');
var fs = require("fs");
var path = require('path');
let ejs = require('ejs');

var app = express();
// Get the mysql service
var mysql = require('mysql');
// Get environmental variable
var bdrhost = process.env.bdr_host;
var bdruser = process.env.bdr_user;
var bdrpsw = process.env.bdr_pass;

app.disable("x-powered-by");
app.set('view engine', 'ejs');

// Get date
var datetime = new Date();
// Get day of the week
// Sunday - Saturday : 0 - 6
var dayoftheweek = datetime.getDay();

app.get('/', function (req, res) {
  // Adding credentials to access database
  var connection = mysql.createConnection({
      host     : bdrhost,
      user     : bdruser,
      password : bdrpsw,
      database : 'birthdayreminder'
  });

  // connect to mysql
  connection.connect(function(err) {
      // in case of error
      if(err){
          console.log(err.code);
          console.log(err.fatal);
      }
  });

  // Perform a query
  $query = 'SELECT * from main LIMIT 10';

  connection.query($query, function(err, rows, fields) {
      if(err){
          console.log("An error occurred performing the query.");
          return;
      }

      // DB Connection works
      console.log("The database connection works: " + rows);

  });
  // Close the connection
  connection.end(function(){
  // The connection has been closed
  });

  // Passing datetime to html file
  res.render(path.join(__dirname, "public/ejs/index.ejs"), {dbData:datetime});

});

app.get('/events', function (req, res) {
  res.sendFile('events.html', { root: __dirname });
});

app.get('/settings', function (req, res) {
  res.sendFile('settings.html', { root: __dirname });
});

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log('Server running at '+host+':'+port);
});
