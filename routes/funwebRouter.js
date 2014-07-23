var Result = require("./result/result");
var baseService = require("./../services/baseService");
var FunwebRouter = function(app,weixin,apiWx){

    //测试接口
    app.get("/test",function(){
        baseService.order("dd",function(){
        });
    });

    //下单
    app.post("/order",function(req,res,next){
        var orderStr =  req.body.orderStr;
        console.log(orderStr);
        baseService.subOrder(orderStr,function(err,data){
            if(err){
                next(err);
            }
            else{
                res.json(data);
            }
        });
    });

    //success
    app.get("/success",function(req,res){
        res.render("funweb/success");
    });

    //获得订单页面
    app.get("/orderInfoPage",function(req,res){

        res.render("funweb/orderInfo");
    });

    //获得餐馆信息
    app.get("/supplier",function(req,res,next){
        var _id = req.query.supplierId;
        baseService.getSupplier(_id,function(err,data){
            if(err){
                next(err);
            }
            else{
                res.json(data);
            }
        });
    });

    //获得菜品详细
    app.get("/product",function(req,res,next){
        var pageSize = req.query.pageSize;
        var pageNum = req.query.pageNum;
        var categoryId = req.query.categoryId;
        baseService.getProduct(pageNum,pageSize,categoryId,function(err,data){
            if(err){
                next(err);
            }
            else{
                //console.log(data);
                res.json(data);
            }
        });
    });

    //获菜品页面
    app.get("/dishesPage",function(req,res){
        var supplierId = req.query.supplierId;
        var supplierName = req.query.supplierName;
        var deliveryLeastValue = req.query.deliveryLeastValue;
        var deliveryCharge = req.query.deliveryCharge;
        var openId   = req.query.openId;

        var  result = {
            supplierName : supplierName,
            supplierId   : supplierId,
            deliveryLeastValue : deliveryLeastValue,
            deliveryCharge : deliveryCharge,
            openId  : openId
        };
        res.render("funweb/dishes",result);

    });

    app.get("/getOrder",function(req,res,next){
        var openId =  req.query.openId;
        baseService.getOrder(openId,function(err,data){
            if(err){
                next(err);
            }
            else{
                var orders = [];
                if(data.orders){
                    orders = JSON.parse(data.orders);
                }
                data.orders = orders;
                 var result = {
                      result : orders
                 };
                res.json(result);
            }
        });

    });
    //获得菜品列表
    app.get("/dishes",function(req,res,next){
        var supplierId = req.query.supplierId;
         baseService.getDishes(supplierId,function(err,data){
                if(err){
                    next(err);
                }
                else{
                    res.json(data);
                }
         });
    });

    //获得餐馆页面
    app.get("/restaruratlistPage",function(req,res){
        var latitude = req.query.latitude;
        var longitude = req.query.longitude;
        var promotional = req.query.promotional;
        var openId   = req.query.openId;

        var result = {
            latitude : latitude,
            longitude : longitude,
            promotional : promotional,
            openId     : openId
        };
        res.render("funweb/restaurantList",result);
    });

    //获得附近餐馆
    app.get("/restaruratlist",function(req,res,next){
         var  latitude  =  req.query.latitude;
         var  longitude =  req.query.longitude;
         var  promotional  = req.query.promotional;
         baseService.findResBylaAndLo(latitude,longitude,promotional,function(err,data){
             if(err){
                 next(err);
             }
             else{
                 console.log("拿到列表...");
                 res.json(data);
             }
         });
    });

    //获得购物车页面
    app.get("/shoppingcarPage",function(req,res){
        res.render("funweb/shoppingcar");
    });

    //order
    app.get("/orderPage",function(req,res){
        var openId = req.query.openId;
        var result={
            openId : openId
        };
        res.render("funweb/myorder",result);
    });

};

module.exports = FunwebRouter;