var BaseService = function () {
};

//订餐
BaseService.prototype.order = function () {
    console.log("我要订餐");
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