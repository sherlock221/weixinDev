var DishesUI={calc:$("#nextstep")},DishesConstant={params:{}},DishesEvent={init:function(){this.getParam(),DishesAjax.loadDishes(DishesConstant.params.supplierId),DishesEvent.form()},getParam:function(){DishesConstant.params.supplierId=Request.getSerParams("supplierId"),DishesConstant.params.supplierName=decodeURI(Request.getSerParams("supplierName")),DishesConstant.params.deliveryLeastValue=Request.getSerParams("deliveryLeastValue"),DishesConstant.params.deliveryCharge=Request.getSerParams("deliveryCharge"),DishesConstant.params.isRest=Request.getSerParams("isRest"),DishesConstant.params.pguid=Request.getSerParams("pguid"),DishesConstant.params.deviceId=Request.getSerParams("deviceId"),$(".title").text(DishesConstant.params.supplierName),$("#unreach").text(DishesConstant.params.deliveryLeastValue)},form:function(){var e=0,s=0;DishesUI.calc.bind("click",function(){for(var e=$(".food_list"),s=[],t=0;e.length>t;t++){var a=$(e[t]).find(".num").text(),i=$(e[t]).find(".price_btn").text();i=i.substring(1,i.length);var r=$(e[t]).find(".productId").text(),n=$(e[t]).find(".food_name_full").text();if(0!=a){var l={};l.PPrice=parseFloat(i),l.id=parseInt(r),l.PName=n,l.buyCount=parseInt(a),s.push(l)}}var p={supplier:{}};p.products=s,p.supplier.id=parseInt(DishesConstant.params.supplierId),p.supplier.companyName=DishesConstant.params.supplierName,p.supplier.deliveryCharge=parseFloat(DishesConstant.params.deliveryCharge),p.supplier.deliveryLeastValue=parseInt(DishesConstant.params.deliveryLeastValue),p.deviceId=DishesConstant.params.deviceId,p.pguid=DishesConstant.params.pguid,p.totalPrice=$(".total_price").text()-0,p.crtTime=DateUtil.getYYMMDDHHMM(),lg.save("orderMsgs",p)}),$(".price_btn").live("click",function(){console.log("点击");var t=$(this);if(-1!=t.attr("class").indexOf("closed"))return!1;s++;var a=$(this).parents(".right_prt"),i=a.find(".num").text();i=parseInt(i),a.find(".num").text(i+1),a.find(".num").show(),$("#totalnum").html(s);var r=$(this).parent().find(".price_btn").text();return r=r.substring(1,r.length),r=parseFloat(r).toFixed(1)-0,e=(e+r).toFixed(1)-0,$(".total_price").text(e),DishesConstant.params.deliveryLeastValue>e?$("#unreach").text(DishesConstant.params.deliveryLeastValue-e):($(".unreach").css("display","none"),$("#nextstep").css("display","block")),!1})}},DishesAjax={url:{dishes:"/dishes",product:"/product"},loadDishes:function(e){AjaxUtil.get(DishesAjax.url.dishes,{supplierId:e},function(e){for(var s=e.categorys,t=$(".listbottom:last"),a=0;null!=s&&s.length>a;a++){var i=s[a];DishesAjax.loadProduct(i.id,t,i)}})},loadProduct:function(e,s,t){af_load.show(),AjaxUtil.get(DishesAjax.url.product,{pageSize:1e3,pageNum:1,categoryId:e},function(e){af_load.hide();var a=e.products;if(null==a||0==a.length)return!1;var i=$("<div/>",{"class":"food_category",text:t.cateNameCn.length>10?t.cateNameCn.substring(0,10)+"...":t.cateNameCn});s.before(i);for(var r=0;null!=a&&a.length>r;r++){var n=a[r],l=$("<div />",{"class":"food_list"}),p=$("<div />",{"class":"food_item"}),o=$("<div />",{"class":"left_prt"}),d=$("<span />",{"class":"food_name",text:n.PName}),c=$("<span />",{"class":"food_name_full",text:n.PName,style:"display:none"}),u=$("<div/>",{"class":"productId",text:n.id,style:"display:none"}),h=$("<span />",{"class":"month_sales",text:"月销量"+n.buyCount}),m=$("<div />",{"class":"right_prt"}),v=$("<div />",{"class":"clear",style:"clear: both;"});if(1==window.isRest){var f=$("<a />",{"class":"price_btn closed",text:"￥"+n.PPrice});m.append(f)}else if(1==n.PStock){var g=$("<a />",{"class":"price_btn",text:"￥"+n.PPrice,href:""});m.append(g)}else if(0==n.PStock){var g=$("<a />",{"class":"price_btn closed",text:"已售罄"});m.append(g)}var D=$("<span/>",{"class":"num",text:"0",style:"display:none"});o.append(d,c,h,u),m.append(D),p.append(o,m,v),l.append(p),s.before(l)}})}};Zepto(function(){DishesEvent.init()});