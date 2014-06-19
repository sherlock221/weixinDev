/**
 * sherlock
 * 数据库连接池
 */


var mysql = require("mysql");
var pool;

pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : "",
    port     : 3306
});


var selectSQL ="show variables like 'wait_timeout'";
pool.getConnection(function (err, conn) {
    if (err) console.log("POOL ==> " + err);

    function query(){
        conn.query(selectSQL, function (err, res) {
            console.log(new Date());
            console.log(res);
            conn.release();
        });
    }
    query();
    setInterval(query, 5000);
});
