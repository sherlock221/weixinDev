var Session = function (key, req, data) {
    this.map = new Array();
};

Session.object = function (key, value) {
    return {
       key  : key,
       value : value,
       expiration : 1000 * 60 * 60 * 2 // 2小时
    };
};

Session.prototype.save = function (key, value) {
    var isExist =  false;
    for (var i = 0; i < this.map.length; i++) {
        if (this.map[i].key === key) {
            this.map[i].value = value;
            console.log("替换 ",key);
            isExist = true;
            break;
        }
    }
    if(!isExist){
        var obj = Session.object(key,value);
        console.log("已存入 ",JSON.stringify(obj));
        this.map.push(obj);
    }
    return this;
};

Session.prototype.get = function (key) {
    for (var i = 0; i < this.map.length; i++) {
        if (this.map[i].key === key) {
            return map[i].value;
        }
    }
    return  null;
};

Session.prototype.destroy = function (key) {
    for (var i = 0; i < this.map.length; i++) {
        if (this.map[i].key === key) {
            var temp = this.map[i];
            this.map.splice(i, 1);
            console.log("已删除 ");
            return temp;
        }

    }
    console.log("删除 未找到!");
    return null;
};

module.exports = Session;