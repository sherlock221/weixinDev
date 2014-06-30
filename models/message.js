var Message   =  function(msg,key,value){

    var temp = {
        fromUserName  : msg.toUserName,
        toUserName : msg.fromUserName,
        msgType  :  key  || "news",
        articles :  value,
        funcFlag :  0
    };

    if(key == "news"){
        temp.articles = value;
    }
    else if(key== "text"){
        temp.content = value;
    }

    return temp;
};

module.exports = Message;