


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
firebase.firestore();
let db = firebase.firestore();
// firebase.database();

var stripe = Stripe('pk_test_WVstOcw3jGMpmSMRSB5x4SKq00yTnhaT5r');
var elements = stripe.elements();
var usersRef = db.collection("user");

var user = firebase.auth().currentUser;
var  email, cart, cartTotal, uid;

if (user != null) {
  email = user.email;
  uid = user.uid;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var userdoc = db.collection("user").doc(user.uid);

     userdoc.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    // ...
  } else {
     window.location.replace(login.html)
  }
});

document.getElementById("register").addEventListener('submit', createAccount);

document.getElementById("login-form").addEventListener("submit", signin);


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

function signin(e){
 e.preventDefault();

  let email = getInputVal(login-user-name);
  let password=getinputVal(login-user-password);

 firebase.auth().signInWithEmailAndPassword(email, password)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
  if (errorMessage != null) {
    alert(errorMessage);
  }else{
    alert("welcome")
  }
  
  // ...
});
  firebase.auth().onAuthStateChanged(function(user){
    console.log(user);
  });
}

function signOut(e){
  

}

function getData(){
  

  if(uid === null){
    console.log("Empty Cart");
  }else{
    console.log("sign-in");
//     var docRef = db.collection("cities").doc("SF");

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });
  }

}


function getInputVal(id) {
    return document.getElementById(id).value;
}

