var urllib = require("urllib");
var Message = require("./../models/message");

//var  BaseURL = "http://15328.vicp.cc";
var  BaseURL = "http://15328.vicp.cc";

var BaseService = function () {
    //餐馆列表
    // this.resListUrl = "http://www.flymeal.cn/android/cloudOfCampus!loadRestaurantByLatitudeAndLongitude.action";
    this.resListUrl = BaseURL+"/mvc/api/mobile/customer/supplier/";
    //菜品
    this.dishesUrl = BaseURL+"/android/supplier!loadCategory.action";
    //菜品明细
    this.productUrl = BaseURL+"/android/supplier!loadProductByCategory.action";
    //个人信息
    this.userInfo = BaseURL+"android/order!getOrdersByDeviceId.action?deviceId=1234567890";

    //查询餐馆信息
    this.supplierUrl = BaseURL+"/android/cloudOfCampus!loadSupplierById.action";

    //餐馆热门活动
    this.eventUrl =  BaseURL+"/mvc/api/mobile/customer/supplier/promotional";
    //下单pic
    this.subOrderUrl = BaseURL+"/android/order!submitOrder.action";

    this.getOrderUrl = BaseURL+"/android/order!getOrdersByDeviceId.action";
    //列表pic
    this.listImg = "/funweb/img/list-desc.jpg";
    //活动
    this.eventImg = "/funweb/img/list-event.jpg";

    this.defaultLogo = "/funweb/img/shangjia.png";
};


//latitude=34.2523800&longitude=108.9897520


BaseService.prototype.myOrder = function(msg,callBack){
    var resMsg="";
    var articles = [];
    articles.push({
        title: "点击查看我的订单",
        description: "",
        picUrl: "",
        url: global.serverAddress + "/orderPage?openId="+msg.fromUserName
    })
    resMsg = new Message(msg, "news", articles);
    callBack("",resMsg);
};

BaseService.prototype.getOrder = function (openId,callBack) {
    var param = {
        method: "GET",
        dataType: "json",
        data: {
            deviceId: openId
        }
    };
    urllib.request(this.getOrderUrl, param, function (err, data, res) {
        if (err) {
            callBack(err);
        }
        else {
            callBack(err, data);
        }
    });
};
/**
 *
 * @param orderStr
 * @param callBack
 */
BaseService.prototype.subOrder = function (orderStr, callBack) {
    var param = {
        method: "POST",
        dataType: "json",
        data: {
            orderStr: orderStr
        }
    };
    urllib.request(this.subOrderUrl, param, function (err, data, res) {
        if (err) {
            callBack(err);
        }
        else {
            callBack(err, data);
        }
    });

};


/**
 * 查询餐馆信息
 * @param _id
 * @param callBack
 */
BaseService.prototype.getSupplier = function (_id, callBack) {
    var param = {
        method: "GET",
        dataType: "json",
        data: {
            supplierId: _id
        }
    };
    urllib.request(this.supplierUrl, param, function (err, data, res) {
        if (err) {
            callBack(err);
        }
        else {
            callBack(err, data);
        }
    });
};

/**
 * 菜品明细
 * @param pageNum
 * @param pageSize
 * @param categoryId
 * @param callBack
 */
BaseService.prototype.getProduct = function (pageNum, pageSize, categoryId, callBack) {
    var param = {
        method: "GET",
       dataType: "json",
        data: {
            pageSize: pageSize,
            pageNum: pageNum,
            categoryId: categoryId
        }
    };
    //发送餐馆列表请求
    urllib.request(this.productUrl, param, function (err, data, res) {
        if (err) {
            callBack(err);
        }
        else {
            callBack(err, data);
        }
    });

};

/**
 * 获得菜品列表
 * @param _id
 * @param callBack
 */
