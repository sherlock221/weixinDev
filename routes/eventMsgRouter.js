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
        baseService.location(msg,function(err,content){
            wx.sendMsg(content);
        });
    }

    else if(msg.event == "subscribe"){
        baseService.subscribe(msg,function(err,content){
            wx.sendMsg(content);
        });
    }
    else if(msg.event == "unsubscribe"){
        baseService.unsubscribe(msg,function(err,content){
            wx.sendMsg(content);
        });
    }
    else if(msg.event == "CLICK"){
        switch(msg.eventKey){
            case  "V_ORDER" :
                baseService.order(msg,function(err,content){
                    if(err){
                        console.error(err);
                        wx.sendMsg("service error");
                    }
                    else{
                        wx.sendMsg(content);
                    }
                });
                break;
            case  "V_MY" :
                baseService.myOrder(msg,function(err,content){
                    if(err){
                        console.error(err);
                        wx.sendMsg("service error");
                    }
                    else{
                        wx.sendMsg(content);
                    }
                });
                break;
            case  "V_EVENT" :
                baseService.lbsEvent(msg,function(err,content){
                    if(err){
                        console.error(err);
                        wx.sendMsg("service error");
                    }
                    else{
                        wx.sendMsg(content);
                    }
                });
                break;
            default :
                wx.sendMsg("");
                break;
        }
    }

};






