var User = require("./../models/users");
/**
 * 位置事件
 * @type {exports}
 */
var baseService = require("./../services/baseService");

exports.handler = function (wx, msg) {
    console.log("来自 分享位置");

    var user = new User(msg.fromUserName,msg.locationX,msg.locationY);
    global.users.save(user.id,user);
    //查询餐馆
    baseService.order(msg,function(err,content){
        if(err){
            console.log(err);
        }
        else{
            wx.sendMsg(content);
        }
    });

    wx.sendMsg({});
};