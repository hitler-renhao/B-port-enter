$(function () {
	// var href = window.location.href;
	// var type = href.split('?')[1].split('&')[0].split('=')[1];	// 用户类型
	var type = 1;
	// var openId = href.split('?')[1].split('&')[1].split('=')[1];	// 微信用户账号
	var openId = '123';
	localStorage.setItem("typeId", type); //获取判断
	localStorage.setItem("openId", openId); // 判断店铺
	var tokenKey = localStorage.getItem('tokenKey1'); // 登录凭证
	var shopId = localStorage.getItem('shopId'); // 获取商家信息ID
	// var shopId = '12345';

	var flag = localStorage.getItem('flag');
	//获取门店id
	var infoId = location.search.substring(1);
	var shop = {
		init: function () {
			this.shopList();
			this.optmerist();
		},
		shopList: function () {

			$.ajax({
				type: "post",
				url: global + "/shop/queryShop",
				async: true,
				data: {
					'shopId': shopId,
					'tokenKey': tokenKey,
					'typeId': type
				},
				success: function (data) {
					console.log(data);
					if (data.code == 200) {
						if (shopId == 'null' || shopId == '' || shopId == null) {
							layer.alert('请完善店铺信息！', function () {
								location.href = '../html/shop_enter.html'
							})
						} else {
							var res = data.data.shop;
							var result = data.data.imgs;
							$('.name').text(res.shopname);
							$('#shoptel').text('Tel:' + res.phone);
							var address = res.addresInfo.split(',');
							$('.renz p:first-child').text('地址：' + address[0] + address[1] + address[2] + res.addres);
							$('.shop').text(res.introduce);
							$('#shoptime').text('营业时间：' + res.businessHours);
							$('.user').attr('src', result[0].imagePath);
							$('.shopdel1').attr('src', result[1].imagePath);
							$('.shopdel2').attr('src', result[2].imagePath);
							$('.shopdel3').attr('src', result[3].imagePath);
						}

					} else if (data == 4400) {
						// console.log(data);
						layer.alert('未登录', function () {
							location.href = '../html/login.html';
						})

					}

				}
			});
		},
		optmerist: function () {
			$.ajax({
				type: "get",
				url: global + "/shop/shopOptometristList",
				async: true,
				data: {
					'shopId': shopId,
					'tokenKey': tokenKey,
					'typeId': type
				},
				success: function (data) {
					// var res = data.data.shop;
					console.log(data);
					var str = '';
					for (var i = 0; i < data.data.length; i++) {
						str +=
							'<dl>' +
							'<dt><img src="' + data.data[i].headImage + '"></dt>' +
							'<dd>' +
							'<p>' + data.data[i].name + '</p>' +
							'<p>' + data.data[i].introduction + '</p>' +
							'</dd>' +
							'</dl>'
					}
					$('.comment_list').append(str);
				}
			});
		}
	}
	shop.init();
})