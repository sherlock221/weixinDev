//下单

$(function(){

    var openId = "";
    myOrder.load(openId);
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