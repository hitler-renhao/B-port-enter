$(function () {
  var area1 = new LArea();
  area1.init({
    'trigger': '#city2',
    'valueTo': '#value2',
    'keys': {
      id: 'value',
      name: 'text'
    },
    'type': 2,
    'data': [provs_data, citys_data, dists_data]
  });
});