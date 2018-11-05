$(function(){	
//	var typeId = getCookie("typeId");  //获取判断
//	if(typeId == "" || typeId == null){
//      layer.alert('您还未登录，请先登录',function(){
//          window.location.href= '../html/login.html';
//      })
//  }
	//获取门店id
	var infoId = location.search.substring(1);
	console.log(infoId);
	
	var shop = {
		init:function(){			
			this.shopList();
			
		},
		shopList:function(){
			$.ajax({
				type:"post",
				url:global + "/shop/queryShop",
				async:true,
				data:{
					shopId:'20d88fcb-ca98-417f-9d66-8fda5d1a9e5a'
				},
				success:function(data){
					console.log(data.data);
					var res = data.data.shop;
					var result = data.data.imgs;
					$('.name').text(res.shopname);
					$('#shoptel').text('Tel:'+res.phone);
					var address = res.addresInfo.split(',');
					$('.renz p:first-child').text('地址：'+address[0]+address[1]+address[2]+res.addres);
					$('.shop').text(res.introduce);										
					$('#shoptime').text('营业时间：'+res.businessHours);
					$('.user').attr('src',result[0].imagePath);
					$('.shopdel').attr('src',result[1].imagePath);
				}
			});
		}	
	}
	shop.init();
})
