Zepto(function($) {
	function changeTwoDecimal(floatvar) {
		var f_x = parseFloat(floatvar);
		if (isNaN(f_x)) {
			console.log('function:changeTwoDecimal->parameter error');
			return false;
		}
		var f_x = Math.round(floatvar * 100) / 100;
		return f_x;
	}
//		var zz = $('<img/>', {
//			src : 'img/back.png',
//			id : "back"
//		});
		//$('#header').prepend(zz);
        var order = lg.get("orderMsgs");
		var data = order;
		var sub = 0;
		var m = 0;
		for (i = 0; ; i++) {
			if(data.products[i] == undefined){
				break;
			}
			var bb = $("<li />", {
				class : 'fooditem'
			});
			var aa = $('<div />', {
				text : data.products[i].PName,
				class : 'dingdan'
			});
			
			
			var aaa = $('<div />', {
				text : data.products[i].PName,
				class : 'dingdan_fullname',
				style:'display:none'
			});

			var cc = $('<a />', {
				class : 'fuhaowai'
			});
			var ee = $('<span />', {
				type : 'text',
				class : 'shuliang',
				text : data.products[i].buyCount,
				name:data.products[i].buyCount
			});
			
			var dd = $('<img />', {
				class : 'fuhao jian',
				src:'/funweb/img/minus.png'
			});
			var ff = $('<img />', {
				class : 'fuhao jia',
				src:'/funweb/img/plus.png'
			});
			var gg = $('<a />', {
				class : 'fuhaowai'
			});

			var ii = $('<div />', {
				class : 'xuanze',
				css : {
					display : 'block',
					float : 'right',
					'margin-right':'5px'
				}
			});
			var jj = $('<span />', {
				text : data.products[i].PPrice + '元',
				css : {
					float : 'right',
					width : '50px',
					'text-align' : 'center'
				},
				class : 'dingdan danjia'
			});
			
			gg.append(ff);
			cc.append(dd);
			ii.append(gg, ee, cc);
			bb.append(aa ,aaa,ii,jj);
			$('.food_cart').append(bb);
			sub = sub + data.products[i].buyCount * data.products[i].PPrice;
			m = m + data.products[i].buyCount * 1;
			
		}
		var delivery = $('<li>', {
			class : 'fooditem',
			id : 'delivery_fee'
		}).appendTo('.food_cart');
		delivery.append($('<span>', {
			class : "item_title",
			text : '配送费'
		}));
		sub = (parseFloat(sub)+ parseFloat(data.supplier.deliveryCharge)).toFixed(2);
		delivery.append($('<span>', {
			class : "foodprice",
			text : data.supplier.deliveryCharge+'元'
		}));
		$('#submoney').text(sub);
		$('#ms').text(m);

        //更新总金额
        order.totalPrice = (sub - 0);
        lg.save("orderMsgs",order);


	$('#back').bind('click', function() {
		
		history.go(-1);
	});
	$('.shuliang').bind('change',function(){
		if(!checkNum($(this).val())){
			alert("菜品数量必须为正整数！");
			$(this).val($(this).attr("name"));
			return false;
		}else{
			var _this = $(this);
			var sub = parseFloat($('#submoney').text());
			var parent = _this.parents('.fooditem');
			var price = parseFloat(parent.find('.danjia').text().substring(0,parent.find('.danjia').text().length - 1))
			sub += (parseInt(_this.val()) - parseInt(_this.attr('name'))) * price;
			$('#submoney').text(sub.toFixed(1));
			var mount = $('#ms').text();
			mount = parseInt(mount) + (parseInt(_this.val()) - parseInt(_this.attr('name')));
			$('#ms').text(mount);
			_this.attr('name',_this.val());
		}
	});
	//提交校验
	$('.btn_100').bind('click', function() {
		var result = true;
		var total = parseFloat($("#submoney").text());
		var data = JSON.stringify(lg.get("orderMsgs"));
		var foodList = $(".fooditem");
		for(var i = 0; i < foodList.length - 1; i++){
			var food = foodList[i];
			var amount = $(food).find(".shuliang").text();
			if(!checkNum(amount)){
				alert("菜品数量必须为正整数！");
				return false;
			}
		} 
		if(total < (parseFloat(data.supplier.deliveryLeastValue) + parseFloat(data.supplier.deliveryCharge))){
			alert("起送价为"+data.supplier.deliveryLeastValue);
			return false;
		}else {
			for(var i = 0; i < foodList.length - 1; i++){
				var food = foodList[i];
				var amount = $(food).find(".shuliang").text();
				data.products[i].buyCount = amount;
			}
			var totalAmount1 = parseFloat($('#submoney').text());
			var totalQuantity1 = parseInt($('#ms').text());
			data.totalQuantity = totalQuantity1;
			data.totalAmount = totalAmount1;
			lg.save('orderMsgs', JSON.parse(data));
	
		}
	});
	
	
	
	$('.jia').bind('click',function() {
				var ss = $(this).parents('.xuanze').find('span').text();
				var xx = parseInt(ss);
				$(this).parents('.xuanze').find('span').text(xx + 1);

				var abc = $('#ms').text();
				$('#ms').text(abc * 1 + 1);
				var def = changeTwoDecimal($(this).parents('.fooditem').find(
						'.danjia').text().replace(/[^0-9\.]/ig, ""))
				var sub = $('#submoney').text();
				$('#submoney').text(changeTwoDecimal(sub * 1 + def * 1));


			});
	$('.jian').bind('click',function() {
				var ss = $(this).parents('.xuanze').find('span').text();
				if (ss * 1 > 0) {
					var xx = parseInt(ss);
					$(this).parents('.xuanze').find('span').text(xx - 1);

					var abc = $('#ms').text();
					$('#ms').text(abc * 1 - 1);
					var def = changeTwoDecimal($(this).parents('.fooditem')
							.find('.danjia').text().replace(/[^0-9\.]/ig, ""))
					var sub = $('#submoney').text();
					$('#submoney').text(changeTwoDecimal(sub * 1 - def * 1));
				}
			})
});

function checkNum(obj)
{
	var re = /^\d+$/;
    if (!re.test(obj)){
        return false;
     }
    return true;
} 