const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addUserToFireStore = functions.auth.user().onCreate((user) => {
  db.doc('user/'+user.uid).set({
    email: user.email,
    cart: [],
    total_price_cart: 0.0
  });
});
