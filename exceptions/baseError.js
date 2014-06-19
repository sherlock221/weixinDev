var util = require('util');
var AbstractError = require('./abstractError');
var Result = require('./../routes/result/result');

/**
 * id不存在
 * @param msg
 * @constructor
 */
var IdNotFoundException = function (msg) {
    IdNotFoundException.super_.call(this, msg,this.constructor);
    this.name = "IdNotFoundException";
    this.message = msg || 'ID 不存在!';
    this.code  = Result.ID_NO_FOUND;
};
util.inherits(IdNotFoundException, AbstractError);



/**
 * id存在
 * @param msg
 * @constructor
 */
var IdIsExistException = function (msg) {
    IdIsExistException.super_.call(this, msg,this.constructor);
    this.name = "IdNotFoundException";
    this.message = msg || 'ID 已经存在!';
    this.code  = Result.ID_EXIST;
};
util.inherits(IdIsExistException, AbstractError);


/**
 * 名称存在
 * @param msg
 * @constructor
 */
var NameIsExistException = function (msg) {
    NameIsExistException.super_.call(this, msg,this.constructor);
    this.name = "NameIsExistException";
    this.message = msg || 'name 已经存在!';
    this.code  = Result.NAME_EXIST;
};
util.inherits(NameIsExistException, AbstractError);



module.exports = {
    IdNotFoundException : IdNotFoundException,
    IdIsExistException  : IdIsExistException,
    NameIsExistException : NameIsExistException
};