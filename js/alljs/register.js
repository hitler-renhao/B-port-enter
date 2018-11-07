$(function () {
	var typeId = localStorage.getItem('typeId');
	var register = {
		init: function () {
			this.registerData();
		},
		registerData: function () {

			//1.店主  2.门店验光师  3.独立验光师   4.C端用户
			$(".btn").click(function () {
				var $optistmobile = $("#tel").val();
				var $password = $("#psd").val();
				var $messigeCode = $("#yzm").val();
				var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if (!$optistmobile) {
					layer.msg('请输入手机号码，不能为空');
					return false;
				} else if (!isMobile.test($optistmobile)) {
					layer.msg('请输入有效的手机号码');
					return false;
				}
				if (!$messigeCode) {
					layer.msg('请输入二次密码，不能为空');
					return false;
				}
				if (!$password) {
					layer.msg('请输入密码，不能为空');
					return false;
				}
				if ($password != $messigeCode) {
					layer.msg('两次密码不一致,请重新输入');
					return false;
				}
				console.log($optistmobile);
				$.ajax({
					type: "post",
					url: global + "/login/publicRegister",
					async: true,
					data: {
						"iphone": $optistmobile,
						"password": $password,
						"type": typeId,
					},
					success: function (data) {
						console.log(data);
						if (data.code == 200) {
							layer.msg('注册成功！');
							localStorage.setItem('usertel', $optistmobile);
							switch (typeId) {
								case '1':
									localStorage.setItem('tokenKey1', res.tokenKey);
									location.href = "../html/shop_enter.html";
									break;
								case '3':
									localStorage.setItem('tokenKey3', res.tokenKey);
									location.href = "../html/optometrist_enter.html";
									break;
							}
						} else {
							layer.alert("此号码已经注册,请直接登录！", function () {
								window.location.href = "login.html";
							})
						}
					}
				});
			})
		}
	}
	register.init();
})