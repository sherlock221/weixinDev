var  urllib = require("urllib");
var Message = require("./../models/message");

var BaseService = function () {
    //餐馆列表
    this.resListUrl = "http://www.flymeal.cn/android/cloudOfCampus!loadRestaurantByLatitudeAndLongitude.action";
    //菜品
    this.dishesUrl  = "http://www.flymeal.cn/android/supplier!loadCategory.action";
    //菜品明细
    this.productUrl = "http://www.flymeal.cn/android/supplier!loadProductByCategory.action";
    //个人信息
    this.userInfo = "http://www.flymeal.cn/android/order!getOrdersByDeviceId.action?deviceId=1234567890";

    //查询餐馆信息
    this.supplierUrl = "http://www.flymeal.cn/android/cloudOfCampus!loadSupplierById.action";
    //下单
    this.subOrderUrl = "http://www.flymeal.cn/android/order!submitOrder.action";
    //列表
    this.listImg  = "/funweb/img/list-desc.jpg";
    //活动
    this.eventImg  = "/funweb/img/list-event.jpg";
};



//下单
BaseService.prototype.subOrder= function(orderStr,callBack){
    var param = {
        method : "POST",
        dataType : "json",
        data : {
            orderStr  :   orderStr
        }
    };
    urllib.request(this.subOrderUrl,param,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            callBack(err,data);
        }
    });

};


//查询餐馆信息
BaseService.prototype.getSupplier = function(_id,callBack){
    var param = {
        method : "GET",
        dataType : "json",
        data : {
            supplierId  :   _id
        }
    };
    urllib.request(this.supplierUrl,param,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            callBack(err,data);
        }
    });
};

//获得菜品明细
BaseService.prototype.getProduct = function(pageNum,pageSize,categoryId,callBack){
    var param = {
        method : "GET",
        dataType : "json",
        data : {
            pageSize  :   pageSize,
            pageNum   : pageNum,
            categoryId : categoryId
        }
    };
    //发送餐馆列表请求
    urllib.request(this.productUrl,param,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            callBack(err,data);
        }
    });

};

//获得菜品列表
BaseService.prototype.getDishes = function(_id,callBack){
    var param = {
        method : "GET",
        dataType : "json",
        data : {
            supplierId  :   _id
        }
    };
    //发送餐馆列表请求
    urllib.request(this.dishesUrl,param,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            callBack(err,data);
        }
    });

};

//获得附近餐馆
BaseService.prototype.getResList = function(latitude,longitude,callBack){
    var param = {
        method : "GET",
        dataType : "json",
        data : {
            latitude  :   latitude,
            longitude : longitude
        }
    };

    //发送餐馆列表请求
    urllib.request(this.resListUrl,param,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            callBack(err,data);
        }
    });
};

//订餐
BaseService.prototype.order = function (msg,callBack) {
    var _this = this;
    console.log("我要订餐");
    var url =  _this.resListUrl;
    console.log(msg);
   // var latitude = global.users.get(msg.fromUserName).location.latitude;
    //var longitude = global.users.get(msg.fromUserName).location.longitude;
    var latitude = "34.2523800";
    var longitude = "108.9897520";


    var data = {
        method : "GET",
        dataType : "json",
        data : {
            latitude  :   latitude,
            longitude : longitude
        }
    };
    var articles = [];
    var resMsg = {};
    //发送餐馆列表请求
    urllib.request(url,data,function(err,data,res){
        if(err){
            callBack(err);
        }
        else{
            console.log(data);
            //拼接字符
            var  supplisrs = data.suppliers;

            if(supplisrs ==  null){
                resMsg = new Message(msg,"text","您附近没有发现热点区域");
            }
            else{
                var total = supplisrs.length;
                //限制5个
                if(supplisrs.length > 5){
                    supplisrs = supplisrs.slice(0,5);
                }
                //添加标题
                articles.push({
                    title : "附近外卖(共"+total+"家)",
                    description : "",
                    picUrl : global.serverAddress+_this.listImg,
                    url : global.serverAddress+"/restaruratlistPage?latitude="+latitude+"&longitude="+longitude
                });

                console.log(articles[0].picUrl);

                //添加列表
                for(var i=0; i<supplisrs.length; i++){
                    var rest = supplisrs[i];
                    var title = rest.companyName + "\n" + "￥"+rest.deliveryLeastValue+"起送";
                    var img = rest.logoImg;
                    var url = global.serverAddress+"/dishesPage?supplierId="+rest.id+"&supplierName="+rest.companyName+"&deliveryLeastValue="+rest.deliveryLeastValue+"&deviceId="+rest.deviceId+"&deliveryCharge="+rest.deliveryCharge;
                    console.log(url);

                    articles.push({
                        title : title,
                        description : "",
                        picUrl : img,
                        url : url
                    });
                };

                resMsg = new Message(msg,"news",articles);
            }

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
