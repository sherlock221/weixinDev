$(function(){MyOrderEvent.init()});var MyOrderConstant={},MyOrderUI={LIST:$("#order-list"),TEMPLATE:$("#order-tempalte")},MyOrderEvent={init:function(){MyOrderEvent.form()},form:function(){if(MyOrderConstant.orders=lg.get("currentOrder"),JString.isEmpty(MyOrderConstant.orders))return MyOrderUI.LIST.html("您还没有订单"),void 0;var e={result:MyOrderConstant.orders};WebPage.refreshTemplate(MyOrderUI.LIST,e,MyOrderUI.TEMPLATE)}},myOrder={};