//log
var log = require("./../log").logger("router");

/**
 * 路由
 * @type {exports}
 */
var inventRouter = require("./inventRouter");


//转发
module.exports.use = function(app){

    //测试
    app.put("/",inventRouter.test);

};

