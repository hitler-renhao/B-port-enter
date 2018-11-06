$(function () {
	var href = window.location.href;
	var type = href.split('?')[1].split('&')[0].split('=')[1];	// 用户类型
	// var type = 1;
	var openId = href.split('?')[1].split('&')[1].split('=')[1];	// 微信用户账号
	// var openId = '123';
	localStorage.setItem("typeId", type); //获取判断
	localStorage.setItem("openId", openId); // 判断店铺
	var tokenKey = localStorage.getItem('tokenKey'); // 登录凭证
	var shopId = localStorage.getItem('shopId'); // 获取商家信息ID
	console.log(tokenKey);
	if (localStorage.getItem('tokenKey') == "" || localStorage.getItem('tokenKey') == null) {
		layer.alert('您还未登录，请先登录', function () {
			location.href = '../html/login.html';
		})
	} else if (shopId == 'null' || shopId == '' || shopId == null) {
		layer.alert('请完善店铺信息！', function () {
			location.href = './shop_enter.html'
		})
	} else {
		var flag = localStorage.getItem('flag');
		if (flag) {
			//获取门店id
			var infoId = location.search.substring(1);
			var shop = {
				init: function () {
					this.shopList();
				},
				shopList: function () {
					$.ajax({
						type: "post",
						url: global + "/shop/queryShop",
						async: true,
						data: {
							'shopId': shopId,
							'tokenKey': tokenKey
						},
						success: function (data) {
							var res = data.data.shop;
							console.log(data);

							var result = data.data.imgs;
							$('.name').text(res.shopname);
							$('#shoptel').text('Tel:' + res.phone);
							var address = res.addresInfo.split(',');
							$('.renz p:first-child').text('地址：' + address[0] + address[1] + address[2] + res.addres);
							$('.shop').text(res.introduce);
							$('#shoptime').text('营业时间：' + res.businessHours);
							$('.user').attr('src', result[0].imagePath);
							$('.shopdel').attr('src', result[1].imagePath);
						}
					});
				}
			}
			shop.init();
		} else {
			layer.alert('请完善店铺信息', function () {
				location.href = './shop_enter.html';
			})
		}
	}
})