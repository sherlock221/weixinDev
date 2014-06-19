var  RoleService = require("./../services/roleService");
var  roleService = new RoleService();

/**
 * 右键run 运行添加用户 请先确保role表中有角色信息
 */



var admin = {
    roleName : "管理员",
    roleNum : 1000011
};

var guest = {
    roleName : "游客",
    roleNum : 1000012
};


roleService.add(admin,function(err,user){
    if(err){
        console.log(err);
    }
    else{
        console.log("admin_role_id" , user.insertId);
    }

});


roleService.add(guest,function(err,user){
    if(err){
        console.log(err);
    }
    else{
        console.log("guest_role_id" , user.insertId);
    }
});


