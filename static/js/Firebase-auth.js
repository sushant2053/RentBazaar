// Importing the firebase functions needed from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup, signOut, OAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
    
// Initialize Cloud Firestore and get a reference to the service

const firebaseConfig = {
  apiKey: "AIzaSyATOQvBvdsCX38IvyGUjvYs9kHE6aB4iMM",
  authDomain: "rentbazaar-aea34.firebaseapp.com",
  projectId: "rentbazaar-aea34",
  storageBucket: "rentbazaar-aea34.appspot.com",
  messagingSenderId: "644873776624",
  appId: "1:644873776624:web:6d75f162996172d0dc0135",
  measurementId: "G-C2S3E30YTY"
};


// RentBazaar app's Firebase configuration
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
const auth = getAuth();

const provider1 = new OAuthProvider('microsoft.com'); 
const auth1 = getAuth();
const analytics = getAnalytics(app);

const clouddb = getFirestore(app);


document.getElementById('btnn').addEventListener('click', signInWithGoogle);
// Signs in google users
function signInWithGoogle(){ 
signInWithPopup(auth, provider)
    .then((user) => {
        // The signed-in user info.
        alert('You are signed in!');
        window.location.href = 'Dashboard.html';     
        const credential = GoogleAuthProvider.credentialFromResult(user);
        const token = credential.accessToken;
    })
    .catch((error) => {
    // Handle Errors here.
      alert('Error!');
        console.log(error.code);
        console.log(error.message);
        
    });
}

document.getElementById('btn11').addEventListener('click', signInWithMicrosoft);

function signInWithMicrosoft(){
signInWithPopup(auth, provider1)
  .then((result) => {
  // Microsoft credential is linked to the current user.
  // IdP data available in result.additionalUserInfo.profile.
  alert('You are signed in!');
  

    // Get the OAuth access token and ID Token
  const credential = OAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;
  const idToken = credential.idToken;
  })
  .catch((error) => {
  // Handle error.
  alert('Error Microsoft!');
  console.log(error.message);
  
  });
}


document.getElementById('Signin').addEventListener('click', loginUser);

// Logs in registered users
function loginUser() {
const userid = document.getElementById("userid").value;
const userpass = document.getElementById("userpass").value;
signInWithEmailAndPassword(auth, userid, userpass)
    .then((result) => {
        // Signed in 
        alert('You are signed in!');
        document.getElementById('menu').style.display = 'none';
        document.getElementById('menu1').style.display = 'block';
        
        
        // ...
    })
    .catch((error) => {
        alert('Your Email or Password is not valid!');
        console.log(error.code);
        console.log(error.message);
    });
}


function displayUserInfo(uid) {
    // Display user info in the user-info div
    var userInfoDiv = document.getElementById('usernamePlaceholder');
    userInfoDiv.innerHTML= `<p>Hello, ${user.uid}!</p>`;
  }
  
  