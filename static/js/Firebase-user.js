
// Importing the firebase functions needed from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup, signOut, OAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const clouddb = getFirestore();
const user1 = auth.currentUser;
const signInButton = document.getElementById('btn2');
const authContainer = document.getElementById('search-form-2');


        
onAuthStateChanged(auth, (user1) => {
if (user1 !== null) {
    user1.providerData.forEach((profile) => {
      displayUserProfile(user1);
      
      
    });
  }
  else {
    // User is signed out
    //displaySignInButton();
    authContainer.innerHTML = btn2; // Clear user profile container
    
    
  }
});




// Function to display the user's profile
function displayUserProfile(user) {
  const profilePicture = document.createElement('img');
  profilePicture.src = user.photoURL;
  profilePicture.id = 'ppicture';
  profilePicture.style.cursor = 'pointer';
  profilePicture.setAttribute('alt', 'Log Out');
  profilePicture.addEventListener('click', () => SignOut());
  

  const signOutButton = document.createElement('label');
  signOutButton.id = 'signout';
  signOutButton.textContent = 'Sign Out';
  

  // Clear previous content
  authContainer.innerHTML = '';
 
  // Append user profile elements
  authContainer.appendChild(profilePicture);
  authContainer.appendChild(signOutButton);
}

function SignOut(){ 
  signOut(auth, provider)
      .then((user) => {
          // The signed-in user info.
          alert('You are signed out!');
          window.location.href = "http://127.0.0.1:5000";     
          const credential = GoogleAuthProvider.credentialFromResult(user);
          const token = credential.accessToken;
      })
      .catch((error) => {
      // Handle Errors here.
        //alert('Error!');
          console.log(error.code);
          console.log(error.message);
          
      });
  }
