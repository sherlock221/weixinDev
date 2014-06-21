/**
 * 工具整合类 
 * @author  sherlock
 * @description 包含 : ajax-util.js
 * 					  string-util.js
 * 		 			  webpage-util.js
 * 					  alertMessage
 */

var Results = {

    SUCCESS : "1",
    ROLE_ERROR : "2",
    PARAM_ERROR : "3",
    DB_ERROR    : "-1",
    ID_NO_FOUND : "-4",
    ID_EXIST    : "-5",
    NAME_EXIST  : "-6",
    NAME_NOT_FOUND : "-7",
    LAST_PAGE      : "-8"
};

function toggleNav(type){
    $("#navbar").find("li[type='"+type+"']").addClass("active").siblings().removeClass("active");
}

/**
 * localStorage 便捷
 * @type {{save: save, get: get}}
 */
var lg = {
    save : function(key,cm){
        if(cm instanceof  Object){
                cm = JSON.stringify(cm);
        }

        localStorage.setItem(key,cm);
    },
    get  : function(key){
        var value = localStorage.getItem(key);
        return  JSON.parse(value);
    }
};


/**
 * 重置表单
 * @type {{Form: Form}}
 */
var Reset = {
    form : function(formQuery){
        if(formQuery)
            $(formQuery)[0].reset();
        else
            $("form")[0].reset();
    }

};





var alertMsg = {
	//信息提示
	info : function(content) {
        $.ui.popup({
            message : content,
            suppressTitle : true,
            cancelOnly : true,
            cancelText : "确定"
        });
	},

	/**
	 * 询问
	 * @param {String} 消息内容
	 * @param {Function} 确定按钮回调函数
	 */
	confirm : function(content, ok, no) {
        $.ui.popup( {
            title:"确认信息",
            message:content,
            cancelText:"取消",
            doneText:"确定",
            doneCallback: ok
        });
	}
};


/**
 * loading交互
 * @class Load
 */
var af_load = {
    show : function(text){
        $("#loading").show();
    },
    hide : function(){
        $("#loading").hide();
    }
};


