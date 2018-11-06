$(function() {
	$.ajax({
		type: "post",
		url: lala + "/user/list",
		async: true,
		data: {
			"pageNum": 1,
			"pageSize": 100
		},
		success: function(data) {
			console.log(data);
			var str = '';
			var res = data.data.result;
			var page = data.data.total;
			//console.log(page);
			//tabLenghtArray.push(page);
			var itemIndex = 0;
			var num = 0;
			var tabLoadEndArray = [false, false, false];
			var tabLenghtArray = [page];
			var tabScroolTopArray = [0, 0, 0];

			// dropload
			var dropload = $('.khfxWarp').dropload({
				scrollArea: window,
				domDown: {
					domClass: 'dropload-down',
					domRefresh: '<div class="dropload-refresh">上拉加载更多</div>',
					domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
					domNoData: '<div class="dropload-noData">已无数据</div>'
				},
				loadDownFn: function(me) {

					setTimeout(function() {
						if(tabLoadEndArray[itemIndex]) {
							me.resetload();
							me.lock();
							me.noData();
							me.resetload();
							return;
						}
						var result = '';
						for(var index = 0; index < 5; index++, num++) {
							if(tabLenghtArray[itemIndex] > 0) {
								tabLenghtArray[itemIndex]--;
							} else {
								tabLoadEndArray[itemIndex] = true;
								break;
							}

							result += '<li id="' +res[num].id + '">' +
								'<img src="../images/touxiang.png" class="user" />' +
								'<span class="opboxa">' +
								'<span class="namebox">' +
								'<p class="name">'+ res[num].name +'</p>' +
								'</span>' +
								'<span class="namebox">' +
								'<p class="title1">好评：</p>' +
								'<span class="star">' +
								'<i></i>' +
								'<i></i>' +
								'<i></i>' +
								'<i></i>' +
								'<i></i>' +
								'</span>' +
								'</span>' +
								'<p class="evaluate">实名认证：<i>已实名备案</i>&nbsp;&nbsp;实名认证：<i>已实名备案</i></p>' +
								'</span>' +
								'</li>'
						}
						$('.khfxPane').eq(itemIndex).append(result);
						//跳转详情
						$('.khfxPane li').click(function() {
							var infoId = $(this).attr('id');
							console.log(infoId);
							window.location.href = 'optometrist_detail.html?' + infoId;
						})
						me.resetload();
					}, 500);

				}
			});

			$('.tabHead span').on('click', function() {

				tabScroolTopArray[itemIndex] = $(window).scrollTop();
				var $this = $(this);
				itemIndex = $this.index();
				$(window).scrollTop(tabScroolTopArray[itemIndex]);

				$(this).addClass('active').siblings('.tabHead span').removeClass('active');
				$('.tabHead .border').css('left', $(this).offset().left + 'px');
				$('.khfxPane').eq(itemIndex).show().siblings('.khfxPane').hide();

				if(!tabLoadEndArray[itemIndex]) {
					dropload.unlock();
					dropload.noData(false);
				} else {
					dropload.lock('down');
					dropload.noData();
				}
				dropload.resetload();
			});
		}
	})
});