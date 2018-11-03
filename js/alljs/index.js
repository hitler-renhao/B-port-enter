$(function () {
	// var openId = jQuery.cookie('OPENIDCOOKIENAME');
	var userId = '';

	$('#next').click(function () {
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

		// 判断信息是否完整
		if (!shopName || !shopArea || !shopAddress || !shopPhone || !startTime || !endTime) {
			layer.alert('请将必填信息填写完整！');
		} else {
			// 验证手机号是否正确
			if (!pattern.test(shopPhone) && !telephone.test(shopPhone)) {
				layer.msg("请输入正确的手机号");
				return false;
				// 验证地址是否够
			} else if (shopAddress.length <= 4) {
				layer.msg('详细地址不得少于4个汉字或字母')
			} else {
				$.ajax({
					type: 'GET',
					url: global + "/shop/addShop",
					async: true,
					data: {
						'addresInfo': shopArea,
						'addres': shopAddress,
						'shopname': shopName,
						'phone': shopPhone,
						'businessHours': startTime,
						'off': 1,
						'uriImg': uriImg,
					},
					success: function (data) {
						layer.msg('上传成功，请内心等待后台审核')
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
})