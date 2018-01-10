$(document).ready(function() {
  // Modal materialize
  $('.modal').modal();

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

  function redireccionar() {
    window.location.href = 'home.html';
  };

  function IngresoGoogle() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        redireccionar();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }
  };

  function IngresoFacebook() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('public_profile');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // console.log(user);
        redireccionar();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        if (errorcode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
    } else {
      firebase.auth().signOut();
    }
  };

  $('#iniGoogle').on('click', IngresoGoogle);
  $('#iniFacebook').on('click', IngresoFacebook);

  var $username = $('#user');
  // var $userEmail = $('.directionMail');
  var $profilePhoto = $('#usernew');
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
      console.log(user);
      $username.text(name);
      // $userEmail.text(email);
      $profilePhoto.attr('src', photoUrl);
    } else {
      // No user is signed in.
    }
  });

  /* Inicio js de view home */

  $('.chat').hide();
  $('.hospital').hide();

  // Initialize collapse button
  $('.button-collapse').sideNav();

  $('.favorite').on('click', function() {
    $(this).toggleClass('like');
  });

  $('#fichero').on('change', function() {
    var img = $(this).files[0];
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('imagenes/' + img.name).push(img);
  });

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

  $('#home').on('click', function() {
    $('.chat').hide();
    $('.hospital').hide();
    $('.home').show();
  });

  $('#chat').on('click', function() {
    $('.home').hide();
    $('.chat').show();
    $('.hospital').hide();
  });

  $('#hospital').on('click', function() {
    $('.home').hide();
    $('.chat').hide();
    $('.hospital').show();
  });
});
