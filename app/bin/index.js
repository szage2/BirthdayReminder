var express = require('express');
var fs = require("fs");
const path = require('path');

const router = express.Router();

var app = express();
// Get the mysql service
var mysql = require('mysql');
// Get environmental variable
var bdrhost = process.env.bdr_host;
var bdruser = process.env.bdr_user;
var bdrpsw = process.env.bdr_pass;

app.disable("x-powered-by");

// Get date
var datetime = new Date();
    console.log(datetime);
// Get day of the week
// Sunday - Saturday : 0 - 6
var dayoftheweek = datetime.getDay();
console.log(dayoftheweek);

app.get('/', function (req, res) {

  // Passing date to html file
  res.render("index", {datetime:datetime});

  fs.readFile('index.html', function(err, data) {

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
  });
});

app.get('/style', function(req, res) {
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
  fs.readFile('events.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.get('/style', function(req, res) {
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
  fs.readFile('settings.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

app.get('/style', function(req, res) {
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
