$(function() {
	var login = {
		init: function() {
			this.loginData();
		},
		loginData: function() {
			$(".btn").click(function() {
				var tel = $("#tel").val();
				var psd = $('#psd').val();
				var pattern = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
				if(!tel) {
					layer.msg("请输入手机号");
					return false;
				} else if(!pattern.test(tel)) {
					layer.msg("请输入正确的手机号");
					return false;
				};
				if(!psd) {
					layer.msg("请输入密码");
					return false;
				}
				$.ajax({
					type: "post",
					url: jianjian + "/login/publicLogin",
					async: true,
					data: {
						"iphone": tel,
						"password": psd,
						"type": 1  //需获取  先写死
					},
					success: function(data) {
						if(data.code == 200){
							console.log(data);
							layer.msg('登录成功！');
						}else{
							layer.alert("此号码还未注册,请先注册！",function(){
		                    	window.location.href = "../html/register.html";
		                    })
						}
					}
				});
			})
		}
	}
	login.init();
})