/**
 * sherlock
 * 断线重连
 */

// 模拟密码错误 修改password
// 模拟数据库宕机  正常启动 然后杀掉mysqld的进程。
// 数据库超时

var mysql = require("mysql");
var connection;



function  handleError (){

    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : "",
        port     : 3306
    });

    //连接错误，2秒重试
    connection.connect(function(err){
        if(err){
            console.log('error when connecting to db:', err);
            //尝试重新链接
            console.log("2秒后尝试重新连接...");
            setTimeout(handleError , 2000);
        }
    });

    connection.on("error",function(err){
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        } else {
            throw err;
        }
    });
}

handleError();