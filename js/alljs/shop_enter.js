$(function() {
	// var openId = jQuery.cookie('OPENIDCOOKIENAME');

	layui.use('upload', function() {
		var $ = layui.jquery,
			upload = layui.upload;
		var userId = '';
		var imgurl = '';
		//普通图片上传
		var uploadInst = upload.render({
			elem: '#test1,.layui-upload-list',
			url: lala + '/shop/uploadImg',
			before: function(obj) {
				$('.layui-upload-list').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {
				//如果上传失败
				if(res.code == 200) {
					imgurl = res.data[0];
					//console.log(imgurl);						
					return layer.msg('上传成功');
				}
				//上传成功
			},
			error: function() {
				//演示失败状态，并实现重传
				var demoText = $('#demoText');
				demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
				demoText.find('.demo-reload').on('click', function() {
					uploadInst.upload();
				});
			}
		});
        //店铺入驻提交下一步
		$('#next').click(function() {
			var shopName = $('#shopName').val(); //店名
			var shopArea = $('#city').val(); //地区
			var province = shopArea.split(',')[0]; // 省
			var city = shopArea.split(',')[1]; //市
			var area = shopArea.split(',')[2]; //区
			var shopAddress = $('#shopAddress').val(); //详细地址
			var shopPhone = $('#shopPhone').val(); // 电话
			var startTime = $('#startTime').val(); // 开始营业时间
			var endTime = $('#endTime').val(); // 结束营业时间
			var uriImg = $('.layui-upload-list').attr('src'); //图片路径
			var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; // 手机号正则
			var telephone = /\d{3}-\d{8}|\d{4}-\d{7}/;
			var businessHours = startTime + '-' + endTime;
			//console.log(uriImg);
			//获取经纬度 
			var map = new BMap.Map("container");
			map.centerAndZoom(province); // 获取用户录入的地区
			var localSearch = new BMap.LocalSearch(map);
			var keyword = shopAddress; // 获取用户录入详细地址
			localSearch.setSearchCompleteCallback(function(searchResult) {
				var poi = searchResult.getPoi(0);
				console.log('经度: ' + poi.point.lng); // 经度
				console.log('纬度: ' + poi.point.lat); // 纬度
			});
			localSearch.search(keyword);
			
			// 判断信息是否完整
			if(!shopName || !shopArea || !shopAddress || !shopPhone || !startTime || !endTime) {
				layer.alert('请将必填信息填写完整！');
			} else {
				// 验证手机号是否正确
				if(!pattern.test(shopPhone) && !telephone.test(shopPhone)) {
					layer.msg("请输入正确的手机号");
					return false;
					// 验证地址是否够
				} else if(shopAddress.length <= 4) {
					layer.msg('详细地址不得少于4个汉字或字母')
				} else {
					$.ajax({
						type: 'post',
						url: lala + "/shop/addShop",
						async: true,
						data: {
							'addresInfo': shopArea, // 地区
							'addres': shopAddress, // 详细地址
							'shopname': shopName, //名称
							'phone': shopPhone, //电话
							'businessHours': businessHours, // 营业时间
							'off': 1, // 营业状态
							'uriImg': imgurl, // 照片
						},
						success: function(data) {
							// location.href = './improve_shop.html'
							console.log(data);
						}
					})
				}
			}
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