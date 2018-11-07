$(function () {
  var shopId = localStorage.getItem('shopId');
  var tokenKey = localStorage.getItem('tokenKey1');
  var typeId = localStorage.getItem('typeId')
  var openId = localStorage.getItem('openId');

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
        data: {
          'tokenKey': tokenKey,
          'typeId': typeId
        },
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
            firstpic.push(res.data);
          }
        }
      });
    })
  }
  $('.submit-btn').click(function () {
    // 判断信息是否完整
    var shopIntroduce = $('#shop-introduce').val(); // 店内设施介绍
    if (!shopIntroduce) {
      alert('请将必填信息填写完整！');
    } else {
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
      var tokenKey = localStorage.getItem('tokenKey1');
      console.log(imgUrl);
      console.log(tokenKey);
      $.ajax({
        type: 'post',
        url: jianjian + "/shop/updateShops",
        async: true,
        data: {
          'shopId': shopId, // 店铺ID
          'imgurl': imgUrl, // 图片
          'introduce': shopIntroduce, // 介绍
          'tokenKey': tokenKey,
          'typeId': typeId
        },
        success: function (data) {
          if (data.code == 200) {
            console.log(data);
            location.href = '../html/shop_info.html?typeid=' + typeId + '&openid' + openId;
          } else if (data == 4400) {
            layer.alert('未登录', function () {
              location.href = '../html/login.html';
            })
          }

        }
      })
    }
  })
})