Zepto(function($) {
	// 获得url参数
	var getVal = getRequest;
    // 餐馆id
	var supplierId =  getVal('supplierId');
	// 餐馆名字
	var supplierName = decodeURI(getVal('supplierName'));
	// 起送价
	var deliveryLeastValue = getVal('deliveryLeastValue');
	//运费
	var deliveryCharge = getVal('deliveryCharge');
	window.isRest =  getVal('isRest');
	window.pguid = getVal('pguid');
	var deviceId = getVal('deviceId');

	// 添加餐馆名称，起送价钱
 	$('.title').text(supplierName);
 	$('#unreach').text(deliveryLeastValue);
 	
	$.ajax({
		type : 'GET',
		datatype : 'json',
		url : getRootPath()+"/dishes?supplierId="+supplierId,
		success : function(data) {
			var categorys = data.categorys;
			var page = $('.listbottom:last');
			//$('.listbottom:first').after('<span>')
			// 解析map，key为分类名称，value为product List
			for(var i = 0; null != categorys && i < categorys.length; i++){
				var category = categorys[i];
		  	 	// 根据分类查询菜品
		  	 	product.load(category.id,page,category);
		  	 	
			}
			
		}

	});
	
	// 记录总金额
	var total = 0;
	// 记录总数量
	var count = 0;
	
	// 返回上一页
	$('#back').live('click', function() {
		history.go(-1);
	});
	// 去结算
	$('#nextstep').click(function() {
		// 统计页面信息，将信息组织成JSON格式
		// supplierId
		var foods = $('.food_list');

		var products=[];
		for(var j = 0; j < foods.length; j++){
			var amount = $(foods[j]).find('.num').text();
			var price =  $(foods[j]).find('.price_btn').text();
			price = price.substring(1,price.length);
			var id = $(foods[j]).find('.productId').text();
			var name = $(foods[j]).find('.food_name_full').text()
			//
			if(amount != 0){	  
				var product = {};  
				product["PPrice"] = parseFloat(price);
				product["id"] = parseInt(id);
				product["PName"] = name;  
				product["buyCount"] = parseInt(amount);
				
				products.push(product);  
				
			}
			
		}
		var json = stringToJson(cookieStr);
		json.products = products;

		json.supplier.id = parseInt(supplierId);
		json.supplier.companyName = supplierName;
		json.supplier.deliveryCharge = parseFloat(deliveryCharge);
		json.supplier.deliveryLeastValue = parseInt(deliveryLeastValue);
		
		json.deviceId = deviceId;
		json.pguid = window.pguid;
		setCookie("orderMsgs",jsonToStr(json),3);
		

	});
	
	$('.price_btn').live('click', function() {
				var _this = $(this);
				if(_this.attr('class').indexOf("closed") != -1){
					return false;
				}
				count++;
				var restruant = $(this).parents('.right_prt');
				
				var amount = restruant.find('.num').text();
				amount = parseInt(amount);
				restruant.find('.num').text(amount+1);
				restruant.find('.num').show();
				
				$('#totalnum').html(count);
				var price = $(this).parent().find('.price_btn').text();
				price = price.substring(1,price.length);
				price = parseFloat(price);
				total += price;
				
				$('.total_price').text(total);
				if (total < deliveryLeastValue) {
					$('#unreach').text(deliveryLeastValue - total);
				} else {
					$('.unreach').css('display', 'none');
					$('#nextstep').css('display', 'block');
				}
				return false;
			});

});

var product = {
		load : function(categoryId,page,category){
			$.ajax({
				type : 'GET',
				datatype : 'json',
				url : getRootPath()+"/product?pageSize=" + 1000 + "&pageNum=" + 0+"&categoryId="+categoryId,
				success : function(data) {
					var products = data.products;
					if(null == products || products.length == 0 ){
						
						return false;
					}
					var food_category = $('<div/>',{
	  	  	 			class:'food_category',
	  	  	 			text:category.cateNameCn.length>10?category.cateNameCn.substring(0,10)+'...':category.cateNameCn
	  	  	 		});
	  	  	 		// 将分类加入page
			  	 	page.before(food_category);
					for (var j = 0; null != products && j < products.length; j++) {
						var product = products[j];
						var aa = $('<div />', {
							class : 'food_list'
		
						});
						var bb = $('<div />',{
							class : 'food_item'
						});
						var cc = $('<div />',{
							class : 'left_prt'
						});
						// 菜名
						var dd = $('<span />', {
							class : 'food_name',
							text : product.PName
						});
						var ddd = $('<span />', {
							class : 'food_name_full',
							text : product.PName,
							style:'display:none'
						});
						// 菜品id
						var proId = $('<div/>',{
							class : 'productId',
							text:product.id,
							style:'display:none'
						});
						// 月销量
						var ee = $('<span />', {
							class : 'month_sales',
							text : '月销量' + product.buyCount
							
						});
						var ff = $('<div />',{
							class : 'right_prt'
						});
						var fff = $('<div />',{
							class : 'clear',
							style :'clear: both;'
						});
						// 判断菜品状态
						if(window.isRest == 1){
							// 单价
							var price = $('<a />', {
								class : 'price_btn closed',
								text : '￥' +  product.PPrice,
								
							});
							ff.append(price);
						}else{
							if(product.PStock == 1){
								// 单价
								var gg = $('<a />', {
									class : 'price_btn',
									text : '￥' +  product.PPrice,
									href:''
				
								});
								ff.append(gg);
							}else if(product.PStock == 0){
								// 单价
								var gg = $('<a />', {
									class : 'price_btn closed',
									text : '已售罄',
								
								});
								ff.append(gg);
							}
						}
						
						
						// 购买数量
						var hh = $('<span/>',{
							class:'num',
							text:'0',
							style:'display:none'
						});
						
						cc.append(dd, ddd, ee, proId);
						ff.append(hh);
						bb.append(cc, ff, fff);
						
						aa.append(bb);
						
						page.before(aa);
						
					}
					
				}
			});
		}
		
};
