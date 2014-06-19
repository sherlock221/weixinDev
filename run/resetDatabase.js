/**
 * 数据库初始化
 */

var  roles = require("./../constants/sysRoles");
var  RoleService = require("./../services/roleService");
var  roleService = new RoleService();


//重置roles
roleService.removeAllRole(function(err,res){
    if(err)
        console.err(err.stack);
    else{
        console.log("共删除了 : " + res + "条数据");

        roleService.addRole(roles.guestRole,function(err,res){
            if(res != null){
                console.log("添加guest成功...",res.rights.length + "个功能");
            }
        });

        roleService.addRole(roles.helperRole,function(err,res){
            if(res != null){
                console.log("添加helper成功...",res.rights.length+ "个功能");
            }
        });

        roleService.addRole(roles.adminRole,function(err,res){
            if(res != null){
                console.log("添加admin成功...",res.rights.length+ "个功能");
            }
        });

    }
});






