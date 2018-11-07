$(function () {
	var tokenKey = localStorage.getItem('tokenKey1');
	var typeId = localStorage.getItem('typeId');

	
	
	layui.use('upload', function () {
		var $ = layui.jquery,
			upload = layui.upload;
		var imgurl = '';
		//普通图片上传
		
		var uploadInst = upload.render({
			elem: '#test1,.layui-upload-list',
			url: jianjian + '/shop/uploadImg',
			data: {
				"tokenKey": tokenKey,
				'typeId': typeId
			},
			before: function (obj) {
				$('.layui-upload-list').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function (index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function (res) {
				//如果上传失败
				if (res == 200) {
					imgurl = res.data[0];
					return alert('上传成功');
				} else if (res == 4400) {
					// console.log(data);
					layer.alert('未登录', function () {
						location.href = '../html/login.html';
					})
				}
			},
			error: function () {}
		});
		//店铺入驻提交下一步
		$('#next').click(function () {
			function sengLng(longitude, latitude) {
				var shopName = $('#shopName').val(); //店名
				// localStorage.setItem('shopName',shopName);
				var shopArea = $('#city').val(); //地区
				// localStorage.setItem('shopArea',shopArea);
				var province = shopArea.split(',')[0]; // 省
				// var city = shopArea.split(',')[1]; //市
				// var area = shopArea.split(',')[2]; //区
				var shopAddress = $('#shopAddress').val(); //详细地址
				// localStorage.setItem('shopAddress', shopAddress);
				var shopPhone = $('#shopPhone').val(); // 电话
				// localStorage.setItem('shopPhone',shopPhone);
				var startTime = $('#startTime').val(); // 开始营业时间
				// localStorage.setItem('startTime',startTime);
				var endTime = $('#endTime').val(); // 结束营业时间
				// localStorage.setItem('endTime', endTime);
				var urlImg = $('.layui-upload-list').attr('src'); //图片路径
				// localStorage.setItem('urlImg', urlImg);
				var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; // 手机号正则
				var telephone = /\d{3}\d{8}|\d{4}\d{7}/;
				var businessHours = startTime + '-' + endTime;
				// 判断信息是否完整
				if (!shopName || !shopArea || !shopAddress || !shopPhone || !startTime || !endTime) {
					alert('请将必填信息填写完整！');
				} else {
					// 验证手机号是否正确
					if (!pattern.test(shopPhone) && !telephone.test(shopPhone)) {
						alert("请输入正确的手机号");
						// 验证地址是否够
					} else if (shopAddress.length < 4) {
						alert('详细地址不得少于4个汉字或字母')
					} else {

						// //获取经纬度 
						// var map = new BMap.Map("container");
						// map.centerAndZoom(province); // 获取用户录入的地区
						// var localSearch = new BMap.LocalSearch(map);
						// var keyword = shopAddress; // 获取用户录入详细地址
						// localSearch.setSearchCompleteCallback(function (searchResult) {
						// 	var poi = searchResult.getPoi(0);
						// 	console.log('经度: ' + poi.point.lng); // 经度
						// 	console.log('纬度: ' + poi.point.lat); // 纬度
						// 	longitude = poi.point.lng;
						// 	latitude = poi.point.lat;
						// 	// sengLng(longitude, latitude);
						// });
						// localSearch.search(keyword);
						$.ajax({
							type: 'post',
							url: global + "/shop/addShop",
							async: true,
							data: {
								'addresInfo': shopArea, // 地区
								'addres': shopAddress, // 详细地址
								'shopname': shopName, //名称
								'phone': shopPhone, //电话
								'businessHours': businessHours, // 营业时间
								'off': 1, // 营业状态
								'uriImg': imgurl, // 照片
								"longitude": longitude,
								"latitude": latitude,
								'tokenKey': tokenKey,
								'typeId': typeId
							},
							success: function (data) {
								console.log(data);
								
								if (data.code == 200) {
									localStorage.setItem('shopId', data.data.id);
									location.href = '../html/improve_shop.html'
									// location.href = '../improve_shop.html'
								} else if (data == 4400) {
									// console.log(data);
									layer.alert('未登录', function () {
										location.href = '../html/login.html';
									})
								}

							}
						})
					}
				}
			}
			sengLng();
		})

		function cityChoice() {
			var area2 = new LArea();
			area2.init({
				'trigger': '#city',
				'valueTo': '#value',
				'keys': {
					id: 'value',
					name: 'text'
				},
				'type': 2,
				'data': [provs_data, citys_data, dists_data]
			});
		}
		cityChoice();
	});
})