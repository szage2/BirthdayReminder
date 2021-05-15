var http = require("http");
var fs = require("fs");
//var express = require('express');
//var app = express();

http.createServer(function (req, res) {
  // Read index.html file and return the content
  fs.readFile('index.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });

  fs.readFile('style/index.css', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(data);
    res.end();
  });

}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

//app.use('/style',express.static(__dirname + '/style'));