BaseService.prototype.getDishes = function (_id, callBack) {
    var param = {
        method: "GET",
        dataType: "json",
        data: {
            supplierId: _id
        }
    };
    //发送餐馆列表请求
    urllib.request(this.dishesUrl, param, function (err, data, res) {
        if (err) {
            callBack(err);
        }
        else {
            callBack(err, data);
        }
    });

};

/**
 * 订阅
 * @param msg
 * @param url
 * @param callBack
 */
BaseService.prototype.subscribe = function (msg, callBack) {
    var resMsg = new Message(msg, "text", "欢迎关注飞饭，分享位置或者发送位置信息，查看周围餐馆并进行订餐。");
    callBack("", resMsg);
};

/**
 * 取消订阅
 * @param msg
 * @param url
 * @param callBack
 */
BaseService.prototype.unsubscribe = function (msg, callBack) {
    var resMsg = new Message(msg, "text", "");
    callBack("", resMsg);
};
/**
 * 位置
 * @param msg
 * @param callBack
 */
BaseService.prototype.location = function (msg, callBack) {
    var resMsg = new Message(msg, "text", "");
    callBack("", resMsg);
};

/**
 * 获得餐馆
 * @param latitude
 * @param longitude
 * @param callBack
 */
BaseService.prototype.getResList = function (msg, url, callBack) {
    var user = global.users.get(msg.fromUserName);
    var resMsg
    //no gps
    if (!user || !user.location) {
        resMsg = new Message(msg, "text", "亲您的GPS没有打开哦，您可以尝试以下操作：\n1. 进入手机设置，打开GPS开关，点击当前页面右上角的“详细资料”按钮，打开“提供位置信息”的开关。 \n2. 点击左侧底部小键盘按钮，发送您的位置信息。");
        resMsg.code = "nogps";
        callBack("", resMsg);


    }
    else{

    var location = user.location;
   var latitude = location.latitude;
    var longitude = location.longitude;

    //var latitude = "34.2523800";
    //var longitude = "108.9897520";

    var param = {
        method: "GET",
        dataType: "json",
        data: {
            latitude: latitude,
            longitude: longitude
        }

    };
    //default
    param.data.taste = -1,
        param.data.sort = -1,
        param.data.pageSize = 9999,
        param.data.pageNum = 1,

        //发送餐馆列表请求
        urllib.request(url, param, function (err, data, res) {
            if (err) {
                callBack(err);
            }
            else {
                //关联经纬度
                data.location = {
                    latitude: latitude,
                    longitude: longitude
                };
                callBack(err, data);
            }
        });

    }
  };

/**
 * 根据经纬度查询餐馆列表
 * @param latitude
 * @param longitude
 * @param callBack
 */
BaseService.prototype.findResBylaAndLo = function (latitude, longitude, promotional, callBack) {
    var param = {
        method: "GET",
        dataType: "json",
        data: {
            latitude: latitude,
            longitude: longitude

        }
    };
    if (promotional != 'undefined') {
        param.data.promotional = promotional;
    }
    //default
    param.data.taste = -1,
        param.data.sort = -1,
        param.data.pageSize = 9999,
        param.data.pageNum = 1,


        //发送餐馆列表请求
        urllib.request(this.resListUrl, param, function (err, data, res) {
            if (err) {
                callBack(err);
            }
            else {
                //关联经纬度
                data.location = {
                    latitude: latitude,
                    longitude: longitude
                };
                callBack(err, data);
            }
        });
};

/**
 * 周边活动餐馆
 * @param msg
 * @param callBack
 */
