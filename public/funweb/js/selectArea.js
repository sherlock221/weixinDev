$(function() {
	var mask = $("#mask");
	var areaMenu = $("#area-menu");
	var citySelect = $("#select-title");
	var zone = $('.area.radioBase');
	var city = $("#city");
	var zoneMapper = {};
	var parameters = getRequest();
	var deviceId = parameters['deviceId'];
	var cityCode = parameters['cityCode'];
	var cityName = parameters['cityName'];

	$("#city").on('click', ".city_item", function() {
		var cityCode = $(this).attr('cityCode');
		$('#select-title').text($(this).find('a').text());
		$('#select-title').append('<i class="tran tran-top">');
		loadZone(cityCode, $(this).find('a').text());
	});

	$('#back').live('click', function() {
		history.go(-1);
	});

	$.getJSON(getRootPath() + '/android/area!loadAllCity.action', function(citys) {
		if (citys.cityList) {
			if (!cityCode || cityCode == 'undefined') {
				cityCode = citys.cityList[0].cityCode;
				cityName = citys.cityList[0].cityName;
			}
			$('#select-title').text(decodeURI(cityName));
			$('#select-title').append('<i class="tran tran-top">');
			loadZone(cityCode, decodeURI(cityName));
			city.empty();
			for (var i = 0; i < citys.cityList.length; i++) {
				var a = $('<a href="javascript:void(0);">', {
					'text' : citys.cityList[i].cityName
				});
				$('<li>', {
					'class' : 'city_item',
					'cityCode' : citys.cityList[i].cityCode
				}).appendTo(city).append(a);
			}
		}
	});

	// 全局模拟单选事件
	$("#content").on('click', ".radioBase .radioItem", function(e) {
		var $this = $(this);
		var $target = $(event.target);
		console.log($target);
		console.log("load...");
		if ($this.hasClass('radioItem')) {
			// 移除全部状态
			$this.parent().find(".radioItem").removeClass("active");
			$this.addClass("active");
			// 加载数据
			if ($this.hasClass('hotarea')) {
				console.log("底部区域..");
				toHotArea($this.attr("pguid"), $this.find('a').text(), $this.attr("cityCode"), $this.attr("cityName"));
			} else {
				console.log("加载城市...");
				loadArea($this.attr("zone"), $this.attr("cityCode"), $this.attr("cityName"));
			}

		}
		e.stopPropagation();
		return false;
	});

	var loadArea = function(zone, cityCode, cityName) {
		var zm = zoneMapper[zone];
		if (zm) {
			areaMenu.find('.list-header').text(zone);
			var ul = areaMenu.find('ul').empty();
			for (var i = 0; i < zm.length; i++) {
				var a = $('<a href="javascript:void(0);">', {
					'text' : zm[i].areaName
				});
				$('<li>', {
					'class' : 'hotarea_item',
					'pguid' : zm[i].pguid,
					cityName : cityName,
					cityCode : cityCode
				}).appendTo(ul).append(a);
			}
		}
		mask.show();
		areaMenu.show();
		$('#header').css('z-index',9);
	};

	mask.bind('click',function() {
		mask.hide();
		areaMenu.hide();
		city.hide();
	});

	citySelect.bind("click", function(e) {
		mask.show();
		city.show();
		$('#header').css('z-index',1000);
		city.find('.city_item').one("click", function() {
			mask.hide();
			city.hide();
		});
		e.stopPropagation();
	});

	$('.hotarea_item').live('click', function() {
		var pguid = $(this).attr('pguid');
		toHotArea(pguid, $(this).find('a').text(), $(this).attr('cityCode'), $(this).attr("cityName"));
	});

	var loadZone = function(cityCode, cityName) {
		$.get(getRootPath() + '/android/area!queryHotArea.action?cityCode=' + cityCode, function(result) {
			if (result.hotAreaList) {
				zone.empty();
				if (result.hotAreaList.length > 12) {
					zoneMapper = {};
					for (var i = 0; i < result.hotAreaList.length; i++) {
						if (zoneMapper[result.hotAreaList[i].zoneName]) {
							zoneMapper[result.hotAreaList[i].zoneName].push({
								"pguid" : result.hotAreaList[i].pguid,
								"areaName" : result.hotAreaList[i].areaName
							});
						} else {
							zoneMapper[result.hotAreaList[i].zoneName] = [ {
								"pguid" : result.hotAreaList[i].pguid,
								"areaName" : result.hotAreaList[i].areaName
							} ];
							var a = $('<a href="javascript:void(0);">', {
								'text' : result.hotAreaList[i].zoneName
							});
							$('<li>', {
								'class' : 'radioItem zone',
								'zone' : result.hotAreaList[i].zoneName,
								cityCode : cityCode,
								cityName : cityName
							}).appendTo(zone).append(a);
						}
					}
				} else {
					for (var i = 0; i < result.hotAreaList.length; i++) {
						var a = $('<a href="javascript:void(0);">', {
							'text' : result.hotAreaList[i].areaName
						});
						$('<li>', {
							'class' : 'radioItem hotarea',
							'pguid' : result.hotAreaList[i].pguid,
							cityCode : cityCode,
							cityName : cityName
						}).appendTo(zone).append(a);
					}
				}
			} else {
				alert('该城市暂未开通热门区域');
			}
		});
	};

	var toHotArea = function(pguid, hotarea, cityCode, cityName) {
		window.location.href = getRootPath() + '/cloudofcampus/restaurantList.html?deviceId=' + deviceId + '&pguid='
				+ pguid + "&hotarea=" + hotarea + '&cityCode=' + cityCode + '&cityName=' + cityName;
	};
});