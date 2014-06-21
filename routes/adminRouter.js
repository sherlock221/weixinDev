var menuRouter    = require("./memuRouter");
var Result = require("./result/result");

//后台配置
var ADMIN = {
    userName : "adminsuper002",
    passWord : "nicaobudaowodemima"
};


var AdminRouter = function(app,weixin,apiWx){
    /**
     * admin 后台部分
     */
        //后台过滤器
    app.all("/admin/*",function(req,res,next){
        console.log("进入后台过滤器");
        console.log(req.method);
        if(req.path == "/admin/login" ){
            next();
        }
        else{
            res.render("admin/login",{code : Result.ROLE_ERROR,err:"您没有权限,请重新登录!"});
        }
    });

    //登录页
    app.get("/admin/login",function(req,res){
        res.render("admin/login",{code : Result.ROLE_ERROR,err:""});
    });
    //创建按钮页面
    app.get("/admin/menu/add",function(){
        res.render("admin/menu/createMenu")
    });
    //查询按钮页面
    app.get("/admin/menu",function(req,res){
        res.render("admin/menu/menuList");
    });

    //登录 post
    app.post("/admin/login",function(req,res){
        var userName = req.body.userName;
        var passWord = req.body.passWord;
        if(userName == "" || passWord == ""){
            res.render("admin/login",{code : Result.PARAM_ERROR, err : "请输入用户名,密码"});
        }
        else if( ADMIN.userName != userName && ADMIN.passWord != passWord){
            res.render("admin/login",{code : Result.PARAM_ERROR, err : "用户名,密码错错误"});
        }
        else{
            res.render("admin/menu/menuList");
        }
    });

    //创建按钮 post
    app.post("/admin/menu/add",function(req,res){
        var menu =  {
            "button":[
                {
                    "type":"click",
                    "name":"今日歌曲",
                    "key":"V1001_TODAY_MUSIC"
                },
                {
                    "type":"click",
                    "name":"歌手简介",
                    "key":"V1001_TODAY_SINGER"
                },
                {
                    "name":"菜单",
                    "sub_button":[
                        {
                            "type":"view",
                            "name":"搜索",
                            "url":"http://www.soso.com/"
                        },
                        {
                            "type":"view",
                            "name":"视频",
                            "url":"http://v.qq.com/"
                        },
                        {
                            "type":"click",
                            "name":"赞一下我们",
                            "key":"V1001_GOOD"
                        }]
                }]
        };
        menuRouter.create(apiWx,menu);
    });


};


module.exports = AdminRouter;