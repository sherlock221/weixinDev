var  urllib = require("urllib");

var BaseService = function () {
    //餐馆列表
    this.resListUrl = "http://www.flymeal.cn/android/cloudOfCampus!loadSupplierByPguid.action?pguid=FLYSHANKE";
    //餐馆
    this.resUrl  = "http://www.flymeal.cn/android/supplier!loadProductByCategory.action?pageSize=1000&pageNum=0&categoryId=9635";
};

//订餐
BaseService.prototype.order = function (msg,callBack) {
    console.log("我要订餐");
    var url =  this.resListUrl;
    var data = {
        method : "GET",
        dataType : "json"
    };
    var articles = [];
    var resMsg = {};

    //发送餐馆列表请求
    urllib.request(url,data,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            //拼接字符
            var  supplisrs = data.suppliers;
            //限制10个
            if(supplisrs.length > 5){
                supplisrs = supplisrs.slice(0,5);
            }

            for(var i=0; i<supplisrs.length; i++){
                var rest = supplisrs[i];
                articles.push({
                    title : rest.companyName,
                    description : rest.description,
                    picUrl : res.logoImg,
                    url : ""
                });
            };
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            };
            callBack(err,resMsg);
        }
    });
};
//下载
BaseService.prototype.dowload = function () {
    console.log("下载");
};
//位置反馈
BaseService.prototype.location = function () {
    console.log("我的位置");
};

module.exports = new BaseService();