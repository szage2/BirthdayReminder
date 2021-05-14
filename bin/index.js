var http = require("http");

http.createServer(function (request, response) {
  // Read index.html file and return the content
  fs.readFile('index.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
            response.writeHead(200, {'Content-Type': 'text/plain'});
            // Send the response body as "Hello World"
            response.end('Read html file...\n');
  });

}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
