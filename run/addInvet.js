var InventService = require("./../services/inventService");
var JString = require("./../util/jstring");
var inventService = new InventService();

//用户id
var uid =  "1";

//商品id
var ltd = "11";

//公司id
var company_id = "1";


var array = [];
//获得当前年月日
var newDate = JString.getYYMMDD();

for(var i=0 ; i<2 ;i++){
    var invent = {
        iProduct : ltd,
        iPrice : 1.25,
        iNumber : 10,
        iTotal  : 12.5,
        iType    : 1,      // 1: 进清单  2 : 销清单
        iStandard    : "1"+i+"寸",  //规格
        userId    : uid,
        iCrtDate   : newDate,
        iCompany  : company_id
    };

    inventService.add(invent,function(err,result){
        if(err)
            console.log(err);
        else
            console.log("添加成功清单..");
    });
}






