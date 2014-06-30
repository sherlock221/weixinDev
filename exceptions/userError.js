var util = require('util');
var AbstractError = require('./abstractError');


/**
 * 用户不存在
 * @param msg
 * @constructor
 */
var UserNotFound = function (msg) {
    UserNotFound.super_.call(this, msg,this.constructor);
    this.name = "UserNotFound";
    this.message = msg || '用户 不存在!';
};
util.inherits(UserNotFound, AbstractError);

/**
 * 用户密码输入错误
 * @param msg
 * @constructor
 */
var UserPassError = function (msg) {
    UserPassError.super_.call(this, msg,this.constructor);
    this.name = "UserPassError";
    this.message = msg || '用户 密码输入错误!';
};
util.inherits(UserPassError, AbstractError);


/**
 * 用户已经存在
 * @param msg
 * @constructor
 */
var UserIsExists = function (msg) {
    UserIsExists.super_.call(this, msg,this.constructor);
    this.name = "UserIsExists";
    this.message = msg || '用户已经存在!';
};
util.inherits(UserIsExists, AbstractError);



module.exports = {
    UserNotFound : UserNotFound,
    UserIsExists : UserIsExists,
    UserPassError : UserPassError
};