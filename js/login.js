$(document).ready(function() {
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

  $('.register').on('click', function() {
    // console.log('diste un click');
    var email1 = $('#email1').val();
    var password1 = $('#password1').val();
    // console.log(email1);
    // console.log(password1);
    firebase.auth().createUserWithEmailAndPassword(email1, password1).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  });

  $('#login').on('click', function() {
    var email = $('#email').val();
    var password = $('#password').val();
    // console.log(email);
    // console.log(password);
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  });

  function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('existe usuario activo');
        redireccionar();
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        console.log(email);
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
      } else {
        // User is signed out.
        console.log('no existe usuario activo');
      }
    });
  }

  observador();
  function redireccionar() {
    window.location.href = '../views/home.html';
  };

  function IngresoGoogle() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/plus.login');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
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
});
