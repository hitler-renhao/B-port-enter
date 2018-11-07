$(function () {
  var tokenKey = localStorage.getItem('tokenKey3');
  var typeId = localStorage.getItem('typeId');
  console.log(tokenKey);
  console.log(typeId);
  $('#search_btn').click(function () {
    var shopname = $('#search_shop').val();
    $.ajax({
      type: 'get',
      url: global + "/shop/searchShop",
      async: true,
      data: {
        'shopname': shopname,
        'tokenKey': tokenKey,
        'typeId': typeId
      },
      success: function (data) {
        console.log(data);
        var res = data.data;
        $('html').on('click', '#popular li', function () {
          $(this).addClass('mark');
          var name = $('.mark .name').text();
          var id = $('.mark').attr('data-id');
          location.href = '../html/improve_optometrist.html';
          setCookie('shopName', name, 30);
          setCookie('id', id, 30);
        })


        var itemIndex = 0;
        var count = 0;
        var tabLoadEndArray = [false, false, false];
        var tabLenghtArray = [res.length]; // 数据总条数
        var tabScroolTopArray = [0, 0, 0];

        dropload
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

                if ('' == res[count].imgurl || null == res[count].imgurl) {
                  // console.log(111);
                  res[count].imgurl = 'http://wx.bjysjglasses.com/ek/upload/shop/2018-11-06_11-42-56_15414757761266853.png'
                }

                result
                  += '' +
                  '<li data-id="' + res[count].id + '">' +
                  '<img src="' + res[count].imgurl + '" class="user" />' +
                  '<span class="opbox">' +
                  '<span class="namebox">' +
                  '<p class="name">' + res[count].shopname + '</p>' +
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
                  '<p class="evaluate">营业时间：' + res[count].businessHours + '</p>' +
                  '<span class="renz">' +
                  '<p>' + res[count].addresInfo + res[count].addres + '</p>' +
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
})