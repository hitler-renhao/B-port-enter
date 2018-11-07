(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var global = 'http://wx.bjysjglasses.com:8181';
var jianjian = 'http://wx.bjysjglasses.com:8181';
var lala = 'http://wx.bjysjglasses.com:8181';
// var global = 'http://192.168.1.227:8181';
// var lala = 'http://192.168.1.227:8181';
var globa = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
//10.0.232.197
//var glob = 'http://10.0.232.38:8484/ysj/wxshop/admin';
var glob = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';//http://10.0.232.38:8484/ysj/wxshop/admin
var glo = 'http://wx.bjysjglasses.com:8484/ysj/wxshop/admin';
var qqq = 'http://10.0.232.123:8484/ysj/wxshop/admin'
//cookie

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
// global = 'http://test.bjysjglasses.com:8084/app/ysj/app'  // 测试线

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}


$(function($){
	// 备份jquery的ajax方法  
	var _ajax=$.ajax;
	// 重写ajax方法，先判断登录在执行success函数 
	$.ajax=function(opt){
		var _success = opt && opt.success || function(a, b){};
			var _opt = $.extend(opt, {
				success:function(data, textStatus){
					// 如果后台将请求重定向到了登录页，则data里面存放的就是登录页的源码，这里需要找到data是登录页的证据(标记)
					// if(data.indexOf('weinianjie') != -1) {
					//   window.location.href= Globals.ctx + "/login.action";
					//   return;
					// }
					if (data == 4400) {
						// console.log(data);
						alert('未登录',function() {
						location.href = '../html/login.html';
						})
					}
					// console.info("测试 重写 ajax ++++++++++++++++++++++++++++++++++++++");
					_success(data, textStatus); 


					}  
			});
			_ajax(_opt);
	};
});

// setCookie("loginUserOptistname",loginObj.optistname,30);
//var optistname=getCookie("loginUserOptistname");
//console.log(optistname)  