var DateUtil = {

    /**
     * 获得pickui
     * @param dom
     * @returns {window.Pikaday}
     */
    getUI  : function(query){
        return $(query).pikaday({
            firstDay: 1,
            minDate: new Date('2000-01-01'),
            maxDate: new Date('2020-12-31'),
            yearRange: [2000,2020]
        });
    },
    /**
     * 获得当前年月日ß
     * @returns {string}
     */
    getYYMMDD : function(date){
        var  date = date || new Date();
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
    calcDay : function(str,type){
        var dateStr = str.split("-").join("/");
        var myDate = new Date(dateStr);
        var time;
        if(type == "+")
          time = myDate.getTime()  + 1 *  24 * 60 * 60 * 1000
        else
            time = myDate.getTime()  - 1 *  24 * 60 * 60 * 1000
        var newDate = new Date(time);
        return DateUtil.getYYMMDD(newDate);
    }


};


/**
 * 异步请求工具类
 * 需要jquery.x版本支持
 * 封装了常用的ajax操作
 * @class AjaxUtil
 */
var AjaxUtil = {


    /**
     * 填充数据模版 artTemplat
     * @param url
     * @param $dom
     * @param $template
     * @param data
     * @param callBack
     */
    fillJsonToTemplate : function(url, $dom, $template, data, callBack){
        data = data || {};
        af_load.show();
        AjaxUtil.get(url, data, function (result) {
            af_load.hide();
            WebPage.refreshTemplate($dom, result, $template);
            if (callBack)
                callBack(result);
        }, AjaxUtil.ajaxError);
     },



    /**
     *  本地数据渲染
     * @param $dom
     * @param data
     * @param templateName
     */
    fillDomByTmodJS : function($dom,data,templateName){
        $dom.html(template(templateName, data));
    },


    /**
     * 异步请求显示loading
     * @param type
     * @param url
     * @param data
     * @param fn_succes
     */
    ajaxShowLoad : function(type,url, data, fn_succes){
          function callBack(result){
              af_load.hide();
              fn_succes(result)
          };

           af_load.show();
           if(type == "post"){
               AjaxUtil.post(url,data,callBack,AjaxUtil.ajaxError);

           }
           else if(type == "put"){
               AjaxUtil.put(url,data,callBack,AjaxUtil.ajaxError);
           }
           else if(type == "get"){
               AjaxUtil.get(url,data,callBack,AjaxUtil.ajaxError);
           }
           else if(type == "delete"){
               AjaxUtil.delete(url,data,callBack,AjaxUtil.ajaxError);
           }
    },


    /**
     * 异步请求form显示loading
     * @param type
     * @param url
     * @param data
     * @param fn_succes
     */
    ajaxFormShowLoad : function(form,fn_succes){
        function callBack(result){
            af_load.hide();
            fn_succes(result)
        };

        var type = $(form).attr("method");
        af_load.show();
        if(type == "post"){
            AjaxUtil.postForm(form,callBack);

        }
        else if(type == "put"){
            AjaxUtil.putForm(form,callBack);
        }
        else if(type == "get"){
            AjaxUtil.getForm(form,callBack);
        }
        else if(type == "delete"){
            AjaxUtil.deleteForm(form,callBack);
        }

        return false;
    },


    /**
     * 服务器出现错误
     */
    ajaxError : function(xhr,status,text){
        var message = "与服务器起连接失败!";
        if(xhr.status == 404){
            message = "404资不存在";
        }
        af_load.hide();
        alertMsg.info(message);
    },

    /**
     * post提交表单
     * @param form
     * @param callBack
     * @returns {boolean}
     */
     postForm : function(form,callBack){
            var $form = $(form);
            var url =   $form.attr("action");
            var data =  $form.serialize();
            af_load.show();
            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                dataType: "json",
                cache: false,
                success: function(result){
                    af_load.hide();
                    callBack(result);
                },
               err  : AjaxUtil.ajaxError
            });
            return false;
    },

    /**
     * put提交表单
     * @param form
     * @param callBack
     * @returns {boolean}
     */
    putForm : function(form,callBack){
        var $form = $(form);
        var url =   $form.attr("action");
        var data =  $form.serialize();

        $.ajax({
            type: 'put',
            url: url,
            data: data,
            dataType: "json",
            cache: false,
            success: function(result){
                callBack(result);
            },
            err  : AjaxUtil.ajaxError
        });
        return false;
    },


	/**
	 * 异步提交表单数据(get)
	 * @param {Object} url 请求地址
	 * @param {Object} form 表单form
	 * @param {Object} fn_succes 成功回调函数
	 * @param {Object} fn_error 失败回调函数
	 * @param {Object} dataType 返回类型(默认json)
	 */
	getForm : function(url, form, fn_succes, fn_error, dataType) {
		AjaxUtil.ajaxForm("get", url, form, fn_succes, fn_error, dataType == undefined ? "json" : dataType);
	},

	ajaxForm : function(type, url, form, fn_succes, fn_error, dataType) {
		var seriz;
		if ( form instanceof Array)
			seriz = form.serialize(form);
		else
			seriz = form.serialize(form);



		$.ajax({
			type : type,
			url : url,
			data : seriz,
			success : fn_succes,
			error : fn_error,
			dataType : dataType
		});
	},

	/**
	 * 异步提交请求(get) 返回json
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} fn
	 */
	get : function(url, data, fn_succes,fn_error) {

			$.ajax({
			type : "get",
			url : url,
			data : data,
			success : function(res){
                fn_succes(res);
            },
			error : fn_error || AjaxUtil.ajaxError,
			dataType : "json"
		});
	},

	/**
	 * 异步提交请求(post) 返回json
	 * @param {Object} url 请求地址
	 * @param {Object} data 请求参数
	 * @param {Object} fn   成功回调函数
	 */
	post : function(url, data, fn_succes,fn_error) {
		$.ajax({
			type : "post",
			url : url,
			data : data,
			success : fn_succes,
			error : fn_error || AjaxUtil.ajaxError,
			dataType : "json"
		});
	},

    /**
     * 删除请求qin(delete) 返回json
     * @param {Object} url 请求地址
     * @param {Object} data 请求参数
     * @param {Object} fn   成功回调函数
     */
    delete : function(url, data, fn_succes,fn_error) {
        $.ajax({
            type : "delete",
            url : url,
            data : data,
            success : fn_succes,
            error : fn_error || AjaxUtil.ajaxError,
            dataType : "json"
        });
    },

    /**
     * 更新请求qin(delete) 返回json
     * @param {Object} url 请求地址
     * @param {Object} data 请求参数
     * @param {Object} fn   成功回调函数
     */
    put : function(url, data, fn_succes,fn_error) {
        $.ajax({
            type : "put",
            url : url,
            data : data,
            success : fn_succes,
            error : fn_error || AjaxUtil.ajaxError,
            dataType : "json"
        });
    },


    /**
	 * 载入并执行js
	 * @param {Object} url  js地址
	 * @param {Object} fn   成功载入回调函数
	 */
	getScript : function(url, fn) {
		$.getScript(url, fn,AjaxUtil.ajaxError);
	},

	/**
	 * 载入json数据
	 * @param {Object} jsonUrl json/js地址
	 * @param {Object} fn  成功载入回调函数
	 */
	getJSON : function(jsonUrl,data,fn) {
		$.getJSON(jsonUrl, data, fn,AjaxUtil.ajaxError);
	},

	/**
	 * 载入html文档
	 * @param {Object} htmlUrl 文档url
	 * @param {Object} data    数据
	 * @param {Object} fn      回调函数
	 */
	loadHtml : function(htmlUrl, data, fn) {
		$.load(htmlUrl, data, fn,AjaxUtil.ajaxError);
	}
};



