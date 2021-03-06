//log
var log = require("./../log").logger("router");
var weixin = require('weixin-api');

/**
 * 路由
 * @type {exports}
 */
var locationRouter = require("./locationRouter");
var textMsgRouter = require("./textMsgRouter");
var imgMsgRouter = require("./imgMsgRouter");
var urlMsgRouter = require("./urlMsgRouter");
var eventMsgRouter = require("./eventMsgRouter");
var menuRouter    = require("./memuRouter");
var Result = require("./result/result");
var AdminRouter = require("./adminRouter");
var FunwebRouter = require("./funwebRouter");

//微信配置
weixin.token = "sherlock221b";
weixin.appid = "wx6699bd54f2939d30";
weixin.appsecret = "a4fb4de2d7353ef5d5d59d582388bca3";


var apiWx = new weixin.API(weixin.appid,weixin.appsecret);

//转发
module.exports.use = function(app){
    //验证身份
    app.get('/', function(req, res) {
        console.log("进入签名");
        // 签名成功
        if (weixin.checkSignature(req)) {
            res.send(200, req.query.echostr);
        } else {
            res.send(200, 'fail');
        }
    });

    //监听文本消息
    weixin.textMsg(function(msg){
        textMsgRouter.handler(weixin,msg);
    });

    // 监听图片消息
    weixin.imageMsg(function(msg) {
        imgMsgRouter.handler(weixin,msg);
    });

    //监听位置消息
    weixin.locationMsg(function(msg){
        locationRouter.handler(weixin,msg);
    });

    //监听链接消息
    weixin.urlMsg(function(msg) {
        urlMsgRouter.handler(weixin,msg);
    });

    //监听事件消息
    weixin.eventMsg(function(msg) {
        eventMsgRouter.handler(weixin,msg);
    });

    //监听微信post
    app.post('/', function(req, res) {
        var  param = req.query.id;
        console.log(param);
        // loop
        weixin.loop(req, res);
    });

    //飞饭业务
    new FunwebRouter(app,weixin,apiWx);
    //后台部分
    new  AdminRouter(app,weixin,apiWx);
};

