var StandardService = require("./../services/standardService");
var standardService = new StandardService();


var uid =  "53731b458b45930f219efccf";
var productId = "";

var array = [];
for(var i=0 ; i<10 ;i++){

    var standard = {
        //规格名称
        st_name : "mm0"+(i+1),
        //添加人
        user_id  : uid,
        //商品
        p_id  : productId,
        //是否删除
        del_flag    : false
    };

    standardService.add(company,function(err,result){
        if(err)
            console.err(err);
        else
            console.log("添加规格成功..");
    });
}




