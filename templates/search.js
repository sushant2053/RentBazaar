<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Firebase Search Bar</title>
</head>
<body>
    <h1>Firebase Search Bar</h1>

    <input type="text" id="searchInput" placeholder="Search...">
    <div id="searchResults"></div>

    <script src="app.js"></script>
</body>
</html>


<script type = 'module'>
// Importing the firebase functions needed from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup, signOut, OAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
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

// Get DOM elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

// Add event listener for the search input
searchInput.addEventListener('input', handleSearch);

// Function to handle search
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  // Clear previous results
  resultsContainer.innerHTML = '';

  // Query Firestore for documents matching the search term
  clouddb.collection('Rent')
    .where('itemName', '>=', searchTerm)
    //.where('searchField', '<=', searchTerm + '\uf8ff')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        // Create and append result item to the results container
        const resultItem = document.createElement('li');
        resultItem.textContent = doc.data().searchField;
        resultsContainer.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.error('Error searching Firestore:', error);
    });
}
</script>