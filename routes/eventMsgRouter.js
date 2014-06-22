var baseService = require("./../services/baseService");
var User = require("./../models/users");
/*
 * 事件推送
 * @type {exports}
 */
exports.handler = function(wx,msg){
    if(msg.event == "LOCATION"){
        console.log("来自 上报位置");
        var user = new User(msg.fromUserName,msg.latitude,msg.longitude,msg.precision);
        global.users.save(user.id,user);
        console.log(user);
        baseService.location();
    }
    else if(msg.event == "CLICK"){
        switch(msg.eventKey){
            case  "V_ORDER" :
                baseService.order();
                break;
            case  "V_LAST" :
                baseService.dowload();
                break;
            default :
                break;
        }
    }
    wx.sendMsg({});
};






