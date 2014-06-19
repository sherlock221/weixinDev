//log
var log = require("./../log").logger("indexRouter");
var crypto=require("crypto");

//进入登录页面
exports.verify = function(req,res,next){
    log.info("进入测试...");
    console.log("进入测试");
    //微信加密签名
    var signature = req.query.signature;
    //时间戳
    var timestamp = req.query.timestamp;
    //随机数
    var nonce = req.query.nonce;
    //随机字符串
    var echostr = req.query.echostr;

    //token
    var token = "daohao1914";

    //加密校验
    var array = [token,timestamp,nonce];
    //字典排序
    array.sort();
    var temp = array.join("");

    var hasher=crypto.createHash("sha1").update(temp);
    var msg=hasher.digest('hex');//计算SHA1值

    if(msg == signature){
        console.log("验证成功!");
        res.json(echostr);
    }
    else{
        res.json("error");
    }


};




