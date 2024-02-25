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

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
      var userInfoDiv = document.getElementById('usernamePlaceholder');
      userInfoDiv.innerHTML= `${profile.displayName}!`;  
      var userInfoDiv1 = document.getElementById('useremailPlaceholder');
      userInfoDiv1.innerHTML= `<p>Email: ${profile.email}</p>`;
      var userInfoDiv2 = document.getElementById('userimgPlaceholder');
      userInfoDiv2.src= `${profile.photoURL}`;
      btn2.src = `${profile.photoURL}`;  
      displayUserProfile(user);
      
    });
  }
  else {
    // User is signed out
    //displaySignInButton();
    authContainer.innerHTML = ''; // Clear user profile container
  }
});

const signInButton = document.getElementById('btn2');
const authContainer = document.getElementById('search-form-2');

// Function to display the sign-in button
function displaySignInButton() {
  signInButton.textContent = 'Sign In';
  signInButton.addEventListener('click', signInWithGoogle);
}

// Function to display the user's profile
function displayUserProfile(user) {
  const profilePicture = document.createElement('img');
  profilePicture.src = user.photoURL;
  profilePicture.id = 'ppicture';
  profilePicture.style.cursor = 'pointer';
  profilePicture.addEventListener('click', () => signOut(auth));

  const signOutButton = document.createElement('button');
  signOutButton.textContent = 'Sign Out';
  signOutButton.addEventListener('click', () => signOut(auth));

  // Clear previous content
  authContainer.innerHTML = '';

  // Append user profile elements
  authContainer.appendChild(profilePicture);
  authContainer.appendChild(signOutButton);
}


