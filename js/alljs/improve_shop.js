$(function () {

  uploadPic('#test1', '#demo1');
  uploadPic('#test2', '#demo2');
  uploadPic('#test3', '#demo3');
  uploadPic('#test4', '#demo4');
  uploadPic('#test5', '#demo5');
  uploadPic('#test6', '#demo6');

  var pic = {};
  var firstpic = [];
  var imgUrl = [];
  // [{type:1,imagePath:1.png},{type:2,imagePath:1.png}]


  function uploadPic(elem, imgs) {
    layui.use(['form', 'upload'], function (data) {
      var form = layui.form,
        layedit = layui.layedit,
        upload = layui.upload;
      //图片上传
      var uploadInst = upload.render({
        elem: elem,

        url: global + '/shop/uploadImg',

        before: function (obj) {
          obj.preview(function (index, file, result) {
            $(imgs).attr('src', result).parent().css({
              'display': 'block'
            });
          });
        },
        done: function (res) {
          if (res.code == 200) {
            console.log(res.data);
            alert(1)
            firstpic.push(res.data);
            // layer.msg('上传成功');
          }
        }
      });
    })
  }
  // var openId = jQuery.cookie('OPENIDCOOKIENAME');
  var userId = '';

  $('.submit-btn').click(function () {
    var shopIntroduce = $('#shop-introduce').val(); // 店内设施介绍
    var uriImg5 = $('#demo5').attr('src'); //店员图1路径
    var optometristName1 = $('.input-optometrist-name1').val(); // 店员1姓名
    var optometristIntro1 = $('.input-optometrist-intro1').val(); // 店员1介绍
    // console.log(shopIntroduce);


    console.log(firstpic[0][0]);
    for (var index = 0; index < firstpic.length; index++) {
      var indexx = JSON.stringify(index + 1)
      pic = {
        type: indexx,
        imagePath: firstpic[index][0]
      }
      imgUrl.push(pic);
    }
    imgUrl = JSON.stringify(imgUrl);
    console.log(imgUrl);
    
    
    


    // 判断信息是否完整
    if (!shopIntroduce) {
      layer.alert('请将必填信息填写完整！');
    } else {
      $.ajax({
        type: 'post',
        url: jianjian + "/shop/updateShops",
        async: true,
        data: {
          'shopId': '20d88fcb-ca98-417f-9d66-8fda5d1a9e5a', // 店铺ID
          'imgurl': imgUrl, // 图片
          'introduce': shopIntroduce, // 介绍
        },
        success: function (data) {
          // location.href = './improve_shop.html'
        }
      })
    }
  })
})