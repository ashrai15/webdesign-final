


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


var usersRef = db.collection("user");

var user = firebase.auth().currentUser;
var  email, cart, cartTotal, uid;



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
     var userdoc = db.collection("user").doc(user.uid);

    userdoc.get().then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          email = doc.data().email;
          cartTotal = doc.data().total_price_cart;
          cart = doc.data().cart;
          uid = doc.id;
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

function processOrder() {

  let firstName = getInputVal("first-name");
  let lastName = getInputVal("last-name");
  let houseAddress=getInputVal("shipping-address-ln1");
  let secondAddressLine = getInputVal("shipping-address-ln2");
  let city = getInputVal("city");
  let state = getInputVal("state");
  let zipcode = getInputVal("zip-code");


  db.collection('orders').add({
    first_name: firstName,
    last_name: lastName,
    house_address: houseAddress,
    second_address_line: secondAddressLine,
    city: city,
    state: state,
    zip_code:zipcode,
    user: uid
  }).then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  }).catch(function(error) {
      console.error("Error adding document: ", error);
  });
}


function getInputVal(id) {
    return document.getElementById(id).value;
}

