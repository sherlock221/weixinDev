var DishesUI = {
    //结算
    calc : $("#nextstep")
};


var DishesConstant = {
    params: {}
};


var DishesEvent = {

    //初始化
    init: function () {
        this.getParam();
        //加载数据
        DishesAjax.loadDishes(DishesConstant.params.supplierId);
        //事件初始化
        DishesEvent.form();
    },


    getParam: function () {
        // 餐馆id
        DishesConstant.params.supplierId = Request.getSerParams('supplierId');
        // 餐馆名字
        DishesConstant.params.supplierName = decodeURI(Request.getSerParams('supplierName'));
        // 起送价
        DishesConstant.params.deliveryLeastValue = Request.getSerParams('deliveryLeastValue');
        //运费
        DishesConstant.params.deliveryCharge = Request.getSerParams('deliveryCharge');
        DishesConstant.params.isRest = Request.getSerParams('isRest');
        DishesConstant.params.pguid = Request.getSerParams('pguid');
        var openId =  Request.getSerParams('openId');

        lg.save("user",{openId : openId});

        // 添加餐馆名称，起送价钱
        $('.title').text(DishesConstant.params.supplierName);
        $('#unreach').text(DishesConstant.params.deliveryLeastValue);
    },

    form : function(){

        // 记录总金额
        var total = 0;
        // 记录总数量
        var count = 0;

        // 去结算
        DishesUI.calc.bind("click",function () {
            // 统计页面信息，将信息组织成JSON格式
            // supplierId
            var foods = $('.food_list');
            var products = [];
            var  totalPrice = 0;
            for (var j = 0; j < foods.length; j++) {
                var amount = $(foods[j]).find('.num').text();
                var price = $(foods[j]).find('.price_btn').text();
                price = price.substring(1, price.length);
                var id = $(foods[j]).find('.productId').text();
                var name = $(foods[j]).find('.food_name_full').text()
                //
                if (amount != 0) {
                    var product = {};
                    product["PPrice"] = parseFloat(price);

                    product["id"] = parseInt(id);
                    product["PName"] = name;
                    product["buyCount"] = parseInt(amount);
                    products.push(product);
                }
            }
            var json = {
                supplier: {}
            };
            json.products = products;
            json.supplier.id = parseInt(DishesConstant.params.supplierId);
            json.supplier.companyName = DishesConstant.params.supplierName;
            json.supplier.deliveryCharge = parseFloat(DishesConstant.params.deliveryCharge);
            json.supplier.deliveryLeastValue = parseInt(DishesConstant.params.deliveryLeastValue);
            json.deviceId = DishesConstant.params.deviceId;
            json.pguid = DishesConstant.params.pguid;
            json.totalPrice = ($(".total_price").text()) -0;
            json.crtTime  =  DateUtil.getYYMMDDHHMM();
            lg.save("orderMsgs", json);

        });

        $('.price_btn').live('click', function () {
            console.log("点击");
            var _this = $(this);
            if (_this.attr('class').indexOf("closed") != -1) {
                return false;
            }
            count++;
            var restruant = $(this).parents('.right_prt');

            var amount = restruant.find('.num').text();
            amount = parseInt(amount);
            restruant.find('.num').text(amount + 1);
            restruant.find('.num').show();

            $('#totalnum').html(count);
            var price = $(this).parent().find('.price_btn').text();
            price = price.substring(1, price.length);
            price = parseFloat(price).toFixed(1) -0;
            total = (total+price).toFixed(1) - 0;

            $('.total_price').text(total);
            if (total < DishesConstant.params.deliveryLeastValue) {
                $('#unreach').text(DishesConstant.params.deliveryLeastValue - total);
            } else {
                $('.unreach').css('display', 'none');
                $('#nextstep').css('display', 'block');
            }
            return false;
        });

    }



};

var DishesAjax = {

    url: {dishes: "/dishes", product: "/product"},

    loadDishes: function (supplierId) {
        AjaxUtil.get(DishesAjax.url.dishes, {supplierId: supplierId}, function (data) {
            var categorys = data.categorys;
            var page = $('.listbottom:last');
            // 解析map，key为分类名称，value为product List
            for (var i = 0; null != categorys && i < categorys.length; i++) {
                var category = categorys[i];
                // 根据分类查询菜品
                DishesAjax.loadProduct(category.id, page, category);


            }
        });
    },

    loadProduct: function (categoryId, page, category) {
        af_load.show();
        AjaxUtil.get(DishesAjax.url.product, {pageSize: 1000, pageNum: 1, categoryId: categoryId}, function (data) {
            af_load.hide();
            var products = data.products;
            if (null == products || products.length == 0) {

                return false;
            }
            var food_category = $('<div/>', {
                class: 'food_category',
                text: category.cateNameCn.length > 10 ? category.cateNameCn.substring(0, 10) + '...' : category.cateNameCn
            });
            // 将分类加入page
            page.before(food_category);
            for (var j = 0; null != products && j < products.length; j++) {
                var product = products[j];
                var aa = $('<div />', {
                    class: 'food_list'

                });
                var bb = $('<div />', {
                    class: 'food_item'
                });
                var cc = $('<div />', {
                    class: 'left_prt'
                });
                // 菜名
                var dd = $('<span />', {
                    class: 'food_name',
                    text: product.PName
                });
                var ddd = $('<span />', {
                    class: 'food_name_full',
                    text: product.PName,
                    style: 'display:none'
                });
                // 菜品id
                var proId = $('<div/>', {
                    class: 'productId',
                    text: product.id,
                    style: 'display:none'
                });
                // 月销量
                var ee = $('<span />', {
                    class: 'month_sales',
                    text: '月销量' + product.buyCount

                });
                var ff = $('<div />', {
                    class: 'right_prt'
                });
                var fff = $('<div />', {
                    class: 'clear',
                    style: 'clear: both;'
                });
                // 判断菜品状态
                if (window.isRest == 1) {
                    // 单价
                    var price = $('<a />', {
                        class: 'price_btn closed',
                        text: '￥' + product.PPrice,

                    });
                    ff.append(price);
                } else {
                    if (product.PStock == 1) {
                        // 单价
                        var gg = $('<a />', {
                            class: 'price_btn',
                            text: '￥' + product.PPrice,
                            href: ''

                        });
                        ff.append(gg);
                    } else if (product.PStock == 0) {
                        // 单价
                        var gg = $('<a />', {
                            class: 'price_btn closed',
                            text: '已售罄',

                        });
                        ff.append(gg);
                    }
                }


                // 购买数量
                var hh = $('<span/>', {
                    class: 'num',
                    text: '0',
                    style: 'display:none'
                });

                cc.append(dd, ddd, ee, proId);
                ff.append(hh);
                bb.append(cc, ff, fff);

                aa.append(bb);

                page.before(aa);

            }

        });
    }
};


Zepto(function ($) {

     DishesEvent.init();

});
