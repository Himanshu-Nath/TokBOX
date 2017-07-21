var consts = require("../const/const.js")
var OpenTok = require('opentok'),
    opentok = new OpenTok(consts.APIKEY, consts.APISECRET);

var logger = log4js.getLogger('sessionCURD.js');

var SESSIONID;
var TOKEN;
var SESSION;
var userId = 0;

module.exports = {
    //Create Session
    createSession: function (req, res) {
        if(SESSION != null && SESSIONID != undefined) {
            logger.debug("Session Get")
            res.send({ status: true, SESSION });
        } else {
            logger.info("Session Created");
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
        userId++;
        token = opentok.generateToken(req.params.sessionId, {
            role: 'moderator',
            expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in one week
            data: 'userId='+userId
        });
        // token = session.generateToken();
        // TOKEN = SESSION.generateToken({
        //     role: 'moderator',
        //     expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60), // in one week
        //     data: 'name=Johnny'
        // });
        logger.debug("Token Created")
        res.send({ status: true, token });
    }
};