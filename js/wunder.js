var temp_c = {};
var temper = {};

function wunder(i,city, country) {

$.ajax({
  url: "http://api.wunderground.com/api/ef5a156e62f050d2/conditions/q/" + country + "/" + city + ".json",
  crossDomain: true,
    dataType: 'jsonp',
  success: function(url) {
    console.log(url);
      if(url.current_observation) {
          temp_c[i] = url.current_observation.temp_c;
      } else {
          temp_c[i] = "not known"
      }
    
  }
});
}
