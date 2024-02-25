
    // Your existing Firebase and other imports...
// Importing the firebase functions needed from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, linkWithPopup, signOut, OAuthProvider, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDocs, getDoc,setDoc, collection, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const user = auth.currentUser;




    // Rest of your existing code...
    var files = [];
    var reader = new FileReader();
    var namebox = document.getElementById('namebox');
    var extlab = document.getElementById('extlab');
    var myimg = document.getElementById('myimg');
    var proglab = document.getElementById('upprogress');
    var SelBtn = document.getElementById('selbtn');
    var UpBtn = document.getElementById('upbtn');
    var DownBtn = document.getElementById('downbtn');

    const collectionRef = collection(clouddb, "Rent");

    async function fetchDataAndDisplay() {
      const querySnapshot = await getDocs(collectionRef);
      onAuthStateChanged(auth, (user) => {
        const type = document.getElementById('type1');
        if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
      
      
    });
  }
  else {
    // User is signed out
    //displaySignInButton();
    authContainer.innerHTML = ''; // Clear user profile container
    alert('error');
  }


      
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create card element
        const card = document.createElement("div");
        card.classList.add("card");

        const type = document.getElementById('type1').textContent;
        if (data.itemType == type) {
        // Add image if available
        if (data.imageUrl) {
          const img = document.createElement("img");
          img.src = data.imageUrl;
          card.appendChild(img);
        }

        // Add string data
        const cardContent = document.createElement("div");
        cardContent.classList.add('card-content');

        const textData = document.createElement("div");
        textData.classList.add('Item-Name');
        textData.style.fontFamily= "molle";
        textData.style.fontSize= "x-large";
        textData.style.fontStyle= "oblique";
        textData.textContent = 'Book Name: '+ data.itemName;
       //card.appendChild(textData);

        const textData1 = document.createElement("div");
        textData1.classList.add('Item-Description');
        textData1.style.fontFamily= "molle";
        textData1.style.fontSize= "x-large";
        textData1.style.fontStyle= "oblique";
        textData1.textContent = 'Description: '+ data.itemDescription;
        //card.appendChild(textData1);

        const textData2 = document.createElement("div");
        textData2.classList.add('Item-Condition');
        textData2.style.fontFamily= "molle";
        textData2.style.fontSize= "x-large";
        textData2.style.fontStyle= "oblique";
        textData2.textContent = 'Condition: '+ data.itemCondition;
        //card.appendChild(textData2);

        const textData3 = document.createElement("div");
        textData3.classList.add('Item-Type');
        textData3.style.fontFamily= "molle";
        textData3.style.fontSize= "x-large";
        textData3.style.fontStyle= "oblique";
        textData3.textContent = 'Type: '+ data.itemType;
        //card.appendChild(textData3);

        const textData4 = document.createElement("div");
        textData4.classList.add('Item-Name');
        textData4.style.fontFamily= "molle";
        textData4.style.fontSize= "x-large";
        textData4.style.fontStyle= "oblique";
        textData4.textContent = 'Price/Day: Rs.'+ data.itemPrice;
        //card.appendChild(textData4);

        
        const detailsHtml1 = `
        <img src="${data.imageUrl}">; 
        <p>Book Name: ${data.itemName}</p>
        <p>Description: ${data.itemDescription}</p>
        <p>Condition: ${data.itemCondition}</p>
        <p>Type: ${data.itemType}</p>
        <p>Price/Day: Rs.${data.itemPrice}</p>
        <p>Email: ${data.email}</p>
        <!-- Add more details as needed -->

        <!-- You can also include a button or link to go back to the previous page -->
        <!-- <button onclick="goBack()">Go Back</button> -->
        `;

        // Set the HTML content of the card using innerHTML
        card.innerHTML = detailsHtml1;

        // Create a button element
            const button = document.createElement('button');

        // Set button properties
        button.textContent = 'Rent It!';
        button.addEventListener('click', function(){
          goToDetailsPage();
          
        })
        button.id = 'myButton';
        button.className = 'btn'; // You can add additional CSS classes for styling

        const button1 = document.createElement('button');
      // Set button properties
      button1.textContent = 'Delete';
        button1.id = 'myButton1';
        button1.className = 'btn1'; // You can add additional CSS classes for styling

        
   // Add a click event listener to the button
   button1.addEventListener('click', function() {
    deleteUserData();
          alert('Button Clicked!');
            });         
    // Function to get item details based on the item ID
  async function getItemDetails(imageUrl) {
    const clouddb = getFirestore();
    const itemRef = doc(clouddb, "Rent", imageUrl);
    const itemSnapshot = await getDoc(itemRef);

    if (itemSnapshot.exists()) {
        return itemSnapshot.data();
    } else {
        return null;
    }
}
   // Function to display item details on the details page
async function displayItemDetails() {
  // Get the item ID from the URL (you may use a query parameter or another method)
  const itemId = getItemIdFromUrl(); // Implement this function based on your URL structure

  if (itemId) {
      const itemDetails = await getItemDetails(itemId);

      if (itemDetails) {
          // Create HTML elements and display item details
          const detailsContainer = document.getElementById('details-container');

          // Customize this part to create a stylish layout for displaying details
          const detailsHtml = `
              <h1>${itemDetails.itemName}</h1>
              <p>Description: ${itemDetails.itemDescription}</p>
              <p>Condition: ${itemDetails.itemCondition}</p>
              <p>Type: ${itemDetails.itemType}</p>
              <p>Price/Day: Rs. ${itemDetails.itemPrice}</p>
              <!-- Add more details as needed -->

              <!-- You can also include a button or link to go back to the previous page -->
              <button onclick="goBack()">Go Back</button>
          `;

          detailsContainer.innerHTML = detailsHtml;
      } else {
          console.error("Item not found");
      }
  } else {
      console.error("Item ID not provided in the URL");
  }
}      

        // Append the button to an existing HTML element (e.g., a div with id 'buttonContainer')
        card.appendChild(button);
        //card.appendChild(button1);
        
        // Append the card to the body
        card.appendChild(cardContent);
        document.body.appendChild(card);

        }  
    });
});
    };
    fetchDataAndDisplay();
    
    
    
    
       

    

    reader.onload = function(){
      myimg.src = reader.result;
    }

    function GetExtName(file) {
      var temp = file.name.split('.');
      var ext = temp.slice((temp.length - 1),(temp.length));
      return '.' + ext[0];
    }

    function GetFileName(file) {
      var temp = file.name.split('.');
      var fname = temp.slice(0,-1).join('.');
      return fname;
    }

    async function UploadProcess(){
        var ImgToUpload = files[0];
        var ImgName = namebox.value + extlab.innerHTML;
        const metaData = {
            contentType: ImgToUpload.type
        }
        const storage = getStorage();
        const stroageRef = sRef(storage, "Images/"+ImgName);
        const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);

        UploadTask.on('state-changed', (snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            proglab.innerHTML = "Upload "+ progress + "%";
        },
        (error) =>{
            alert("error: image not uploded!");
        },
        ()=>{
            getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
                SaveURLtoFirestore(downloadURL);

            });
        }
        );
    }

async function SaveURLtoFirestore(url){
    var name = namebox.value;
    var ext = extlab.innerHtml;

    var ref = doc(clouddb, "Rent/home1");

    await setDoc(ref,{
        ImageName: (name+ext),
        ImageURL: url
    })
}

async function GetImagefromFirestore(){
    
    var ref = doc(clouddb, "Rent/"+"home1");
    const docSnap = await getDoc(ref);

    if(docSnap.exists()){
        myimg.src = docSnap.data().ImageURL;
    }
}

//GetImagefromFirestore();





  




