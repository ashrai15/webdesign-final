/*eslint-env browser*/

// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: 'AIzaSyAYktxW1_uDmjLzSAoecOMAlTKtI5sGpmY',
    authDomain: 'post-of-the-coast-dev.firebaseapp.com',
    databaseURL: 'https://post-of-the-coast-dev.firebaseio.com',
    projectId: 'post-of-the-coast-dev',
    storageBucket: 'post-of-the-coast-dev.appspot.com',
    messagingSenderId: '921534180906',
    appId: '1:921534180906:web:740a8c0d02ad8bc7381d53',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.performance();
firebase.firestore();
let db = firebase.firestore();
// firebase.database();


let uid, email, cart, cartTotal;





let uid, email, cart, cartTotal;
let globalUser;

// eslint-disable-next-line no-unused-vars
function buildCart() {
    cart.forEach((element) => {
        console.log('Element' + element);

        let currentCart = document.getElementById('current-cart');
        let div = document.createElement('li');
        let card = document.createElement('div');
        card.classList.add('card');

        let inhtml = ` <li>
                    <div class="card">
                        <div class="row">
                            <img src="../images/cards-icon-red.png" alt=""
                                srcset="" class="col-2">
                            <div class="col">
                                <div class="row card-title">
                                    ${element}
                                </div>
                                <div class="row card-body">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quam quibusdam minus
                                    distinctio ducimus consequatur possimus
                                    corrupti velit cum maxime repudiandae
                                    pariatur quis atque vitae sint excepturi
                                    error, vel ipsa placeat!
                                </div>
                            </div>
                            <div class="col-1">
                                <strong>Price</strong>
                            </div>
                        </div>
                    </div>
                </li>`;

        card.innerHTML = inhtml;
        div.appendChild(card);
        currentCart.appendChild(div);

        document.getElementById(
            'total-price'
        ).innerText = `Total Price $${cartTotal}`;
    });
}

firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        // User is signed in.
        let userdoc = db.collection('user').doc(user.uid);

        userdoc
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    console.log('Document data:', doc.data());
                    email = doc.data().email;
                    cartTotal = doc.data().total_price_cart;
                    cart = doc.data().cart;
                    uid = doc.id;
                } else
                // doc.data() will be undefined in this case
                    console.log('No such document!');
            })
            .catch(function(error) {
                console.log('Error getting document:', error);
            });
        // ...
    } else if (
        window.location.href.includes('cart.html') ||
        window.location.href.includes('checkout.html')
    )
        window.location.replace('login.html'); ===
    ===
    =
    globalUser = user;
    if (user) {
        uid = user.uid;
        // User is signed in.
        let userdoc = db.collection('user').doc(user.uid);

        userdoc.get().then(function(doc) {
            if (doc.exists) {
                console.log('Document data:', doc.data());
                email = doc.data().email;
                cartTotal = doc.data().total_price_cart;
                cart = doc.data().cart;
            } else
            // doc.data() will be undefined in this case
                console.log('No such document!');

        }).catch(function(error) {
            console.log('Error getting document:', error);
        });
        // ...
    } else if (window.location.href.includes('cart.html') ||
        window.location.href.includes('checkout.html')) {
        window.location.replace('login.html');
        uid = null;
    }



});

if (document.getElementById('register') != null)
    document.getElementById('register').addEventListener('submit', createAccount);

if (document.getElementById('login-form') != null)
    document.getElementById('login-form').addEventListener('submit', signin);

function createAccount(e) {
    e.preventDefault();

    let email = getInputVal('emailCreate');
    let password = getInputVal('passwordCreate');
    let passwordCopy = getInputVal('passwordCopy');
    if (password === passwordCopy)
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password')
                alert('The password is too weak.');
            else alert(errorMessage);

            console.log(error);
            // [END_EXCLUDE]
        });
    else window.alert('Your passwords must be identical.');
}


HEAD

function signin(e) {
    e.preventDefault();

    function signin(e) {
        e.preventDefault();

        let email = getInputVal('login-user-name');
        let password = getInputVal('login-user-password');

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.

                let errorMessage = error.message;

                if (errorMessage != null)
                    console.log(errorMessage);
                else
                    window.replace('index.html');


                // ...
            });
        firebase.auth().onAuthStateChanged(function(user) {
            console.log(user);
        });
    }
    let email = getInputVal('login-user-name');
    let password = getInputVal('login-user-password');

    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.

            let errorMessage = error.message;

            if (errorMessage != null) alert(errorMessage);
            else alert('welcome');

            // ...
        });
    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
    });
}

// eslint-disable-next-line no-unused-vars
function signOut(e) {}

// eslint-disable-next-line no-unused-vars
function processOrder() {
    let firstName = getInputVal('first-name');
    let lastName = getInputVal('last-name');
    let houseAddress = getInputVal('shipping-address-ln1');
    let secondAddressLine = getInputVal('shipping-address-ln2');
    let city = getInputVal('city');
    let state = getInputVal('state');
    let zipcode = getInputVal('zip-code');

    db
        .collection('orders')
        .add({
            first_name: firstName,
            last_name: lastName,
            house_address: houseAddress,
            second_address_line: secondAddressLine,
            city: city,
            state: state,
            zip_code: zipcode,
            user: uid,
        })
        .then(function(docRef) {
            console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
            console.error('Error adding document: ', error);
        });
}

function getInputVal(id) {
    return document.getElementById(id).value;
}
// eslint-disable-next-line no-unused-vars
function addToCart(product) {
    if (globalUser) {
        let docID = db.collection('user').doc(uid);
        console.log(docID.data);
        cartTotal += 5;
        docID.update({
            total_price_cart: cartTotal,
            cart: firebase.firestore.FieldValue.arrayUnion(product)
        });
    } else window.location.replace('login.html')