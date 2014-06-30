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

	$('#toOrder').click(
			function() {
				$('#header .title').attr(
						'href',
						getRootPath() + '/cloudofcampus/selectArea.html?deviceId=' + deviceId + '&cityCode=' + cityCode
								+ '&cityName=' + cityName);
				$('#header .title').text(hotarea);
				$('#header .title').append('<i class="tran tran-top">');
				$('#pageone').show();
				$('#pagetwo').hide();
				$('#toOrder').addClass("active");
				$('#myOrder').removeClass("active");
				$('#toorder_icon').hide();
				$('#toorder_icon_active').show();
				$('#myorder_icon').show();
				$('#myorder_icon_active').hide();

				if (flag == "orderInfo" && !window.isRequest) {

					var pguid = stringToJson(getCookie('orderMsgs')).pguid;
					var url = getRootPath() + "/android/supplier!loadSupplierByHotArea.action?pguid=" + pguid;

					restaurant.load(deviceId, url);
					window.isRequest = true;
				}
			});

	$('#myOrder').click(function() {
		$('#header .title').attr('href', 'javascript:void(0)');
		$('#header .title').text('我的订单');
		$('#pageone').hide();
		$('#pagetwo').show();
		$('#toOrder').removeClass("active");
		$('#myOrder').addClass("active");
		$('#myorder_icon').hide();
		$('#myorder_icon_active').show();
		$('#toorder_icon').show();
		$('#toorder_icon_active').hide();
		if (!window.ismyRequest) {
			myOrder.load(window.deviceId);
			window.ismyRequest = true;
		}
		// var deviceId = stringToJson(getCookie('orderMsgs')).deviceId;
	});
});

var myOrder = {
	load : function(deviceId) {

		$.ajax({
			type : "get",
			url : getRootPath() + "/android/order!getOrdersByDeviceId.action?deviceId=" + deviceId,
			datatype : 'json',
			success : function(data) {
				if ("success" == data.errorCode) {
					var orders = stringToJson(data.orders);
					for (var i = 0; i < 5; i++) {
						if (orders[i] == undefined) {
							break;
						}
						var ord = orders[i];
						// new Date(ord.timeCreated).getFullYear()
						var time = new Date(ord.timeCreated);
						var year = time.getFullYear();
						var month = time.getMonth() + 1;
						var day = time.getDate();
						var hour = time.getHours();
						var minutes = time.getMinutes();
						var phoneArr = ord.supplier.contactPhone.split(";");
						var phone = "";
						for (var k = 0; phoneArr != null && k < phoneArr.length; k++) {
							var phoneTemp = phoneArr[k];
							if (phoneTemp != "") {
								phone += phoneTemp + ";";
							}
						}
						phone = phone.substring(0, phone.length - 1);
						var orderStatus = "";
						if (ord.orderType == 1) {
							switch (ord.orderStatue) { // 下单成功，等待接收|未提醒
							case "等待接收":
								orderStatus = "下单成功";
								break;
							case "已确认":
								orderStatus = "已确认";
								break;
							case "已派送":
								orderStatus = "已派送";
								break;
							case "异常":
								orderStatus = "已取消";
								break;
							default:
								orderStatus = ord.orderStatue;
								break;

							}
							//
						} else if (ord.orderType == 2) {
							// 短信接收
							switch (ord.orderStatue) { // 下单成功，等待接收|未提醒
							case "等待接收":
								orderStatus = "下单成功";
								break;
							case "已确认":
								orderStatus = "已确认";
								break;
							case "异常":
								orderStatus = "已取消";
								break;
							default:
								orderStatus = ord.orderStatue;
								break;

							}
						} else if (ord.orderType == 5) {
							// GPRS无线打印机,bugfixing
							switch (ord.orderStatue) { // 下单成功，等待接收|未提醒
							case "等待接收":
								orderStatus = "下单成功";
								break;
							case "已确认":
								orderStatus = "已确认";
								break;
							case "异常":
								orderStatus = "已取消";
								break;
							default:
								orderStatus = ord.orderStatue;
								break;

							}
						}
						var orderContent = '<li class="order_item">' + '<div class="res_info">'
								+ '<p class="res_title">' + ord.supplier.companyName + '</p>' + '<p>'
								+ '<span>餐厅电话：</span> <span>' + phone + '</span>' + '<p />' + '<p>'
								+ '<span>合计：</span> <span>' + ord.totalQuantity + '份 &nbsp;&nbsp;￥' + ord.totalAmount
								+ '</span>' + '</p>' + '<p>' + '<span>订单状态：</span> <span>' + orderStatus + '</span>'
								+ '</p>' + '</div>' + '<div style="overflow: hidden;" class="res_info">';
						for (var j = 0;; j++) {

							if (ord.products[j] == undefined) {
								break;
							}
							var product = ord.products[j];
							var arr = ord.note.split("]")
							var note = ord.note;
							var reachTime = "立即送达";
							if (arr.length > 1) {
								note = arr[1];
								reachTime = arr[0].substring(1, arr[0].length - 3);
							}

							orderContent += '<p>' + '<span class="foodname">' + product.PName
									+ '</span> <span class="order_num">' + product.buyCount
									+ '&nbsp;&nbsp;&times;</span>' + '<span class="price">￥' + product.PPrice
									+ '</span>' + '</p>' + '<p>';
						}

						orderContent += '<p>' + '<span class="foodname">配送费</span> <span class="order_num"></span>'
								+ '<span class="price">￥'
								+ ord.supplier.deliveryCharge
								+ '</span>'
								+ '</p>'
								+ '</div>'
								+ '<div class="other_info">'
								+ '<p>'
								+ '<span>备注：</span><span>'
								+ note
								+ '</span><br />'
								+ '</p>'
								+ '<p>'
								+ '<span>送达时间：</span><span>'
								+ reachTime
								+ '</span><br />'
								+ '</p>'
								+ '<p>'
								+ '<span>地址：</span><span>'
								+ ord.address
								+ '</span><br />'
								+ '</p>'
								+ '<p>'
								+ '<span>联系方式：</span><span>'
								+ ord.phone
								+ '</span>'
								+ '</p>'
								+ '<p>'
								+ '<span>下单时间：</span> <span>'
								+ year
								+ '年'
								+ month
								+ '月'
								+ day
								+ '日'
								+ ' ' + hour + ':' + minutes + '</span>' + '</p>' + '</div>' + '</li> ';
						$("#order_list").append(orderContent);

					}

				}

			}
		});
	}
}

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
								logo = 'img/shangjia.png';
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
								class : 'res_container',
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
								class : 'res_item',

							});
							var bb = $('<a/>', {
								class : 'resitem_a',
								href : getRootPath() + "/cloudofcampus/dishes.html?supplierId=" + supplierId
										+ "&supplierName=" + encodeURI(supplierName) + "&deliveryLeastValue="
										+ deliveryLeastValue + "&deviceId=" + deviceId + "&deliveryCharge="
										+ deliveryCharge + "&pguid=" + pguid + "&isRest=1"
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
