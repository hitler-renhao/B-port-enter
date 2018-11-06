$(function () {
	var href = window.location.href;
	var type = href.split('?')[1].split('&')[0].split('=')[1];    // 用户类型
	var openId = href.split('?')[1].split('&')[1].split('=')[1];  // 微信用户账号
	// var type = 3;
	// var openId = '123';
	localStorage.setItem("typeId", type); //用户类型判断
	localStorage.setItem("openId", openId); // 判断店铺
	//判断是否登录     获取tokenKey
	var tokenKey = localStorage.getItem('tokenKey'); // 登录凭证	
	var optometristId = localStorage.getItem('userId');
	if (tokenKey == "" || tokenKey == null) {
		layer.alert('您还未登录，请先登录', function () {
			window.location.href = '../html/login.html';
		})
	} else if (optometristId == "" || optometristId == null) {
		//判断是否有验光师id
		layer.alert('尚未完善信息', function () {
			window.location.href = '../html/optometrist_enter.html';
		})
	} else {
		//判断类型

		//	if(type == 1){
		//		window.location.href="../html/optometrist_list.html";
		//	}else if(type == 2){
		//		
		//	}else if(type == 3){
		//		window.location.href="../html/optometrist_info.html";
		//	}else if(type == 4){
		//		window.location.href="../html/eKe.html";
		//	}
		//	var infoId = location.search.substring(1);
		//console.log(infoId);
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
						"tokenKey": tokenKey
					},
					success: function (data) {
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
					}
				});
			}
		}
		optometrist.init();
	}
})