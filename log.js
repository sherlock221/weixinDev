var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' },{
            type: 'file',
            filename: './app.log',
            maxLogSize: 1024*1024*10,
            backups:4
        }
    ],
    replaceConsole: true   //替换console.log
});

exports.logger = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};
exports.use = function(app){
    app.use(log4js.connectLogger(this.logger('normal'), {level:'auto', format:':method :url'}));
};