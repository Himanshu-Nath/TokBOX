var consts = require("./server/const/const.js")
var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var sessionCURD = require("./server/route/sessionCURD.js")

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/createSession', sessionCURD.createSession);
app.get('/api/createToken/:sessionId', sessionCURD.createToken);

app.use('/', express.static(__dirname + '/'))
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})

app.listen(consts.port, function() {
    console.log("server started on port: "+consts.port);
});