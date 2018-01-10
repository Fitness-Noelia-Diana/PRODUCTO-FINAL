$(document).ready(function() {
  // Initialize collapse button
  $('.button-collapse').sideNav();

  $('.favorite').on('click', function() {
    $(this).toggleClass('like');
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAjNJLqG0zs1iy-VHo1NueO4DRQzEaDFdE",
    authDomain: "producto-final-8583e.firebaseapp.com",
    databaseURL: "https://producto-final-8583e.firebaseio.com",
    projectId: "producto-final-8583e",
    storageBucket: "producto-final-8583e.appspot.com",
    messagingSenderId: "452395891662"
  };

  firebase.initializeApp(config);

  // $('#fichero').on('change', function() {
  //   var img = $(this).files[0];
  //   var storageRef = firebase.storage().ref();
  //   var uploadTask = storageRef.child('imagenes/' + img.name).push(img);
  // });

  $('#signOut').on('click', function() {
    // console.log('funciona');
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('saliendo');
      window.location.href = '../views/login.html';
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });
  });

  // Funcion enviando texto
  var $tweetArea = $('.new-text');
  var $tweetBtn = $('#send');
  var $row = $('#content');

  $tweetBtn.on('click', function() {
    if ($tweetArea.val()) {
      $row.prepend('<div class="new-item"><div class="row"><div class="col s10" id="new-container"><i class="small material-icons favorite">favorite</i><i class="small material-icons chat">chat</i></div></div></div>');
      var $text = $('#new-container');
      var $parrafo = $('<p/>', { 'class': 'paragraph' });
      $parrafo.text($tweetArea.val());
      $text.prepend($parrafo);
      $tweetArea.val('');
      $tweetArea.focus();
    }
  });
});
