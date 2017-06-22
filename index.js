var consts = require("./server/const/const.js")
var express = require('express');
var https = require('https');
var bodyparser = require('body-parser');
var fs = require('fs');
var app = express();
var sessionCURD = require("./server/route/sessionCURD.js")

var options = {  
  key: fs.readFileSync('keys/hostkey.pem'),  
  cert: fs.readFileSync('keys/hostcert.pem')  
};  

console.log(options)

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/createSession', sessionCURD.createSession);
app.get('/api/createToken/:sessionId', sessionCURD.createToken);

app.use('/', express.static(__dirname + '/'))
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})

// app.listen(consts.port, function() {
//     console.log("server started on port: "+consts.port);
// });

// https.createServer(options, function (req, res) {  
//  res.writeHead(200);  
//   res.end("hello world\n");  
// }).listen(3002); 

https.createServer(options, app).listen(consts.port);