BaseService.prototype.lbsEvent = function (msg, callBack) {
    var _this = this;
    var articles = [];
    var resMsg = {};
    console.log("周边活动");

    this.getResList(msg, this.eventUrl, function (err, result) {
        if (err) {
            callBack(err);
        }
        else {
            //未开启gps
            if (result.code == "nogps") {
                resMsg = data;
            }
            //附近没有
            else if (result.data == null) {
                resMsg = new Message(msg, "text", "亲，您所在的区域当前暂无促销活动!");
            }
            //封装餐馆
            else {
                var supplisrs = result.data;
                var total = supplisrs.length;
                var location = result.location;
                //限制5个
                if (supplisrs.length > 5) {
                    supplisrs = supplisrs.slice(0, 5);
                }
                //添加标题
                articles.push({
                    title: "共" + total + "场活动",
                    description: "",
                    picUrl: global.serverAddress + _this.eventImg,
                    url: ""
                })

                //添加列表
                for (var i = 0; i < supplisrs.length; i++) {
                    var rest = supplisrs[i];
                    var title = rest.name;
                    var img = rest.icon;
                    var promotional = rest.name;
                    var dishUrl = global.serverAddress + "/restaruratlistPage?latitude=" + location.latitude + "&longitude=" + location.longitude + "&promotional=" + encodeURI(promotional)+"&openId="+msg.fromUserName;
                    //console.log(dishUrl);

                    articles.push({
                        title: title + "(共" + rest.countSupplier + "家餐馆)",
                        description: "",
                        picUrl: img,
                        url: dishUrl
                    });
                }
                ;

                resMsg = new Message(msg, "news", articles);
            }

            callBack(err, resMsg);
        }
    });

};

/**
 * 我要订餐
 * @param msg
 * @param callBack
 */
BaseService.prototype.order = function (msg, callBack) {
    var _this = this;
    var articles = [];
    var resMsg = {};

    console.log("我要订餐");

    this.getResList(msg, this.resListUrl, function (err, result) {
        if (err) {
            callBack(err);
        }

        else {
            //未开启gps
            if (result.code == "nogps") {
                resMsg = result;
            }
            //服务器异常
            else if(result.status == "error"){
                resMsg = new Message(msg, "text", "服务器出现点小问题,请耐心等待或重试！");
                resMsg.code = "error";
            }
            //附近没有
            else if (result.data.suppliers.length <=0) {
                resMsg = new Message(msg, "text", "对不起，您附近没有外卖餐厅! 飞饭仔正在努力覆盖中。");
            }
            //封装餐馆
            else {
                var supplisrs = result.data.suppliers;
                var total = supplisrs.length;
                var location = result.location;
                //限制5个
                if (supplisrs.length > 5) {
                    supplisrs = supplisrs.slice(0, 5);
                }
                //添加标题
                articles.push({
                    title: "附近外卖(共" + total + "家)",
                    description: "",
                    picUrl: global.serverAddress + _this.listImg,
                    url: global.serverAddress + "/restaruratlistPage?latitude=" + location.latitude + "&longitude=" + location.longitude+"&openId="+msg.fromUserName
                })
                // console.log(global.serverAddress + "/restaruratlistPage?latitude=" + location.latitude + "&longitude=" + location.longitude+"&openId="+msg.fromUserName);

                  //console.log(global.serverAddress + _this.listImg);

                //添加列表
                for (var i = 0; i < supplisrs.length; i++) {
                    var rest = supplisrs[i];
                    var title = rest.companyName + "\n" + "￥" + rest.deliveryLeastValue + "起送"+"   预计" + rest.deliveryTime+"分钟送达";
                    var images="";
                    if(!rest.supplierImageUrl){
                        images = global.serverAddress+_this.defaultLogo;
                    }
                    else{
                        images = rest.supplierImageUrl;
                    }
                    var dishUrl = global.serverAddress + "/dishesPage?supplierId=" + rest.id + "&supplierName=" + encodeURI(rest.companyName) + "&deliveryLeastValue=" + rest.deliveryLeastValue + "&deviceId=" + rest.deviceId + "&deliveryCharge=" + rest.deliveryCharge+"&openId="+msg.fromUserName;
                    //console.log(dishUrl);
                    articles.push({
                        title: title,
                        description: "",
                        picUrl: images,
                        url: dishUrl
                    });
                }
                ;

                resMsg = new Message(msg, "news", articles);
            }

            callBack(err, resMsg);
        }
    });


};


module.exports = new BaseService();
