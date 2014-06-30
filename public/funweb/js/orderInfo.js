Zepto(function($) {
	
	//读取cookie
	var orderStr = getCookie("orderMsgs");
	var json = stringToJson(orderStr);
	var supplierId = json.supplier.id;
	$.ajax({
		type : "post",
		url : getRootPath()
				+ "/android/cloudOfCampus!loadSupplierById.action",
		datatype : 'json',
		data: {supplierId: supplierId},
		success : function(data) {
			if(data.errCode == null){
				
				// 得到当前时间
				var now = new Date();
				var hour = now.getHours();
				var minutes = now.getMinutes();
				var sendBeginAm = data.supplier.sendBeginAm;
				var sendEndAm = data.supplier.sendEndAm;
				var sendBeginPm = data.supplier.sendBeginPm;
				var sendEndPm = data.supplier.sendEndPm;
				//alert(hour+""+minutes);
				var currTime = parseInt(hour+""+(minutes<10?("0"+minutes):minutes));
				//当前时间小于上午开始送餐时间
				var changeHour = hour;
				var changeMinute = minutes;
				if(currTime < timeToNumber(sendBeginAm)){
					changeHour = parseInt(sendBeginAm.split(":")[0]);
					changeMinute = parseInt(sendBeginAm.split(":")[1]);
					
				}else if(currTime > timeToNumber(sendEndAm) &&currTime < timeToNumber(sendBeginPm)){
					changeHour = parseInt(sendBeginPm.split(":")[0]);
					changeMinute = parseInt(sendBeginPm.split(":")[1]);
				}
				changeMinute -= changeMinute%15;
				changeMinute += 45;
				if(changeMinute >= 60){
					changeHour += 1;
					changeMinute -= 60;
				}
				//alert(changeHour+"-"+changeMinute);
				var options = "";
					var i = 1;
					while(parseInt(changeHour+""+(changeMinute<10?("0"+changeMinute):changeMinute)) < timeToNumber(sendEndAm)){
						options += "<option value='"+i+"'>"+changeHour+":"+(changeMinute==0? "00":changeMinute)+"</option>"
						i++;
						changeMinute += 15;
						if(changeMinute >= 60){
							changeMinute = 0;
							changeHour += 1;
						}

					}
					if(parseInt(changeHour+""+(changeMinute<10?("0"+changeMinute):changeMinute)) < timeToNumber(sendBeginPm)){
						changeHour = parseInt(sendBeginPm.split(":")[0]);
						changeMinute = parseInt(sendBeginPm.split(":")[1]);
					}
					
					while(parseInt(changeHour+""+(changeMinute==0?"00":changeMinute)) < timeToNumber(sendEndPm)){
						
						options += "<option value='"+i+"'>"+changeHour+":"+(changeMinute==0? "00":changeMinute)+"</option>"
						i++;
						changeMinute += 15;
						if(changeMinute >= 60){
							changeMinute = 0;
							changeHour += 1;
						}
					}
					
					$("#reachTime").append(options);
					
				
				
			}else{
				alert("加载错误，请重试！");
			}
		}
	});
	
	$('input').focus(function() {
		if (this.value == this.defaultValue) {
			this.value = '';
		}
	});
	
	$('#back').live('click', function() {
		
		history.go(-1);
	});
	$('input').blur(function() {
		if (this.value == '') {
			this.value = this.defaultValue;
			;
		}
	});
	$('#submit').click(function() {
		//信息校验
		var address = $("#address").val();
		var phone = $("#phone").val();
		if(address == ""){
			alert("请填写地址！");
		}else if(phone == ""){
			alert("请填写电话！");
			
		}else if(!checkPhone(phone)){
			alert("手机号格式不正确!");
		}else{
			//
			var shortTelephone = $("#shortTelephone").val();
			var reachTime = $("#reachTime option:selected").text();
			if(reachTime == "立即送出"){
				reachTime = "";
			}else{
				reachTime ="["+reachTime+" 送达]";
			}
			var note = reachTime +$("#note").val();
			//读取cookie
			var orderStr = getCookie("orderMsgs");
			var json = stringToJson(orderStr);
			json.address = address;
			json.phone = phone;
//			var temp = note.split("(");
//			if(temp.length > 1){
//				note = "";
//			}
			if("添加备注（选填）" == note){
				note = "";
			}
			json.note = note;
			json.shortTelephone = shortTelephone;
			orderStr = jsonToStr(json);
			//将cookie发送到
			//"android/order!submitOrder.action"
		
			$.ajax({
				type : "post",
				url : getRootPath()
						+ "/android/order!submitOrder.action",
				datatype : 'json',
				data: {orderStr: orderStr},
				success : function(data) {
					if(data.errorCode == 'success'){
						alert('下单成功');
						
						window.location.href=getRootPath()+"/cloudofcampus/restaurantList.html?flag=orderInfo";
						
					}else{
						alert(data.errorCode);
					}
				}
			});
		}
		
	});

});

function timeToNumber(time){
	var arr = time.split(":");
	return parseInt(arr[0]+""+arr[1]);
}

function checkPhone(phone)   
{
//验证电话号码手机号码，包含至今所有号段   
var ab=/^(1)\d{10}$/;

  if(ab.test(phone) == false)
  {
    return false;
  }
 return true;
}