/**
 * ajax全局事件
 * 实现 ajax_global 的方法
 * 启动全局事件 AJAX_GLOBAL.global();
 * @class AJAX_GLOBAL
 */

var AJAX_GLOBAL = {
	USER_AJAX_GLOBAL : true,
	global : function() {
			$(document).ajaxStart(AJAX_GLOBAL.onStart)
						.ajaxComplete(AJAX_GLOBAL.onComplete)
						.ajaxSuccess(AJAX_GLOBAL.onSuccess);
	},
	onStart : function() {
        Load.show();
	},
	onComplete : function(evt, data, setting) {
        Load.hide();
	},
	onSuccess : function(evt, data, setting) {
		
	}
};



/*!
* version 1.0.0  (2014.3.11 10:10)
* https://github.com/sherlock221
* Copyright 2011-2014 sherlock
*/


/**
 * 页面常用方法
 * @class WebPage
 */
var WebPage = {
	
	 /**
     * 分解DOM名称，已spe分割
     * @param doms  分解dom集合
     * @param spe   分隔符
     * @returns {string}
     */
    sliceName : function(doms,spe){
        var array = new Array();
        for(var i =0; i<doms.length ; i++){
            var $obj = $(doms[i]);
            var name = $obj.attr("name");
            array.push(name);
        }

       if(JString.isEmpty(spe)) spe = ",";

        return array.join(spe)
    },

    /**
     * checkbox全选多选
     * @param doms
     * @param selected
     */
    toggleCheckBox : function(cklists,selected){
        var cklistTemp;
        if(!selected){
            cklistTemp = cklists.filter(":checked");
        }
        else{
            cklistTemp = cklists.not("input:checked");
        }

        for(var i=0; i<cklistTemp.length;i++){
            var ck = cklistTemp[i];
            $(ck).click();
        }
    },

	/**
	 * @description 计算总页数(分页)
	 * @param count
	 *            数据总量
	 * @param p
	 *            分页对象
	 * @return p 分页对象
	 */
	pageSlice : function(count, table) {
        var p =  table.data("page");
        p.total = count % p.size == 0 ? count / p.size : (parseInt(count
            / p.size) + 1);
        table.data("page", p);
	},



	createPage : function($dom, index, size, total) {
		var page = {
			total : total == undefined ? 0 : total,
			index : index == undefined ? 1 : index,
			size : size == undefined ? 10 : size
		};
		$dom.data("page", page);
	},
	/**
	 * @description 范围检查(分页)
	 * @param p
	 *            分页对象
	 * @return p 分页对象
	 */
	pageCheck : function(p) {
		if (p.index > p.total) {
			p.index = p.total;
		} else if (p.index <= 0) {
			p.index = 1;
		}
		return p;
	},

    /**
     * @description 触发分页按钮
     * @param type  上下页
     * @param page  页数对象(index total)
     * @returns {p}
     */
    pageTrigger : function(type,page){

        if(type == "prev"){
               page.index--;
        }
        else if( type =="next"){
                page.index++;
        }
       return WebPage.pageCheck(page);
    },

	/**
	 * @description 绑定上下页
	 * @param $main
	 *            上下页按钮所在的父层
	 * @param $fn
	 *            执行方法
	 */
	pageBind : function($main, $fn) {
		var page = $main.data("page");
		$main.find("[pos='prev']").unbind("click").click(fn);
		$main.find("[pos='next']").unbind("click").click(fn);
		function fn() {
			var $this = $(this);
			var type = $this.attr("pos");
			type == "prev" ? page.index-- : page.index++;
			// 检查范围
			var p1 = WebPage.pageCheck(page);
			// 更新page
			$main.data("page", p1);
			// 执行加载数据方法
			$fn();
		}
	},

	/**
	 * 渲染模板
	 * 
	 * @param $dom
	 * @param data
	 * @param $template
	 */
	refreshTemplate : function($dom, data, $template,append) {
		// 原生方法
		var source = $template.html();
		// 预编译模板
		var tm = template.compile(source);
		// 匹配json内容
		var html = tm(data);
		// // 输入模板
		if(append)
			$dom.append(html);
		else
			$dom.html(html);
			
	},
	
	/**
	 * @description 等呆几秒后 刷新页面
	 * @param time
	 *            等待毫秒数
	 */
	reloadPage : function(time) {
		var fn = function() {
			window.location = window.location;
		};
		if (!time) {
			time = 0;
		}
		setTimeout(fn, time)
	},

	/**
	 * @description 等待几秒 跳转页面
	 * @param url
	 *            跳转路径
	 * @param time
	 *            等待毫秒数
	 */
	jumpPage : function(url, time) {
		var fn = function() {
			window.location.href = url;
		};
		if (!time) {
			time = 0;
		}
		setTimeout(fn, time)
	}
};



/*!
* version 1.0.0  (2014.3.11 10:10)
* https://github.com/sherlock221
* Copyright 2011-2014 sherlock
*/



/**
 * 字符串工具类
 * @class JString
 */
var JString = {

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

