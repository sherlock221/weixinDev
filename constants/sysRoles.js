/**
 * 系统角色定义
 * sherlock
 */
var Method = require("./methods");


//系统管理员
var admin = {
    roleName: "管理员",
    roleNo: "0001000",
    //权限
    rights: [
        {rightName:"注册",rightMethod : Method.register,rightNo : "10002"},
        {rightName:"添加用户",rightMethod : Method.addUser,rightNo : "10003"},
        {rightName: "删除用户", rightMethod : Method.removeUser, rightNo: "10004"},
        {rightName: "修改用户", rightMethod : Method.updateUser, rightNo: "10005"},

        {rightName: "添加角色",rightMethod : Method.addRole,rightNo : "10006"},
        {rightName: "删除角色", rightMethod : Method.removeRole, rightNo: "10007"},
        {rightName: "修改角色", rightMethod : Method.updateRole, rightNo: "10008"}

    ]
};


//游客
var  guest = {

    roleName: "游客",
    roleNo: "0001002",

    rights : [
        {rightName: "添加反馈", rightMethod : Method.addFeedBack, rightNo: "10019"},

        {rightName:"登录",rightMethod : Method.login,rightNo : "10001"},

        {rightName: "显示最近的文章", rightMethod : Method.findLatestArticle, rightNo: "10010"},
        {rightName: "显示最热文章", rightMethod : Method.findHotArticle, rightNo: "100011"},
        {rightName: "显示标签下的文章列表", rightMethod : Method.findArticleByTag, rightNo: "10012"},
        {rightName: "显示文章标签集合", rightMethod : Method.findArticleTags, rightNo: "10013"},
        {rightName: "显示单个文章", rightMethod : Method.findArticleById, rightNo: "10014"},
        {rightName: "显示标签云", rightMethod : Method.findTagClouds, rightNo: "10015"},


        {rightName: "显示文件夹树", rightMethod : Method.findFolderTree, rightNo: "10016"},
        {rightName: "显示文件夹下的文章列表", rightMethod : Method.findArticleByFolderId, rightNo: "10017"},
        {rightName: "显示时间归档", rightMethod : Method.findTimeFile, rightNo: "10018"},

        {rightName: "显示实验类型(分组)列表", rightMethod : Method.findLabTypes, rightNo: "10028"},
        {rightName: "显示实验类型下的实验列表", rightMethod : Method.getLabByType, rightNo: "10032"},
        {rightName: "显示一个实验", rightMethod : Method.getLabById, rightNo: "10032"},
        {rightName: "显示最热实验", rightMethod : Method.getHotLab, rightNo: "10033"}
    ]

};


//助手
var helper = {
    roleName: "助手",
    roleNo: "0001001",
    rights : [
        {rightName: "查询用户角色列表", rightMethod : Method.findUserRoles, rightNo: "10009"},

        {rightName: "添加标签", rightMethod : Method.addArticleTag, rightNo: "10022"},
        {rightName: "更新标签", rightMethod : Method.updateArticleTag, rightNo: "10023"},
        {rightName: "删除标签", rightMethod : Method.removeArticleTag, rightNo: "10024"},

        {rightName: "添加文件夹", rightMethod : Method.addArticleFolder, rightNo: "10025"},
        {rightName: "更新文件夹", rightMethod : Method.updateArticleFolder, rightNo: "10026"},
        {rightName: "删除文件夹", rightMethod : Method.removeArticleFolder, rightNo: "10027"},


        {rightName: "添加验类型(分组)列表", rightMethod : Method.addLabType, rightNo: "10029"},
        {rightName: "更新实验类型(分组)列表", rightMethod : Method.updateLabType, rightNo: "10030"},
        {rightName: "删除实验类型(分组)列表", rightMethod : Method.removeLabType, rightNo: "10031"},


        {rightName: "添加一个实验", rightMethod : Method.addLab, rightNo: "10034"},
        {rightName: "更新一个实验", rightMethod : Method.updateLab, rightNo: "10035"},
        {rightName: "删除一个实验", rightMethod : Method.removeLab, rightNo: "10036"}
    ]

};


//角色配置
module.exports = {
    adminRole  : admin,
    guestRole  : guest,
    helperRole     : helper
};

