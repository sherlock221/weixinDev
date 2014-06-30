//导入命名空间
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require("compression");
var ejs   = require("ejs");
var middleWareUtil  = require("./util/middleWareUtil");
var router = require("./routes/router");
var log4j = require("./log");
var session = require('express-session');

var SessionStore = require("./util/session");

var app = express();

var Result = require("./routes/result/result");

//让ejs使用扩展名html文件
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


//中间件使用
//gzip / deflate
//log4j.use(app);
app.use(favicon());
//log4j代替 需要查看请求状态请开启
app.use(logger('dev'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session({ secret: "keyboard cat" }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(compress);
//打印http参数
//app.use(middleWareUtil.consoleHttpParam);
//路由配置
router.use(app);

//设置全局用户管理对象
global.users =  new SessionStore();


//配置404页面
app.use(function(req, res, next) {
    var err = new Error('资源未找到');
    err.status = 404;
    res.send(404);
});


//捕获全系统异常
app.use(function(err, req, res, next){
    console.log("系统捕获异常...");
    //打印到控制台
    showErrOnConsole == true ? console.error(err.stack) : "";
    //异常统一使用json返回
    res.charset = 'utf-8';

    if(!err.code)
        err.code = Result.DB_ERROR;

    res.json(err);
});



//获得服务器ip地址
var address =require("./util/address");
console.log(address.getLocalIP("","IPv4"));


//常量
var showErrOnConsole = true;


//缓存数据
//cache.use();

//打开数据库


module.exports = app;

