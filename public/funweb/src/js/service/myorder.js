//下单

$(function(){
    MyOrderEvent.init();
});
var MyOrderConstant = {};

var MyOrderUI = {
    LIST  : $("#order-list"),
    TEMPLATE : $("#order-tempalte")
};

var MyOrderEvent = {

    init : function(){

        template.helper('dateFormat', function (content) {
            var date = new Date(content);
            return DateUtil.getYYMMDDHHMM(date)
        });

        MyOrderConstant.openId = Request.getSerParams('openId');
        MyOrderEvent.form();

    },

    currentDateOrder : function(orders){
            var newArray = [];
            var currentDate = DateUtil.getYYMMDD();
            for(var j=0 ;j<orders.length;j++){
                    var o =  orders[j];
                    var dateTime = o.crtTime;
                    var date = dateTime.substring(0,10);
                   if(date == currentDate){
                       newArray.push(o);
                   }
            };
        lg.save("currentOrder",newArray);
        MyOrderConstant.orders = newArray;
    },
    form : function(){
        //保留当天日期订单
        //MyOrderEvent.currentDateOrder(MyOrderConstant.orders)
//        if(JString.isEmpty(openId)){
//            MyOrderUI.LIST.html("您今日没有订单!");
//            return;
//        };
        myOrder.getOrder(MyOrderConstant.openId);
    }
};

var myOrder = {
    url: {myOrder: "/getOrder"},
    getOrder: function (openId) {
        AjaxUtil.get(myOrder.url.myOrder, {openId: openId}, function (data) {
            WebPage.refreshTemplate(MyOrderUI.LIST,data, MyOrderUI.TEMPLATE);
        });
    }
}