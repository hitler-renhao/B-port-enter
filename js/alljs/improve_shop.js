$(function () {
  // var str = '';
  // var index = 5;
  // $('.add-optometrist').click(function() {
  //   index++;
  //   str += + '<li class="straff-info">'
  //           + '<div class="layui-upload fl upload-pic face">'
  //             + '<input type="button" class="layui-btn shop-goods-infos" id="test' + index + '">'
  //             + '<p class="btn-add">+</p>'
  //             + '<div class="layui-upload-list' + index + ' shop-info-list display">'
  //               + '<img class="layui-upload-img shop-info-uploads' + index + '" id="demo' + index + '">'
  //             + '</div>'
  //           + '</div>'
  //           + '<div class="staff-introduce">'
  //             + '<input class="input-optometrist-name' + index + '" placeholder="输入姓名">'
  //             + '<input class="input-optometrist-intro' + index + '" placeholder="验光师擅长介绍">'
  //           + '</div>'
  //           + '<i class="layui-icon layui-icon-close-fill"></i>'
  //         + '</li>'
  //   $('#shop-staff-list').append(str);
  // })
  var shopId = localStorage.getItem('shopId');
  var tokenKey = localStorage.getItem('tokenKey');
  
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
          'tokenKey' : tokenKey,
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
    // var uriImg5 = $('#demo5').attr('src'); //店员图1路径
    // var optometristName1 = $('.input-optometrist-name1').val(); // 店员1姓名
    // var optometristIntro1 = $('.input-optometrist-intro1').val(); // 店员1介绍

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
    var tokenKey = localStorage.getItem('tokenKey');
    console.log(imgUrl);
    console.log(tokenKey);
    
    // 判断信息是否完整
    if (!shopIntroduce) {
      layer.alert('请将必填信息填写完整！');
    } else {
      $.ajax({
        type: 'post',
        url: jianjian + "/shop/updateShops",
        async: true,
        data: {
          'shopId': shopId, // 店铺ID
          'imgurl': imgUrl, // 图片
          'introduce': shopIntroduce, // 介绍
          'tokenKey': tokenKey
        },
        success: function (data) {
          console.log(data);
          
          localStorage.setItem('flag','ok');
          // localStorage.setItem('shopId','1111'); // 假数据
          location.href = './shop_info.html'
        }
      })
    }
  })
})