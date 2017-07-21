var consts = require("./server/const/const.js")
var express = require('express');
var https = require('https');
var bodyparser = require('body-parser');
var fs = require('fs');
log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/server.log', category: 'index.js' },
    { type: 'file', filename: 'logs/server.log', category: 'sessionCURD.js' }
  ]
});
var logger = log4js.getLogger('index.js');
var app = express();
var sessionCURD = require("./server/route/sessionCURD.js")

var options = {  
  key: fs.readFileSync('keys/hostkey.pem'),  
  cert: fs.readFileSync('keys/hostcert.pem')  
};

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/api/createSession', sessionCURD.createSession);
app.get('/api/createToken/:sessionId', sessionCURD.createToken);

app.use('/', express.static(__dirname + '/'))
app.get('*', function (req, res) {
   res.sendFile( __dirname + "/index.html");
})

//For removing /#/ from URL
// app.get('/', function (req, res) {
//    res.sendFile( __dirname + "/index.html");
// })

//For Heroku Deployment
// app.listen(consts.port, function() {
//     console.log("server started on port: "+consts.port);
// });

//For Local
https.createServer(options, app).listen(consts.port);
logger.debug("server started on port: "+consts.port);

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');