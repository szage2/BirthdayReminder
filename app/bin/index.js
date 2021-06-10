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

  // Passing date to html file
  res.render(path.join(__dirname, "public/ejs/index.ejs"), {datetime:datetime});

  /*fs.readFile('index.html', function(err, data) {

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
    console.log(2);
    // Perform a query
    $query = 'SELECT * from main LIMIT 10';

    connection.query($query, function(err, rows, fields) {
        if(err){
            console.log("An error occurred performing the query.");
            return;
        }

        console.log("Query succesfully executed: ", rows);
    });
    console.log("3");
    // Close the connection
    connection.end(function(){
        // The connection has been closed
    });
    console.log("4");

    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log("5");
    res.write(data);
    res.end();
  });*/
});

app.get('public/style/index.css', function(req, res) {
  fs.readFile('public/style/index.css', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
    console.log("css file is loaded");
  });
});

app.get('/events', function (req, res) {
  res.sendFile('events.html', { root: __dirname });
  /*fs.readFile('events.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/
});

app.get('public/style/events.css', function(req, res) {
  fs.readFile('public/style/events.css', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
    console.log("css file is loaded");
  });
});

app.get('/settings', function (req, res) {
  res.sendFile('settings.html', { root: __dirname });
  /*fs.readFile('settings.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });*/
});

app.get('public//style/settings.css', function(req, res) {
  fs.readFile('public/style/settings.css', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
    console.log("css file is loaded");
  });
});

app.use('/public', express.static('public'));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log('Server running at '+host+':'+port);
});
