$(function () {
	var optometristId = localStorage.getItem('userId');
	var opName = localStorage.getItem('opName');
	var address = localStorage.getItem('address');
	var idCard = localStorage.getItem('idCard');
	var opArea = localStorage.getItem('opArea');
	var imgurl = localStorage.getItem('imgurl');
	var idcardurl = localStorage.getItem('idcardurl');
	var idcarbackdurl = localStorage.getItem('idcarbackdurl');
	var idbookurl = localStorage.getItem('idbookurl');
	var typeId = localStorage.getItem('typeId');
	var openId = localStorage.getItem('openId');
	var tokenKey = localStorage.getItem('tokenKey3');

	var shopName = '';
	var id = '';
	shopName = getCookie('shopName');
	id = getCookie('id');
	console.log(id);
	
	if (!shopName) {
		$('#bindingshop').val('请选择要绑定的店铺')
	} else {
		$('#bindingshop').val(shopName)
	}


	var improve = {
		init: function () {
			this.improveOp();
			this.bindingShop();
		},
		// 绑定店铺
		bindingShop: function () {
			$('#bindingshop').click(function () {
				location.href = '../html/choice_shop.html';
			})
		},
		improveOp: function () {
			$('.submit').click(function () {
				var introduction = $('#introduction').val();
				var specialty = $('#specialty').val();
				if (!introduction || !specialty) {
					layer.alert('请将必填信息填写完整！');
				} else {
					$.ajax({
						type: 'post',
						url: lala + "/optometrist/optometristEnter",
						async: true,
						data: {
							"id": optometristId, //验光师id
							"headImage": imgurl, //验光师头像
							"name": opName, //验光师姓名
							"serviceArea": opArea, //验光师服务区域
							"serviceAddr": address, //验光师详细地址
							"idCard": idCard, //验光师省份证号
							"idFrontImage": idcardurl, //验光师身份证正面照片
							"idBackImage": idcarbackdurl, //验光师身份证背面照片（国徽）
							"certificateImage": idbookurl, //验光师资格证书
							"introduction": introduction,
							"specialty": specialty,
							'shopId': id,
							'tokenKey': tokenKey,
							'typeId': typeId
						},
						success: function (data) {
							if (data.code == 200) {
								console.log(data);

								layer.msg('入驻成功', function () {
									// location.href = '../html/optometrist_info.html';
									location.href = '../html/optometrist_info.html?typeid=' + typeId + '&openid' + openId;
								});
							}
						}
					})
				}

			})
		}
	}
	improve.init();
})