$(function(){var e=$("#mask"),t=$("#area-menu"),a=$("#select-title"),s=$(".area.radioBase"),i=$("#city"),r={},n=getRequest(),o=n.deviceId,l=n.cityCode,p=n.cityName;$("#city").on("click",".city_item",function(){var e=$(this).attr("cityCode");$("#select-title").text($(this).find("a").text()),$("#select-title").append('<i class="tran tran-top">'),c(e,$(this).find("a").text())}),$("#back").live("click",function(){history.go(-1)}),$.getJSON(getRootPath()+"/android/area!loadAllCity.action",function(e){if(e.cityList){l&&"undefined"!=l||(l=e.cityList[0].cityCode,p=e.cityList[0].cityName),$("#select-title").text(decodeURI(p)),$("#select-title").append('<i class="tran tran-top">'),c(l,decodeURI(p)),i.empty();for(var t=0;e.cityList.length>t;t++){var a=$('<a href="javascript:void(0);">',{text:e.cityList[t].cityName});$("<li>",{"class":"city_item",cityCode:e.cityList[t].cityCode}).appendTo(i).append(a)}}}),$("#content").on("click",".radioBase .radioItem",function(e){var t=$(this),a=$(event.target);return console.log(a),console.log("load..."),t.hasClass("radioItem")&&(t.parent().find(".radioItem").removeClass("active"),t.addClass("active"),t.hasClass("hotarea")?(console.log("底部区域.."),u(t.attr("pguid"),t.find("a").text(),t.attr("cityCode"),t.attr("cityName"))):(console.log("加载城市..."),d(t.attr("zone"),t.attr("cityCode"),t.attr("cityName")))),e.stopPropagation(),!1});var d=function(a,s,i){var n=r[a];if(n){t.find(".list-header").text(a);for(var o=t.find("ul").empty(),l=0;n.length>l;l++){var p=$('<a href="javascript:void(0);">',{text:n[l].areaName});$("<li>",{"class":"hotarea_item",pguid:n[l].pguid,cityName:i,cityCode:s}).appendTo(o).append(p)}}e.show(),t.show(),$("#header").css("z-index",9)};e.bind("click",function(){e.hide(),t.hide(),i.hide()}),a.bind("click",function(t){e.show(),i.show(),$("#header").css("z-index",1e3),i.find(".city_item").one("click",function(){e.hide(),i.hide()}),t.stopPropagation()}),$(".hotarea_item").live("click",function(){var e=$(this).attr("pguid");u(e,$(this).find("a").text(),$(this).attr("cityCode"),$(this).attr("cityName"))});var c=function(e,t){$.get(getRootPath()+"/android/area!queryHotArea.action?cityCode="+e,function(a){if(a.hotAreaList)if(s.empty(),a.hotAreaList.length>12){r={};for(var i=0;a.hotAreaList.length>i;i++)if(r[a.hotAreaList[i].zoneName])r[a.hotAreaList[i].zoneName].push({pguid:a.hotAreaList[i].pguid,areaName:a.hotAreaList[i].areaName});else{r[a.hotAreaList[i].zoneName]=[{pguid:a.hotAreaList[i].pguid,areaName:a.hotAreaList[i].areaName}];var n=$('<a href="javascript:void(0);">',{text:a.hotAreaList[i].zoneName});$("<li>",{"class":"radioItem zone",zone:a.hotAreaList[i].zoneName,cityCode:e,cityName:t}).appendTo(s).append(n)}}else for(var i=0;a.hotAreaList.length>i;i++){var n=$('<a href="javascript:void(0);">',{text:a.hotAreaList[i].areaName});$("<li>",{"class":"radioItem hotarea",pguid:a.hotAreaList[i].pguid,cityCode:e,cityName:t}).appendTo(s).append(n)}else alert("该城市暂未开通热门区域")})},u=function(e,t,a,s){window.location.href=getRootPath()+"/cloudofcampus/restaurantList.html?deviceId="+o+"&pguid="+e+"&hotarea="+t+"&cityCode="+a+"&cityName="+s}});