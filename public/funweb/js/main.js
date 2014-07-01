//订单内容
function createCookieValue(){
	var order = {};

	var products = [];

	order["products"] = products;

	order["address"]= "";
	order["totalAmount"]= 0.0;
	order["phone"]=""; 
	//封装supplier
	var supplier = {};
	
	supplier["id"]= 0;
	supplier["companyName"]= ""; 
//	supplier["serviceStatus"]= ""; 
	supplier["companyAddress"]=""; 
//	supplier["sendBeginAm"]="";
//	supplier["sendEndAm"]="";
//	supplier["sendBeginPm"]="";
//	supplier["sendEndPm"]="";
	
	supplier["deliveryCharge"]= "";//起送价
	order["supplier"] = supplier;

	order["totalQuantity"]= 0; 
	order["isReview"]= 0;
	
	order["orderSequence"]="";

	order["deviceId"]="";
	order["pguid"]="";

	order["note"]= "";
	order["shortTelephone"]= "";
	order["orderType"]= 4;
	
	return jsonToStr(order);
}

function getRootPath() {
	return window.location.protocol + '//' + window.location.host;
    //return  "http://www.flymeal.cn";
}

/**
 * 获取请求url传过来的参数
 */
function getRequest() {
	   var url = location.search; // 获取url中"?"符后的字串
	   var theRequest = new Object();
	   if (url.indexOf("?") != -1) {
	      var str = url.substr(1);
	      strs = str.split("&");
	      for(var i = 0; i < strs.length; i ++) {
	         theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
	      }
	   }
}

function getServerReq(_id) {
    return $("#"+_id).val();
}


/**
 * html5 本地存储
 * @type {{save: save, get: get}}
 */
var  lg = {
    save : function(key,value){
        if(value instanceof  Object)
            value = jsonToStr(value);

        localStorage.setItem(key,value);
    },
    get : function(key){
        return localStorage.getItem(key);
    },
    clear : function(){
        localStorage.clear();
    }

};


/**
 * json对象转字符串形式
 */ 
function jsonToStr(o) { 
	
	return JSON.stringify(o);
} 

/**
 * 字符串转json对象
 */
function stringToJson(stringValue) {
	return JSON.parse(stringValue);
} 
