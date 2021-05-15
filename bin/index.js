var express = require('express');
var fs = require("fs");
var app = express();

app.get('/', function (req, res) {
  fs.readFile('index.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
    console.log('Server running at http://127.0.0.1:8081/');
  });
});

app.get('/style/index.css', function(req, res) {
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
