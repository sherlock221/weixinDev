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
 * 读取cookie
 * 
 * @param c_name
 *            cookie名
 * @returns
 */
function getCookie(c_name){
		// 先查询cookie是否为空，为空就return ""
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
			
      	// 通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
		if (c_start!=-1){ 
		// 最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
			c_start=c_start + c_name.length+1;
        	// 其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
				return unescape(document.cookie.substring(c_start,c_end));// 通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
			} 
		}
	return "";
}


/**
 * 设置cookie
 * 
 * @param c_name
 *            cookie名称
 * @param value
 *            cookie值
 * @param expiredays
 *            超时时间
 */
function setCookie(c_name, value, expirehours){
	var exdate=new Date();
	exdate.setHours(exdate.getHours() + expirehours);
	document.cookie=c_name+ "=" + escape(value) + ((expirehours==null) ? "" : ";expires="+exdate.toGMTString());
}

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
