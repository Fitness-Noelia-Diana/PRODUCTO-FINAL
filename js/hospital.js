// Funcion muestra todos los lugares
function showPlaces() {
  var container = $('#places-group');
  for (i = 0; i < data.length; i++) {
    container.append('<div class="col-xs-6 collection" data-id=' + data[i].type + '><img src=' + data[i].image + ' class="img-responsive img-thumbnail info" data-toggle="modal" data-target="#myModal" data-title="' + data[i].name + '" data-message="' + data[i].message + '" data-address="' + data[i].address + '" data-cost="' + data[i].cost + '"></div>');
  }
};
showPlaces();

// Filtrar según tipo de lugares
$('#search').keyup(function() {
  var category = $(this).val().toLowerCase();
  $('.collection').hide();
  $('.collection').each(function() {
    var search = $(this).data('id');
    if (search.indexOf(category) !== -1) {
      $(this).show();
    }
  });
});

// Evento mouseover a las imágenes
$('.collection')
  .mouseover(function() {
    $(this).addClass('transition');
  })
  .mouseout(function() {
    $(this).removeClass('transition');
  });

// Evento para obtener información de la data
$('.info').click(function() {
var title = $(this).data('title');
var message = $(this).data('message');
var address = $(this).data('address');
var cost = $(this).data('cost');
$('h2').text(title);
$('.message').text(message);
$('.address').text(address);
$('.cost').text(cost);
});
});
