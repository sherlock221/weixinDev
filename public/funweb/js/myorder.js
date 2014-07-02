//下单

$(function(){
    var orders = stringToJson(lg.get("orderMsgs"));
    var reset = lg.get("reset",restart);
    orders.reset = reset;
    myOrder.load(orders);
});


var myOrder = {
    load : function(orders) {
                    var ord = orders[i];
                    // new Date(ord.timeCreated).getFullYear()
                    var time = new Date();
                    var year = time.getFullYear();
                    var month = time.getMonth() + 1;
                    var day = time.getDate();
                    var hour = time.getHours();
                    var minutes = time.getMinutes();
                    var phone = orders.reset.phone;
                    var   orderStatus = "下单成功";


                    var orderContent = '<li class="order_item">' + '<div class="res_info">'
                        + '<p class="res_title">' + orders.supplier.companyName + '</p>' + '<p>'
                        + '<span>餐厅电话：</span> <span>' + phone + '</span>' + '<p />' + '<p>'
                        + '<span>合计：</span> <span>' + orders.products.length + '份 &nbsp;&nbsp;'
                        + '</span>' + '</p>'
                        + '</div>' + '<div style="overflow: hidden;" class="res_info">';


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