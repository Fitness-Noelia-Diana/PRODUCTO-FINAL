$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
  // Funcion muestra todos los lugares
  function showPlaces() {
    var container = $('#places-group');
    for (i = 0; i < data.length; i++) {
      container.append('<div class="col s12 collection" data-id=' + data[i].type + '><img src=' + data[i].image + ' class="responsive-img info modal-trigger" data-target="modal1" data-title="' + data[i].name + '" data-cellphone="' + data[i].cellphone + '" data-address="' + data[i].address + '" data-clock="' + data[i].clock + '"></div>');
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
    var name = $(this).data('title');
    var clock = $(this).data('clock');
    var address = $(this).data('address');
    var cellphone = $(this).data('cellphone');
    $('h5').text(name);
    $('.address').text(address);
    $('.clock').text(clock);
    $('.cellphone').text(cellphone);
  });
});
