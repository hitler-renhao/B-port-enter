$(function() {
  $.ajax({
    type: 'post',
    url: global + "/shop/queryShop",
    async: true,
    data: {
      'shopId': '890a36694f3c4b60baa6857cc0822c1f'
    },
    success: function (data) {
      var res = data.data;
      console.log(res);
    }
  });
})