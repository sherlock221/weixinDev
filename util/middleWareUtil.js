/**
 * 常用中间件
 * sherlock 1:14
 */

var MiddleWareUtil = {

    consoleHttpParam: function (req, res, next) {
        console.warn("http参数显示功能开启...");
        console.log("param  : ", req.params);
        console.log("get : ", req.query);
        console.log("post : ", req.body);
        next();
    }

};

////domain来处理异常
//app.use(function (req,res, next) {
//    console.log("开始捕获...");
//    var d = domain.create();
//    //监听domain的错误事件
//    d.on('error', function (err) {
//        console.log("捕获异常...");
//        //logger.error(err);
//        //res.statusCode = 500;
//        res.statusCode = 500;
//        res.render('error/error', { message:"出错拉!",error: err });
//        d.dispose();
//    });
//    d.run(next);
//});

module.exports = MiddleWareUtil;

