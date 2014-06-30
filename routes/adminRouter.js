var menuRouter    = require("./memuRouter");
var Result = require("./result/result");

//后台配置
//var ADMIN = {
//    userName : "adminsuper002",
//    passWord : "nicaobudaowodemima"
//};

var ADMIN = {
    userName : "ad",
    passWord : "sherlock221b"
};

var AdminRouter = function(app,weixin,apiWx){
    /**
     * admin 后台部分
     */
        //后台过滤器
    app.all("/admin/*",function(req,res,next){
        console.log("进入后台过滤器");
        console.log(req.method);
        var user = req.session.user;

        if(req.path == "/admin/login" ){
            next();
        }
        else if(user){
            next();
        }
        else{
            res.redirect("/admin/login");
        }
    });


    //首页
    app.get("/admin/index",function(req,res){
        res.render("admin/home/index");
    });

    //登录页
    app.get("/admin/login",function(req,res){
        res.render("admin/login",{code : Result.ROLE_ERROR,err:""});
    });
    //创建按钮页面
    app.get("/admin/menu/add",function(req,res){
        res.render("admin/menu/createMenu")
    });

    //查询按钮页面
    app.get("/admin/menuPage",function(req,res){
        res.render("admin/menu/menuList");
    });

    //查询按钮列表
    app.get("/admin/menu",function(req,res,next){
        var  ts = {
            buttons : []
        };
        //查找按钮
        menuRouter.findAll(apiWx,function(err,cb){
            if(err){
                if(err.message == "menu no exist"){
                }
                else{
                    next(err);
                }
            }
            else{
                console.log(cb.menu.button);
                ts.buttons = cb.menu.button;
            }
            res.json(ts);
        });
    });

    //登录 post
    app.post("/admin/login",function(req,res){
        var userName = req.body.userName;
        var passWord = req.body.passWord;
        if(userName == "" || passWord == ""){
            res.render("admin/login",{code : Result.PARAM_ERROR, err : "请输入用户名,密码"});
        }
        else if( ADMIN.userName != userName || ADMIN.passWord != passWord){
            res.render("admin/login",{code : Result.PARAM_ERROR, err : "用户名,密码错错误"});
        }
        else{

            //存入session
            req.session.user = {
                userName : userName,
                passWord : passWord
            };

                //放入渲染全局
                app.locals.user = req.session.user;
                res.redirect("/admin/index");
        }
    });

    //创建按钮 post
    app.post("/admin/menu/add",function(req,res,next){

        var menu = {
            button :[]
        };

        try{
            menu.button = JSON.parse(req.body.buttonJson);
        }
        catch(e){
            res.json({ code : Result.PARAM_ERROR, message : "json格式错误!请检查"});
            return;
        }

        menuRouter.create(apiWx,menu,function(err,me){
            if(err){
                next(err);
            }
            else{
                console.log("按钮添加成功!");
                res.json({code : Result.SUCCESS});
            }
        });
    });


};


module.exports = AdminRouter;