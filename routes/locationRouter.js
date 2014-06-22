var User = require("./../models/users");
/**
 * 位置事件
 * @type {exports}
 */
var baseService = require("./../services/baseService");

exports.handler = function (wx, msg) {
    console.log("来自 分享位置");

    var user = new User(msg.fromUserName,msg.latitude,msg.longitude,msg.precision);
    global.users.save(user.id,user);
    console.log(user);
    baseService.location();

    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: "music",
        title: "音乐标题",
        description: "音乐描述",
        musicUrl: "音乐url",
        HQMusicUrl: "高质量音乐url",
        funcFlag: 0
    };

    wx.sendMsg(resMsg);
};