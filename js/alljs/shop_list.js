$(function () {
  $.ajax({
    type: 'post',
    url: global + "/shop/queryList",
    async: true,
    data: {
      'pageNum': 1,
      'pageSize': 10000
    },
    success: function (data) {
      var res = data.data;
      console.log(res.result);
      var itemIndex = 0;
      var count = 0;
      var tabLoadEndArray = [false, false, false];
      var tabLenghtArray = [res.result.length]; // 数据总条数
      var tabScroolTopArray = [0, 0, 0];

      // dropload
      var dropload = $('.khfxWarp').dropload({
        scrollArea: window,
        domDown: {
          domClass: 'dropload-down',
          domRefresh: '<div class="dropload-refresh" style="text-align:center">上拉加载更多</div>',
          domLoad: '<div class="dropload-load" style="text-align:center"><span class="loading"></span>加载中...</div>',
          domNoData: '<div class="dropload-noData" style="text-align:center">已无数据</div>'
        },
        loadDownFn: function (me) {


          setTimeout(function () {
            if (tabLoadEndArray[itemIndex]) {
              me.resetload();
              me.lock();
              me.noData();
              me.resetload();
              return;
            }
            var result = '';

            for (var index = 0; index < 5; index++, count++) {
              if (tabLenghtArray[itemIndex] > 0) {
                tabLenghtArray[itemIndex]--;
              } else {
                tabLoadEndArray[itemIndex] = true;
                break;
              }
              result
                += '' +
                '<li>' +
                '<img src="../images/touxiang.png" class="user" />' +
                '<span class="opbox">' +
                '<span class="namebox">' +
                '<p class="name">' + res.result[count].shopname + '</p>' +
                '<i>已服务' + 1421 + '人</i>' +
                '</span>' +
                '<span class="namebox">' +
                '<p class="title">评价：</p>' +
                '<span class="star">' +
                '<i></i>' +
                '<i></i>' +
                '<i></i>' +
                '<i></i>' +
                '</span>' +
                '</span>' +
                '<p class="evaluate">营业时间：' + res.result[count].businessHours + '</p>' +
                '<span class="renz">' +
                '<p>' + res.result[count].addresInfo + res.result[count].addres + '</p>' +
                '<p>' + '1.02km' + '</p>' +
                '</span>' +
                '</span>' +
                '</li>'
            }
            $('.khfxPane').eq(itemIndex).append(result);
            me.resetload();
          }, 500);




          $('.tabHead span').on('click', function () {

            tabScroolTopArray[itemIndex] = $(window).scrollTop();
            var $this = $(this);
            itemIndex = $this.index();
            $(window).scrollTop(tabScroolTopArray[itemIndex]);

            $(this).addClass('active').siblings('.tabHead span').removeClass('active');
            $('.tabHead .border').css('left', $(this).offset().left + 'px');
            $('.khfxPane').eq(itemIndex).show().siblings('.khfxPane').hide();

            if (!tabLoadEndArray[itemIndex]) {
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

    }
  });
})