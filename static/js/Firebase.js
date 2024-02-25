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


var files = [];
        var reader = new FileReader();
        var namebox = document.getElementById('namebox');
        var extlab = document.getElementById('extlab');
        var myimg = document.getElementById('myimg');
        var proglab = document.getElementById('upprogress');
        var SelBtn = document.getElementById('selbtn');
        var UpBtn = document.getElementById('Post');
        var DownBtn = document.getElementById('downbtn');
        onAuthStateChanged(auth, async (user) => {
          if (user !== null) {
              user.providerData.forEach(async (profile) => {
                const userData = await getUserData(user.uid);
                //const useremail = profile.email;
                console.log("  Provider-specific UID: " + profile.uid);
                //var namebox1 = document.getElementById('namebox1');
                //namebox1.innerHTML= `${profile.uid}!`;  
                document.getElementById('Post').addEventListener('click', async function(){
                const run = await saveRentDetails(user);
              }
                );
              });
            }
          });
        
             
        
              
            

        async function saveRentDetails(user) {
            
          
          
          const itemName = document.getElementById('itemName').value;
          const itemDescription = document.getElementById('itemDescription').value;
          const itemCondition = document.getElementById('itemCondition').value;
          const itemType = document.getElementById('itemType').value;
          const itemPrice = document.getElementById('itemPrice').value;
          
                             
              
          
          var ImgToUpload = files[0];  
        var ImgName = namebox.value + extlab.innerHTML;
        
        const storage = getStorage();
        const stroageRef = sRef(storage, "Images/"+ImgName);
        const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload);
       
      
          //UpBtn.onclick = UploadProcess;
          UploadTask.then(snapshot => {
            // Get the download URL for the image
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          proglab.innerHTML = "Upload "+ progress + "%";
            getDownloadURL(snapshot.ref).then(async url => {  
        
                            // Save rent details to Firebase Database
                            try {
                                  
                            var ref = collection(clouddb, "Rent");  
                            const rentDetails = await addDoc(ref, {
                                email: user.email,
                                itemName: itemName,
                                itemDescription: itemDescription,
                                itemCondition: itemCondition,
                                itemType: itemType,
                                itemPrice: itemPrice,
                                imageUrl: url,
                                
                                //ImgToUpload: ImgToUpload
                            });
                            
                            //getRentDetails();
                            // Optionally, you can display a success message or redirect to another page
                            alert('Rent details submitted successfully!');
                          } catch(error){
                            
                            alert(error);
                          }
                            
                        });
                      });
                    }
                  
                  
                    // Function to get user data from Firestore
                    async function getUserData(userId) {
                      try {
                        const userDocRef = doc(clouddb, "Rent", userId);
                        const userDocSnapshot = await getDoc(userDocRef);

                        if (userDocSnapshot.exists()) {
                          return userDocSnapshot.data();
                        } else {
                          return null;
                        }
                      } catch (error) {
                        console.error("Error getting user data:", error);
                        return null;
                      }
                    }
    
        selbtn.onchange = e =>{
          files = e.target.files;
          var extention = GetExtName(files[0]);
          var name = GetFileName(files[0]);
          namebox.value = name;
          extlab.innerHTML = extention;
          reader.readAsDataURL(files[0]);
        }
    
        reader.onload = function(){
            selbtn.src = reader.result;
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
        
       /* async function UploadProcess(){
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
    
        var ref = doc(clouddb, "Rent");
    
        await addDoc(ref,{
            ImageName: (name+ext),
            ImageURL: url
        })
    }
    
    async function GetImagefromFirestore(){
        var name = namebox.value;
        var ref = doc(clouddb, "Rent/"+name);
        const docSnap = await getDoc(ref);
    
        if(docSnap.exists()){
            myimg.src = docSnap.data().ImageURL;
        }
    }
    
    UpBtn.onclick = UploadProcess;
    //DownBtn.onclick = GetImagefromFirestore;    


var files = [];
var reader = new FileReader();

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');
var SelBtn = document.getElementById('selBtn');
var UpBtn = document.getElementById('upBtn');
var DownBtn = document.getElementById('downbtn');

var input = document.createElement('input');
input.type = 'file';
input.onchange = e =>{
  files = e.target.files;
  var extention = GetExtName(files[0]);
  var name = GetFileName(files[0]);
  namebox.value = name;
  extlab.innerHTML = extention;
  reader.readAsDataURL(files[0]);
}

reader.onload= function(){
  myimg.src = reader.result;
}

function GetFileExt(file){
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length-1),(temp.length));
  return '.' + ext[0];
}

function GetFileName(file){
  var temp = file.name.split('.');
  var fname = temp.slice(0,-1).join('.');
  return fname;
}


                    
                


//document.getElementById('View').addEventListener('click', getRentDetails);
async function getRentDetails() {
    // Get rent details to Firebase Database
                    try{
                      const getDetails = await getDocs(collection(clouddb, "Rent", id) )
                        let html = "";
                        getDetails.forEach((doc) => {
                          const data = doc.data()
                          html += `
                          <tr>
                            <td>${doc.id}</td>
                            <td>${data.itemName}</td>
                            <td>${data.itemDescription}</td>
                            <td>${data.itemCondition}</td>
                            <td>${data.itemType}</td>
                            <td><button class="delbtn" onclick="deleteData('${doc.id}')">Delete ad</button></td>
                            <td><button class="delbtn" onclick="updateData('${doc.id}')">Update ad</button></td>
                          </tr>
                          `
                          
                        })
                        document.querySelector('table').innerHTML = html
                    
                    // Optionally, you can display a success message or redirect to another page
                    alert('Rent details submitted successfully!');
                  
                  } catch(error){
                    alert(error);
                  };
                    

window.deleteData = async function(id){
  try{
    await deleteDoc(doc(clouddb, "Rent", id))
    alert("data Deleted!")


  }catch{error}{
    console.log(error);
  }

}

window.updateData = async function(id){
  try{
    const docSnapShot = await getDoc(doc(clouddb, "Rent", id))
    const currebtUser = docSnapShot.data()
    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value;
    const itemCondition = document.getElementById('itemCondition').value;
    const itemType = document.getElementById('itemType').value;
    const itemImage = document.getElementById('itemImage').files[0];
    alert(currebtUser);
    alert("data Deleted!");


  }catch{error}{
    console.log(error);
  }
}
                
}*/
  
    

//getRentDetails();
// Click event for google sign in
//document.getElementById('btnn').addEventListener('click', signInWithGoogle);




    

