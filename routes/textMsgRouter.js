/**
 * 文本事件
 * @type {exports}
 */

exports.handler =function(wx,msg){
    console.log("文本事件",JSON.stringify(msg));

    //默认文本
      var resMsg = {
        fromUserName : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType : "text",
        content : "您在说什么 我不太明白!",
        funcFlag : 0
    };

    switch (msg.content){
        case   '文本':
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是文本回复",
                funcFlag : 0
            };
            break;
        case    '音乐':
            // 返回音乐消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "音乐标题",
                description : "音乐描述",
                musicUrl : "音乐url",
                HQMusicUrl : "高质量音乐url",
                funcFlag : 0
            };
            break;
    }
    wx.sendMsg(resMsg);
};