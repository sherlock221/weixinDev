var ProductService = require("./../services/productService");
var productService = new ProductService();





var uid = 1;

var array = [];
for(var i=0 ; i<1 ;i++){

    var pro = {
        //商品名称
        proName : "管夹",
        //首字母
        proLetters : "gj",

        //商品描述
        proContent : "官",

        proStandard : "1寸,2寸,3寸",
        //添加人
        userId  : uid
    };

    productService.add(pro,function(err,result){
        if(err){
            console.error(err);
        }
        else{
            console.log("添加商品成功!");
        }
    });
}






