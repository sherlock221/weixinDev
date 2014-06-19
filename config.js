#!/bin/env node
/**
 * 应用配置信息
 */

var catg = 'dev';
if(process.env.BAE_ENV_AK) {
	catg = 'bae';
} else if(process.env.OPENSHIFT_GEAR_NAME) {
	catg = 'rhc';
}

console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++');
console.log('DB-CONFIG-TYPE: ' + catg);

//var config = require('./config-' + catg + '.js');
//for(key in config) {
//	if(!(typeof (config[key]) == "function")) {
//		console.log(key + ' = ' + config[key]);
//	}
//}

module.exports = {
	/* 是否使用HTTPS */
//	'use_ssl': config['use_ssl'] || false,
//	'web_protocal': config['web_protocal'] || 'http://',
//
//	/* 静态资源 */
//	'static_host': config['static_host'] || 'http://obullxl.github.io',
	
	/* 数据库配置参数 */
	'db_host': "112.124.124.196",
	'db_port': "3306",
	'db_name': "xxx",
	'db_user': "xx",
	'db_passwd': "xxx",
	'db_charset': 'UTF8',
	'db_conn_limit': 5,
	
//	/* 日志配置 */
//	'log_type': config['log_type'] || 'console',
//	'log_level': config['log_level'] || 0, // 0-TRACE, 1-DEBUG, 2-INFO, 3-WARN, 4-ERROR, 5-FETAL
	
	/* 缓存配置 */
	'cache_type': 'global'
	
//	'uploadPath': './upload/',
};
