var Result = require("./result/result");
var baseService = require("./../services/baseService");
var FunwebRouter = function(app,weixin,apiWx){


    //获得菜品详细
    app.get("/product",function(req,res){
        var pageSize = req.query.pageSize;
        var pageNum = req.query.pageNum;
        var categoryId = req.query.categoryId;
        baseService.getProduct(pageNum,pageSize,categoryId,function(err,data){
            if(err){
                next(err);
            }
            else{
                res.json(data);
            }
        });


    });

    //获菜品表页面
    app.get("/dishesPage",function(req,res){
        var supplierId = req.query.supplierId;
        var supplierName = req.query.supplierName;
        var deliveryLeastValue = req.query.deliveryLeastValue;
        var deliveryCharge = req.query.deliveryCharge;

        var  result = {
            supplierName : supplierName,
            supplierId   : supplierId,
            deliveryLeastValue : deliveryLeastValue,
            deliveryCharge : deliveryCharge
        };
        res.render("funweb/dishes",result);

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
        res.render("funweb/restaurantList");
    });

    //获得附近餐馆
    app.get("/restaruratlist",function(req,res,next){
         var  latitude  =  req.query.latitude;
         var  longitude =  req.query.longitude;
         baseService.getResList(latitude,longitude,function(err,data){
             if(err){
                 next(err);
             }
             else{
                 console.log("拿到列表...");
                 res.json(data);
             }

         });
    });
};

module.exports = FunwebRouter;