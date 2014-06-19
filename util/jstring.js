var pinyin = require("pinyin");

/**
 * 字符串工具类
 * @class JString
 */
var JString = {


    /**
     * 获得当前年月日ß
     * @returns {string}
     */
    getYYMMDD : function(){
        var  date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;

        var day = date.getDate();
//        return year+"年"+month+"月"+day+"日";

        if(month < 10)
            month = "0"+month;

        if(day < 10){
            day = "0"+day;
        }

        return year+"-"+month+"-"+day;
    },

    /**
     * 汉字转拼音
     * @param str
     * @returns {*}
     */
    pinyin : function(str){
       return pinyin(str, {
            style: pinyin.STYLE_NORMAL, // 设置普通风格
            heteronym: true             //多音字模式
        });
    },

    /**
     * 汉字转首字母
     * @param str
     * @returns {*}
     */
    first_letter : function(str){
        return pinyin(str, {
            style: pinyin.STYLE_FIRST_LETTER, //首字母
            heteronym: true             //多音字模式
        });
    },

    /**
     * @description 判断值是否为undefined
     * @param $dom  dom对象 或者 任意数值
     * @returns {boolean} true : undefined , false  : 非undefined
     */
    isUndefined : function($dom){
        if(!$dom){return true}
        return false
    },
    /**
     * @description 非空判断(判断以下:undefend,null,"")
     * @param str   字符串
     * @returns {boolean} true : 空 , false  : 非空
     */
    isEmpty : function(str){
        if( undefined == str || null == str  || "" == str ){
            return true;
        }
        return false;
    },

    /**
     * @description 将字符串解析成html标签
     * @param str   带解析的字符串
     * @returns {string}  解析完成后字符串
     */
    parseHtml : function (str)
    {
        String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
            if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
                return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
            } else {
                return this.replace(reallyDo, replaceWith);
            }
        }
        //str含有HTML标签的文本
        str = str.replaceAll("<","&lt;");
        str = str.replaceAll(">","&gt;");
        str = str.replaceAll(" ","&nbsp;");
        str = str.replaceAll("\n","<br>");
        str = str.replaceAll("&","&amp;");
        return str.toString();
    },

    /**
     * @description 替换后缀名(a.mp3 -->b.mp4)
     * @param   str 原始字符
     * @param   identifier 原始标志
     * @param   target  替换标志
     * @return  {string} 替换后字符串
     */
    replaceLastChar : function(str,identifier,target){
        var last = str.lastIndexOf(identifier);
        return (str.substring(0,last+1)+target);
    },

    /**
     * @description  去掉字符串中所有空格 is_globa = 'g'
     * @param   str 原始字符
     * @param   identifier 原始标志
     * @param   target  替换标志
     * @result  {{去掉之后的字符串}}
     */
    trimAll : function(str,is_global){
        var result;
        result = str.replace(/(^\s+)|(\s+$)/g,"");
        if(is_global.toLowerCase()=="g")
            result = result.replace(/\s/g,"");
        return result;
    },
    /**
     * @description  去掉左右两边的空格
     * @param   str 原始字符
     * @param   type  l:左边  r:右边  lr : 左右两边
     * @result  {{去掉之后的字符串}}
     */
    trim : function(str,type){
        var  regs = /\s+/g;
        if(type == 'l'){
            regs =  /^\s*/;
        }
        else if( type == 'r')
        {
            regs = /(\s*$)/g;
        }
        else if(type == 'lr')
        {
            regs = /^\s+|\s+$/g;
        }
        return  str.replace(regs,"");
    },

    /**
     * @description 获得主机地址|项目名|目录地址
     * @returns {{localhost: 主机地址, project: 项目名称 pathName : 目录地址}}
     */
    getUrl: function(){
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;          //获取主机地址之后的目录，如： cis/website/meun.htm
        var pos = curWwwPath.indexOf(pathName);                    //获取主机地址，如： http://localhost:8080
        var localhostPaht = curWwwPath.substring(0, pos);          //获取带"/"的项目名，如：/cis
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        var rootPath = localhostPaht + projectName;
        return {
            localhost : pos,
            project   : projectName,
            pathName  : pathName
        }
    },
    getParamByName : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);{return null};
    },


    /**
     * 检查是否是按键值
     * @param key  按键值
     * @returns {boolean} true : 是 ,false :不是
     */
    vdIsKey : function(key){
        var zz = /^\d$/;
        return zz.test(key);
    },

    /**
     * 判断是否为数字
     * @param num    字符
     * @returns {boolean}  true : 是 , false :不是
     */
    vdIsNum : function(num){
        var zz = /^\d+$/;
        return zz.test(num);
    },
    /**
     * 判断是否为qq号码
     * @param str qq号
     * @returns {boolean}    true:是 ,false :不是
     */
    isQQ:function(str) {
        if (/^\d{5,14}$/.test(str)) {
            return true;
        }
        return false;
    } ,

    /**
     * 判断是否为手机
     * @param str 手机号
     * @returns {boolean}    true:是 ,false :不是
     */
    isPhone : function(str){
        var reg = /^0?1[358]\d{9}$/;
        return reg.test(str);
    },
    /**
     * 判断是否为邮箱
     * @param str 邮箱
     * @returns {boolean}    true:是 ,false :不是
     */
    isEmail : function(str){
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return reg.test(str);
    },
    /**
     * 判断是否正整数
     * @param str 数值
     * @returns {boolean}    true:是 ,false :不是
     */
    isPlusNumber   : function(str){
        var reg = /^[0-9]*[1-9][0-9]*$/;
        return reg.test(str);

    },
    /**
     * 判断是否正数 不包括0
     * @param str 数值
     * @returns {boolean}    true:是 ,false :不是
     */
    isNumric : function(str){
        var reg = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
        return reg.test(str);
    }

};

module.exports = JString;
