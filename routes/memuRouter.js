/**
 * 微信菜单管理
 */

exports.create = function(api,menu,callBack){
    api.removeMenu(function(err,me){
        if(err){
            next(err);
        }
        else{
            console.log("删除成功!");
            api.createMenu(menu,function (err, me) {
                 console.log(me);
                callBack(err,me);
            });
        }
    });

};

exports.findAll = function(api,callBack){
    api.getMenu(callBack);
};


