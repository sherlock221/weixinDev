/**
 * Created by gbdai on 14-4-20.
 */
var util = require('util');

var AbstractError = function (msg, constr) {
    Error.captureStackTrace(this, constr || this)
    this.message = msg || 'Error'
}
util.inherits(AbstractError, Error)
AbstractError.prototype.name = 'Abstract Error';

module.exports = AbstractError;