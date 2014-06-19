var  UserService = require("./../services/userService");
var  userService = new UserService();

/**
 * 右键run 运行添加用户 请先确保role表中有角色信息
 */



var adminUser = {
    userName : "大王",
    passWord : "123456",
    roleId   : 1
};

userService.addUser(adminUser,function(err,user){
    if(err){
        console.error(err);
    }
    else{
        console.log("user_id 为",user.insertId);
    }
});