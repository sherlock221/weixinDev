/**
 * 用户基本模型
 * @param id
 * @param latitude
 * @param longitude
 * @param precision
 * @param labelName
 * @constructor
 */
var Users = function(id,latitude,longitude,precision,labelName,crtTime){
    //OpenID
    this.id  = id;
   // this.crtTime = crtTime || new Date().getTime();
    //位置信息
    this.location = {
        //纬度
        latitude :  latitude || 0,
        //经度
        longitude : longitude || 0,
        //精度
        precision  : precision || 0,

        labelName  : labelName || ""

    };

};

module.exports = Users;