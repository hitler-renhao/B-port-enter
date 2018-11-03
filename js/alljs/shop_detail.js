$(function() {
  $.ajax({
    type: 'post',
    url: global + "/shop/queryShop",
    async: true,
    data: {
      'shopId': 1
    },
    success: function (data) {
      var res = data.data;
      console.log(res);
      
    }
  });
})