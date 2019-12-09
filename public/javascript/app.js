


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAYktxW1_uDmjLzSAoecOMAlTKtI5sGpmY",
    authDomain: "post-of-the-coast-dev.firebaseapp.com",
    databaseURL: "https://post-of-the-coast-dev.firebaseio.com",
    projectId: "post-of-the-coast-dev",
    storageBucket: "post-of-the-coast-dev.appspot.com",
    messagingSenderId: "921534180906",
    appId: "1:921534180906:web:740a8c0d02ad8bc7381d53"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.performance();
firebase.database();
var stripe = Stripe('pk_test_WVstOcw3jGMpmSMRSB5x4SKq00yTnhaT5r');
var elements = stripe.elements();

document.getElementById("register").addEventListener('submit', createAccount)

function createAccount(e) {
  e.preventDefault();

  let email = getInputVal("emailCreate");
  let password = getInputVal("passwordCreate");
  let passwordCopy = getInputVal("passwordCopy");
  if (password === passwordCopy) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
   var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      
  });
  } else {
     window.alert('Your passwords must be identical.');
  }
  
}



function getInputVal(id) {
    return document.getElementById(id).value;
}

