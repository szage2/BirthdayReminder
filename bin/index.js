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

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log('Server running at http://'+host+':'+port);
});
