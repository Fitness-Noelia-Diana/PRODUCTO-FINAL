function initMap() {
  var uluru = {lat: -12.123729,
    lng: -77.027514};
  var laboratoria = {lat: -12.125800,
    lng: -77.020682};
  var map = new google.maps.Map($('#map')[0], {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: laboratoria,
    map: map
  });
}
