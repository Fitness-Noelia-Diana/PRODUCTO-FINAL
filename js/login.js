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

  function loginGoogle() {
  	if (!firebase.auth().currentUser) {
  	 var provider = new firebase.auth.GoogleAuthProvider();
  	 provider.addScope('https://www.googleapis.com/auth/plus.login');
  	 firebase.auth().signInWithPopup(provider).then(function(result) {
			  var token = result.credential.accessToken;
			  var user = result.user;
			  var name = result.user.displayName;
        window.location.href = '../index.html';
      }).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  var email = error.email;
			  var credential = error.credential;

			  if (errorCode === 'auth/account-exists-with-different-credential') {
			  	alert('Es el mismo usuario');
			  }
      });
  	} else {
  		firebase.auth().signOut();
  	}
  };

  function signOut() {
    window.location.href = 'login.html';
  };

  $('#iniGoogle').on('click', loginGoogle);
});
