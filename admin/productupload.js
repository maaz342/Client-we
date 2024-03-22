
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDv3JVYdZaRh1BM7Qxl-AljkgQwc8t6BRA",
    authDomain: "jp-fmp-d4ccd.firebaseapp.com",
    databaseURL: "https://jp-fmp-d4ccd-default-rtdb.firebaseio.com/",
   projectId: "jp-fmp-d4ccd",
    storageBucket: "jp-fmp-d4ccd.appspot.com",
    messagingSenderId: "535200511661",
    appId: "1:535200511661:web:b8f5ce4018c20333c27824",
    measurementId: "G-CJS7LJG9HV"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();
const storage = getStorage();

var user = localStorage.getItem("userDetails");

user = JSON.parse(user);
console.log(user);

function imageUploader(file) {
  return new Promise(function (resolve, reject) {
    const storageRef = strRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error.message);
      },
      function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}
window.addProduct = function () {
    const imgUpload = document.getElementById("imgUpload");
    const title = document.getElementById("title").value;
    const description = document.getElementById("off").value;
    const oldprice = document.getElementById("oldprice").value;

    const price = parseFloat(document.getElementById("price").value);

    imageUploader(imgUpload.files[0])
        .then((url) => {
            const newProductRef = push(ref(db, "products"));
            set(newProductRef, {
                id:price,
                title: title,
                price: price,

                oldprice: oldprice,
                off:description,
                images: url,
            });
        })
        .catch((error) => {
            console.error("Error uploading image:", error);
        });
};
let productsData; // Declare a variable to hold the fetched products data

fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    const productsRef = ref(db, 'products');
    set(productsRef, data)
      .then(() => {
        console.log('Products data pushed to Firebase successfully.');
      })
      .catch((error) => {
        console.error('Error pushing products data to Firebase:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching products data:', error);
  });