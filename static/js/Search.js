// Importing the firebase functions needed from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup, signOut, OAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDocs, setDoc, collection, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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





// Function to handle search
// Get references to HTML elements
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Add event listener for the search input
searchInput.addEventListener('input', handleSearch);

function handleSearch() {
  // Clear previous results
  searchResults.innerHTML = '';

  // Get the search query
  const query = searchInput.value.trim();

  // Perform a search in Firebase
  
    performSearch(query);
  
}

async function performSearch(query) {
  const rentCollectionRef = collection(clouddb, "Rent");
  
  // Use the 'where' method to filter documents based on the query
  const querySnapshot = await getDocs(rentCollectionRef);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.itemName == query){
    displayResult(data);  // Pass the data to the displayResult function
  }
  });
}



function displayResult(book) {
  // Create a result element and append it to the results container
  const img = document.createElement("img");
  img.src = book.imageUrl;
  img.id = 'searchimg';
  searchResults.appendChild(img);

  const resultElement = document.createElement('div');
  resultElement.textContent = book.itemName;  // Use book.itemName instead of book.title
  searchResults.appendChild(resultElement);
}