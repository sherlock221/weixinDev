/**
 * 文本事件
 * @type {exports}
 */


var  Text = {

      //默认文本
      defaults : "分享位置即可查看附近外卖并进行订餐",
      //查看目前在线用户数量
      getUsers : function(){
            var length = global.users.size();
            return "当前在线用户数量 : " + length;
      }
};



exports.handler =function(wx,msg){
    console.log("文本事件",JSON.stringify(msg));
    //默认文本
    switch (msg.content){
        case   '12908':
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : Text.getUsers(),
                funcFlag : 0
            };
            break;

        default :
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : Text.defaults,
                funcFlag : 0
            };
            break;
    }
    wx.sendMsg(resMsg);
};
