var util = require('util');
var AbstractError = require('./abstractError');


/**
 * 商品不存在
 * @param msg
 * @constructor
 */
var ProductNotFound = function (msg) {
    ProductNotFound.super_.call(this, msg,this.constructor);
    this.name = "ProductNotFound";
    this.message = msg || '商品 不存在!';
};
util.inherits(ProductNotFound, AbstractError);


/**
 * 商品已经存在
 * @param msg
 * @constructor
 */
var ProductIsExists = function (msg) {
    ProductIsExists.super_.call(this, msg,this.constructor);
    this.name = "ProductIsExists";
    this.message = msg || '商品已经存在!';
};
util.inherits(ProductIsExists, AbstractError);



module.exports = {
    ProductNotFound : ProductNotFound,
    ProductIsExists : ProductIsExists
};