Zepto(function($) {
	// 获取请求url中的参数
	var parameters = getServerReq;
	window.isRequest = false;
	window.ismyRequest = false;
	var latitude = parameters('latitude');
	var longitude = parameters('longitude');
	window.deviceId = parameters('deviceId');
	window.pguid = parameters('pguid');
	window.hotarea = parameters('hotarea');
	window.cityCode = parameters('cityCode');
	window.cityName = parameters('cityName');
	var flag = parameters('flag');

    var url = getRootPath() + "/restaruratlist";
    restaurant.load(url,latitude,longitude);
});


var restaurant = {
	load : function(url,latitude,longitude) {
        $.ajax({
					type : "get",
					url : url,
                    data : {
                        latitude : latitude,
                        longitude : longitude
                    },
					datatype : 'json',
                    error   : function(){

                    },
					success : function(data) {
						var pguid = data.pguid;
						// 服务器传回的data包含一个supplier的List
						var supplierList = data.suppliers;

                        $("#titleBar").text(data.areaName);

						// 把休息中的餐厅单独存放，因为休息中的餐厅需要排在最后面
						var restSuppliers = new Array();// 存放休息中的餐厅
						var ortherSuppliers = new Array();// 存放除了休息状态以外的餐厅
						// 正常为1，休息为2
						for (var i = 0, j = 0, k = 0; i < supplierList.length; i++) {
							// 状态为暂停营业
							var supplier = supplierList[i];
							// 上午开始营业时间
							var openTimeAm = supplier.openTimeAm;
							// 上午停止营业时间
							var closeTimeAm = supplier.closeTimeAm;
							// 上午开始配送时间
							var sendBeginAm = supplier.sendBeginAm;

							// 下午开始营业时间
							var openTimePm = supplier.openTimePm;
							// 下午停止营业时间
							var closeTimePm = supplier.closeTimePm;
							// 下午开始配送时间
							var sendBeginPm = supplier.sendBeginPm;

							// 得到当前时间
							var now = new Date();
							var hour = now.getHours();
							var minutes = now.getMinutes();

							var currentTime = parseInt(hour + "" + (minutes < 10 ? "0" + minutes : minutes));

							// 根据时间判断当前餐馆是否为休息状态
							var isRest = currentTime < timeToNumber(openTimeAm)
									|| (currentTime > timeToNumber(closeTimeAm) && currentTime < timeToNumber(openTimePm))
									|| currentTime > timeToNumber(closeTimePm);

							if (supplier.serviceStatus == 2 || isRest) {
								restSuppliers[j] = supplier;

								j++;
							} else {
								ortherSuppliers[k] = supplier;

								k++;
							}

						}
						// 渲染页面,未休息的餐馆
						for (var i = 0; i < ortherSuppliers.length; i++) {

							var supplier = ortherSuppliers[i];

							var supplierId = supplier.id;
							var supplierName = supplier.companyName;
							// 起送价钱
							var deliveryLeastValue = supplier.deliveryLeastValue

							// 运费
							var deliveryCharge = supplier.deliveryCharge;
							var aa = $('<li/>', {
								class : 'res_item',

							});
							var bb = $('<a/>', {
								class : 'resitem_a',
								href : getRootPath() + "/dishesPage?supplierId=" + supplierId
										+ "&supplierName=" + encodeURI(supplierName) + "&deliveryLeastValue="
										+ deliveryLeastValue + "&deviceId=" + deviceId + "&deliveryCharge="
										+ deliveryCharge + "&pguid=" + pguid
							});
							var logo;
							if (supplier.logoImg) {
								logo = supplier.logoImg;
							} else {
								logo = '/funweb/img/shangjia.png';
							}

							var cc = $('<img/>', {
								class : 'res_logo',
								src : logo
							});

							var supId = $('<div/>', {
								clss : "supplierId",
								text : supplier.id,
								style : 'display : none'
							});
							var dd = $('<div/>', {
								class : 'res_container'
							});
							var ee = $('<span/>', {
								class : 'res_title',
								text : supplier.companyName
							});

							var ff = $('<div/>', {
								class : 'res_status preorder'
							});

							var ii = $('<span/>', {
								class : 'res_info',
								text : supplier.deliveryLeastValue + '元起送'
							});
							var kk = $('<span/>', {
								class : 'res_info',
								text : supplier.deliveryTime + '分钟'
							});
							var mm = $('<span/>', {
								class : 'res_info',
								style : 'display:none'
							});

							if ((currentTime > timeToNumber(supplier.openTimeAm) && currentTime < timeToNumber(supplier.sendBeginAm))
									|| (currentTime > timeToNumber(supplier.openTimePm) && currentTime < timeToNumber(supplier.sendBeginPm))) {

								var ss = $('<span/>', {
									class : 'icon',
									text : '接收预定中'
								});
								var time = supplier.sendBeginAm;
								if (currentTime > timeToNumber(supplier.openTimePm)) {
									time = supplier.sendBeginPm;
								}
								var hh = $('<span/>', {
									class : 'res_info',
									text : time + '开始配送'

								});
								ff.append(ss, hh);
							} else {
								var star = $('<span/>', {
									class : 'star star_' + supplier.gradePoint
								});
								ff.append(star);
							}

							dd.append(ee, ff, ii, kk, mm, supId);
							bb.append(cc, dd);
							aa.append(bb);
							$('#rest_list').append(aa);
						}
						// 渲染休息状态的餐馆
						for (var i = 0; i < restSuppliers.length; i++) {
							var supplier = restSuppliers[i];

							var supplierId = supplier.id;
							var supplierName = supplier.companyName;
							// 起送价钱
							var deliveryLeastValue = supplier.deliveryLeastValue

							// 运费
							var deliveryCharge = supplier.deliveryCharge;
							var aa = $('<li/>', {
								class : 'res_item'
							});
							var bb = $('<a/>', {
								class : 'resitem_a'
//								href : getRootPath() + "/cloudofcampus/dishes.html?supplierId=" + supplierId
//										+ "&supplierName=" + encodeURI(supplierName) + "&deliveryLeastValue="
//										+ deliveryLeastValue + "&deviceId=" + deviceId + "&deliveryCharge="
//										+ deliveryCharge + "&pguid=" + pguid + "&isRest=1"
							});

							var logo;
							if (supplier.logoImg) {
								logo = supplier.logoImg;
							} else {
								logo = 'img/shangjia.png';
							}

							var cc = $('<img/>', {
								class : 'res_logo',
								src : logo
							});
							var dd = $('<div/>', {
								class : 'res_container',
							});
							var ee = $('<span/>', {
								class : 'res_title',
								text : supplier.companyName
							});

							var ss = $('<span/>', {
								class : 'icon',
								text : '餐厅休息中'
							});
							var ff = $('<div/>', {
								class : 'res_status closed'
							});

							var hh = $('<span/>', {
								class : 'res_info',
								text : '之前订单均有效'

							});
							var ii = $('<span/>', {
								class : 'res_info',
								text : supplier.deliveryLeastValue + '元起送'
							});
							var kk = $('<span/>', {
								class : 'res_info',
								text : supplier.deliveryTime + '分钟'
							});
							var mm = $('<span/>', {
								class : 'res_info'
							});
							ff.append(ss);
							ff.append(hh);
							dd.append(ee, ff, ii, kk, mm);
							bb.append(cc, dd);
							aa.append(bb);
							$('#rest_list').append(aa);
						}
					}
				});
	}
}

function timeStran(time) {
}

function timeToNumber(time) {

	var ts = time.split(":");
	return parseInt(ts[0] + "" + ts[1]);
}
