/**
 * MD5 加密
 * sherlock 10:11
 */

//引入加密模块
var crypto = require('crypto');


var  MD5 = {
    base64 : function(content){
        return crypto.createHash("md5").update(content).digest("base64");
    }
};

module.exports = MD5;
