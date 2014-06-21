/**
 * 微信菜单管理
 */

exports.create = function(api,menu){
    api.createMenu(menu,function (err, me) {
        if(err){
            console.log(err);
        }
        console.log(me);
    });
};
