$(function () {

	var appointment = {
		init: function () {
			this.openId = jQuery.cookie('OPENIDCOOKIENAME');
			this.userId = '';
			this.userName = $('#name');
			this.submit = $('#btn');
			this.userPhone = $('#phone');
			this.time = $('#picktime');
			this.userCity = $('#city');
			this.userAddress = $('#address');
			this.remark = $('#remark');
			this.cityChoice();
			setTimeout(appointment.shopInfo, 2000)

		},
		cityChoice: function () {
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
	}
	appointment.init();




	$('.editSuccess').click(function () {
		location.href = 'http://wx.bjysjglasses.com/static/wxshop/html/res-chose.html'
	})
})