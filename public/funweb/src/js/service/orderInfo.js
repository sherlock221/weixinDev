
var OrderInfoUI = {
    $phone : $("#phone"),
    $address :  $("#address")
};


//常量
var OrderInfoConstant = {
};

//事件处理
var OrderInfoEvent = {
    init : function(){

        //读取本地存储
        var json =  lg.get("orderMsgs");
        //读取地址
        var addressInfo = lg.get("addressInfo");
        if(addressInfo){
            OrderInfoUI.$phone.val(addressInfo.phone);
            OrderInfoUI.$address.val(addressInfo.address);
        }
        OrderInfoConstant.supplierId =json.supplier.id;

        //加载数据
        OrderInfoAjax.supplier(OrderInfoConstant.supplierId);

        //绑定事件
        this.form();
    },

    form : function(){

        $('input').focus(function() {
            if (this.value == this.defaultValue) {
                this.value = '';
            }
        });

        $('input').blur(function() {
            if (this.value == '') {
                this.value = this.defaultValue;
            }
        });
        $('#submit').click(function() {
            //信息校验
            var user = lg.get("user");
            var address =OrderInfoUI.$address.val();
            var phone = OrderInfoUI.$phone.val();
            if(JString.isEmpty($.trim(address))){
                alert("请填写地址！");
            }else if(address.length > 60){
                alert("地址过长，请检查!");
            }
            else if(JString.isEmpty(user)){
                alert("无法找到openId!");
            }
            else if(JString.isEmpty($.trim(phone))){
                alert("请填写电话！");
            }else if(!checkPhone(phone)){
                alert("手机号格式不正确!");
            }
            else{
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
                orderStr.deviceId = user.openId;
                var companyName = orderStr.supplier.companyName;
                var json = orderStr;
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
                orderStr = JSON.stringify(json);
                OrderInfoAjax.post(orderStr,companyName,address,phone);
            }
            return false;
        });
    }
};

//ajax异步
var OrderInfoAjax = {
    url : {supplier:"/supplier", order : "/order"},
    supplier : function(supplierId){
        AjaxUtil.get(OrderInfoAjax.url.supplier,{supplierId:supplierId},function(data){
            if(data.errCode == null){
                //save address
                var restart = {
                    address :  data.supplier.companyAddress,
                    phone :  data.supplier.contactMobile,
                    companyName :  data.supplier.companyName
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
        });
    },

    post : function(orderStr,companyName,address,phone){
        AjaxUtil.post(OrderInfoAjax.url.order,{orderStr:orderStr},function(data){
            if(data.errorCode == 'success'){

                //成功存储最后一次地址
                var  addressInfo = {
                    address : address,
                    phone :  phone

                };
                lg.save("addressInfo",addressInfo);
                var orderMsg = lg.get("orderMsgs");
                orderMsg.reset = lg.get("reset");


                //save order
                var currentOrder = lg.get("currentOrder");
                if(!currentOrder){
                    currentOrder = new Array();
                }
                   currentOrder.push(orderMsg);
                lg.save("currentOrder",currentOrder);


                //餐馆地址
                location.href = "/success";

            }else{
                alert(data.errorCode);
            }

        });
    }

};



Zepto(function($) {
    OrderInfoEvent.init();
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
