var CompanyService = require("./../services/companyService");
var companyService = new CompanyService();
var Common = require("./../constants/common");

var uid =  "1";

var array = [];
//  for(var i=0 ; i<20 ;i++){
//    var company = {
//        cName  : "陕西三建0"+(i+1),
//        cType  : i%2 == 0 ? Common.COMPANY_TYPE.IN_COMPANY : Common.COMPANY_TYPE.OUT_COMPANY,
//        userId      : uid,
//        cContent : "这是一个公司!"
//    };
//    companyService.add(company,function(err,result){
//        if(err){
//            console.error(err);
//        }
//        else{
//            console.log("添加成功..");
//        }
//    });
//}






