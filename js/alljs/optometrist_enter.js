$(function() {
	// var openId = jQuery.cookie('OPENIDCOOKIENAME');

	layui.use('upload', function() {
		var $ = layui.jquery,
			upload = layui.upload;
		var userId = '';
		var imgurl = '';
		var idcardurl = '';
		var idcarbackdurl = '';
		var idbookurl = '';
		
		
		//头像上传
		upload.render({
			elem: '#test1',
			url: lala + '/shop/uploadImg',
			before: function(obj) {
				$('#headurl').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {				
				if(res.code == 200) {
					imgurl = res.data[0];
					//console.log(imgurl);						
					return layer.msg('上传成功');
				}				
			},			
		});
		//身份证正面照上传
		upload.render({
			elem: '#faces',
			url: lala + '/shop/uploadImg',
			before: function(obj) {
				$('#idcard').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo2').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {				
				if(res.code == 200) {
					idcardurl = res.data[0];
					console.log(idcardurl);						
					return layer.msg('上传成功');
				}				
			},			
		});
		//身份证反面照上传
		upload.render({
			elem: '#back',
			url: lala + '/shop/uploadImg',
			before: function(obj) {
				$('#backcard').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#idback').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {				
				if(res.code == 200) {
					idcarbackdurl = res.data[0];
					console.log(idcarbackdurl);						
					return layer.msg('上传成功');
				}				
			},			
		});
		//验光师资格证
		upload.render({
			elem: '#zige',
			url: lala + '/shop/uploadImg',
			before: function(obj) {
				$('.layui-upload-list').removeClass('display')
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#bookimg').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {				
				if(res.code == 200) {
					idbookurl = res.data[0];
					console.log(idbookurl);						
					return layer.msg('上传成功');
				}				
			},			
		});
        //店铺入驻提交下一步
		$('#sm').click(function() {
			var opName = $('#name').val(); //姓名			
			var opArea = $('#city').val(); //地区
			var province = opArea.split(',')[0]; // 省
			var city = opArea.split(',')[1]; //市
			var area = opArea.split(',')[2]; //区
			var address = $('#addr').val(); //详细地址
			var idCard = $('#idCard').val(); 
			 			
			var pattern = /^([0-9]){7,18}(x|X)?$/;//短身份证号码(数字、字母x结尾)
			var maybe = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;//18位身份证
			var may = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//15位身份证
			localStorage.setItem('opName', opName);
			localStorage.setItem('opArea', opArea);
			localStorage.setItem('address', address);
			localStorage.setItem('idCard', idCard);
			localStorage.setItem('imgurl', imgurl);
			localStorage.setItem('idcardurl', idcardurl);
			localStorage.setItem('idcarbackdurl', idcarbackdurl);
			localStorage.setItem('idbookurl', idbookurl);
			if(!opName || !opArea || !address || !idCard) {
				layer.alert('请将必填信息填写完整！');
			}else{
				// 验证手机号是否正确
				if(pattern.test(idCard) || maybe.test(idCard) || may.test(idCard)) {
					
					window.location.href="../html/improve_optometrist.html"
				}else{
					layer.msg("请输入正确的身份证号");
					return false;		
				}				
			}
		})

		function cityChoice() {
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
		cityChoice();
	});
})