$(function () {
	// var href = window.location.href;
	// var type = href.split('?')[1].split('&')[0].split('=')[1]; // 用户类型
	// var openId = href.split('?')[1].split('&')[1].split('=')[1]; // 微信用户账号
	var type = 3;
	var openId = '123';
	localStorage.setItem("typeId", type); //用户类型判断
	localStorage.setItem("openId", openId); // 判断店铺
	//判断是否登录     获取tokenKey
	var tokenKey = localStorage.getItem('tokenKey3'); // 登录凭证	
	var optometristId = localStorage.getItem('userId');

	var optometrist = {
		init: function () {
			this.optometristList();
		},
		optometristList: function () {
			$.ajax({
				type: "post",
				url: lala + "/optometrist/userinfo",
				async: true,
				data: {
					"userid": optometristId,
					"tokenKey": tokenKey,
					'typeId': type
				},
				success: function (data) {
					if (data.code == 200) {
						console.log(optometristId);
						$.ajax({
							type: "post",
							url: lala + "/optometrist/userinfo",
							async: true,
							data: {
								"userid": optometristId,
								"tokenKey": tokenKey,
								'typeId': type
							},
							success: function(data) {
								console.log(data);
								if(data.data.idCard == '' || null == data.data.idCard) {
									layer.alert('您还未入驻，请填写入驻信息', function() {
										location.href = '../html/optometrist_enter.html';
									})
								}
								
							}
						})
						console.log(data);
						var res = data.data;

						//					if(res.name != null){
						//						$('.name').text(res.name);
						//					}else{
						//						$('.name').text('未填');
						//					}
						$('.name').text(res.name);
						$('.book').text(res.certificateImage);
						$('.user').attr('src', res.headImage);
						$('.begoodat').text(res.introduction);
						$('.createby').text(res.specialty);

					} else if (data == 4400) {
						layer.alert('未登录', function () {
							location.href = '../html/login.html';
						})
					}

				}
			});
		}
	}
	optometrist.init();
})