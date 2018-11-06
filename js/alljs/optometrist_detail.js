$(function(){
	//判断是否登录
//	var typeId = getCookie("typeId");  
//	if(typeId == "" || typeId == null){
//      layer.alert('您还未登录，请先登录',function(){
//          window.location.href= '../html/login.html';
//      })
//  }
	
	var infoId = location.search.substring(1);
	//console.log(infoId);
	var optometrist = {
		init:function(){			
			this.optometristList();
			
		},
		optometristList:function(){
			$.ajax({
				type:"post",
				url:globa + "/optometrist/userinfo",
				async:true,
				data:{
					"userid":infoId
				},
				success:function(data){
					console.log(data);
					var res = data.data;
					$('.namebox p').text(res.name);
					$('.book').text(res.certificateImage);
					$('.user').attr('src',res.headImage);
					$('.begoodat').text(res.introduction);
					$('.createby').text(res.specialty);
				}
			});
		}	
	}
	optometrist.init();
})
