$(function () {
	var typeId = localStorage.getItem('typeId');
	var login = {
		init: function () {
			this.loginData();
		},
		loginData: function () {
			$(".btn").click(function () {
				var tel = $("#tel").val();
				var psd = $('#psd').val();
				var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if (!tel) {
					layer.msg("请输入手机号");
					return false;
				} else if (!pattern.test(tel)) {
					layer.msg("请输入正确的手机号");
					return false;
				};
				if (!psd) {
					layer.msg("请输入密码");
					return false;
				}
				$.ajax({
					type: "post",
					url: global + "/login/publicLogin",
					async: true,
					data: {
						"iphone": tel,
						"password": psd,
						"type": typeId, //需获取  先写死
					},
					success: function (data) {
						if (data.code == 200) {
							console.log(data);
							layer.msg('登录成功！');
							var res = data.data;
							localStorage.setItem('userId', res.id);
							localStorage.setItem('tokenKey', res.tokenKey);
							localStorage.setItem('shopId', res.shopId);
							console.log(typeId);
							
							switch (typeId) {
								case '1':
									location.href = './shop_info.html';
									break;
								case '2':
									location.href = './optometrist_list.html';
									break;
									// case 3: location.href = './shop_info.html'; break;		// 用户端
							}
						} else {
							layer.alert("此号码还未注册,请先注册！", function () {
								location.href = "../html/register.html";
							})
						}
					}
				});
			})
		}
	}
	login.init();
})