function timeToNumber(e){var s=e.split(":");return parseInt(s[0]+""+s[1])}function checkPhone(e){var s=/^(1)\d{10}$/;return 0==s.test(e)?!1:!0}var OrderInfoUI={$phone:$("#phone"),$address:$("#address")},OrderInfoConstant={},OrderInfoEvent={init:function(){var e=lg.get("orderMsgs"),s=lg.get("addressInfo");s&&(OrderInfoUI.$phone.val(s.phone),OrderInfoUI.$address.val(s.address)),OrderInfoConstant.supplierId=e.supplier.id,OrderInfoAjax.supplier(OrderInfoConstant.supplierId),this.form()},form:function(){$("input").focus(function(){this.value==this.defaultValue&&(this.value="")}),$("input").blur(function(){""==this.value&&(this.value=this.defaultValue)}),$("#submit").click(function(){var e=OrderInfoUI.$address.val(),s=OrderInfoUI.$phone.val();if(""==e)alert("请填写地址！");else if(""==s)alert("请填写电话！");else if(checkPhone(s)){var t=$("#shortTelephone").val(),a=$("#reachTime option:selected").text();a="立即送出"==a?"":"["+a+" 送达]";var r=a+$("#note").val(),n=lg.get("orderMsgs"),i=n;i.address=e,i.phone=s,"添加备注（选填）"==r&&(r=""),i.note=r,i.shortTelephone=t,n=JSON.stringify(i),OrderInfoAjax.post(n,e,s)}else alert("手机号格式不正确!")})}},OrderInfoAjax={url:{supplier:"/supplier",order:"/order"},supplier:function(e){AjaxUtil.get(OrderInfoAjax.url.supplier,{supplierId:e},function(e){if(null==e.errCode){var s={address:e.supplier.companyAddress,phone:e.supplier.contactMobile+"  "+e.supplier.contactPhone};lg.save("reset",s);var t=new Date,a=t.getHours(),r=t.getMinutes(),n=e.supplier.sendBeginAm,i=e.supplier.sendEndAm,o=e.supplier.sendBeginPm,l=e.supplier.sendEndPm,p=parseInt(a+""+(10>r?"0"+r:r)),d=a,u=r;timeToNumber(n)>p?(d=parseInt(n.split(":")[0]),u=parseInt(n.split(":")[1])):p>timeToNumber(i)&&timeToNumber(o)>p&&(d=parseInt(o.split(":")[0]),u=parseInt(o.split(":")[1])),u-=u%15,u+=45,u>=60&&(d+=1,u-=60);for(var m="",c=1;parseInt(d+""+(10>u?"0"+u:u))<timeToNumber(i);)m+="<option value='"+c+"'>"+d+":"+(0==u?"00":u)+"</option>",c++,u+=15,u>=60&&(u=0,d+=1);for(parseInt(d+""+(10>u?"0"+u:u))<timeToNumber(o)&&(d=parseInt(o.split(":")[0]),u=parseInt(o.split(":")[1]));parseInt(d+""+(0==u?"00":u))<timeToNumber(l);)m+="<option value='"+c+"'>"+d+":"+(0==u?"00":u)+"</option>",c++,u+=15,u>=60&&(u=0,d+=1);$("#reachTime").append(m)}else alert("加载错误，请重试！")})},post:function(e,s,t){AjaxUtil.post(OrderInfoAjax.url.order,{orderStr:e},function(a){if("success"==a.errorCode){var r={address:s,phone:t,companyName:e.supplier.companyName};lg.save("addressInfo",r);var n=lg.get("orderMsgs");n.reset=lg.get("reset");var i=lg.get("currentOrder");i||(i=[]),i.push(n),lg.save("currentOrder",i),location.href="/success"}else alert(a.errorCode)})}};Zepto(function(){OrderInfoEvent.init()});