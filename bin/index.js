var http = "";
var fs = "";
try {
  http = require("http");
  fs = require("fs");
}
catch (e) {
 console.log('oh no big error')
 console.log(e)
}
http.createServer(function (req, res) {
  // Read index.html file and return the content
  fs.readFile('index.html', function(err, data) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            // Send the response body as "Hello World"
            res.end('Read html file...\n');
  });

}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
