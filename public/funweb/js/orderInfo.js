Zepto(function($) {
	
	//读取本地存储
	var orderStr = lg.get("orderMsgs");
	var json = stringToJson(orderStr);

    //读取地址
    var addressInfo = stringToJson(lg.get("addressInfo"));
    var $phone = $("#phone");
    var $address = $("#address");
    if(addressInfo){
        $phone.val(addressInfo.phone);
        $address.val(addressInfo.address);
    }
	var supplierId = json.supplier.id;
	$.ajax({
		type : "get",
		url : getRootPath()
				+ "/supplier",
		datatype : 'json',
		data: {supplierId: supplierId},
		success : function(data) {



			if(data.errCode == null){

                //save address
                var restart = {
                    address :  data.supplier.companyAddress,
                    phone :  data.supplier.contactMobile + "  " + data.supplier.contactPhone
                };

                lg.save("reset",restart);

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
		var address =$address.val();
		var phone = $phone.val();
		if(address == ""){
			alert("请填写地址！");
		}else if(phone == ""){
			alert("请填写电话！");
			
		}else if(!checkPhone(phone)){
			alert("手机号格式不正确!");
		}else{
			var shortTelephone = $("#shortTelephone").val();
			var reachTime = $("#reachTime option:selected").text();
			if(reachTime == "立即送出"){
				reachTime = "";
			}else{
				reachTime ="["+reachTime+" 送达]";
			}
			var note = reachTime +$("#note").val();
			//读取本地存储
			var orderStr = lg.get("orderMsgs");

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

            //提请请求
			$.ajax({
				type : "post",
				url : getRootPath()
						+ "/order",
				datatype : 'json',
				data: {orderStr: orderStr},
				success : function(data) {
					if(data.errorCode == 'success'){

                        //成功存储最后一次地址
                        var  addressInfo = {
                            address : address,
                            phone :  phone
                        };
                        lg.save("addressInfo",addressInfo)
                        //餐馆地址
                        location.href = "/success";
						//alert('下单成功');

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
