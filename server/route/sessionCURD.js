var consts = require("../const/const.js")
var OpenTok = require('opentok'),
    opentok = new OpenTok(consts.APIKEY, consts.APISECRET);

var SESSIONID;
var TOKEN;
var SESSION;

module.exports = {
    //Create Session
    createSession: function (req, res) {
        if(SESSION != null && SESSIONID != undefined) {
            console.log("Session Started")
            res.send({ status: true, SESSION });
        } else {
            console.log("Session Started")
            opentok.createSession({ mediaMode: 'routed', archiveMode: 'always' }, function (err, session) {
                if (err) return console.log(err);
                SESSION = session;
                SESSIONID = session.sessionId;
                res.send({ status: true, SESSION });
            });
        }
    },

    //Create Token
    createToken: function (req, res) {
        token = opentok.generateToken(req.params.sessionId);
        // token = session.generateToken();
        // TOKEN = SESSION.generateToken({
        //     role: 'moderator',
        //     expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in one week
        //     data: 'name=Johnny'
        // });
        console.log("Token Created")
        res.send({ status: true, token });
    }
};