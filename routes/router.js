//log
var log = require("./../log").logger("router");

/**
 * 路由
 * @type {exports}
 */
var indexRouter = require("./indexRouter");


//转发
module.exports.use = function(app){

    //测试
    app.get("/",indexRouter.verify);

};

