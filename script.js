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
  
  
    const app = firebase.initializeApp(firebaseConfig);
function sign() {
    var email = document.getElementById("useremail");
    var password = document.getElementById("userpassword");
    
  
    console.log(email.value,password.value);
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(email);
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            alert("Email sent Successfully..");
            window.location.href='dashboard'

          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });

    }
  
  // ***********************Login Auth*******************************
  
  function login() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
  
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  // ***********************Forget Password section*******************************
  
  function forget() {
    var email = document.getElementById("email");
  
    firebase
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        function JSalert(){
  
            swal("Congrats!", ", Password reset email sent...!", "success");
            
            }
        alert("Password Reset email Was Sent...");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  // ***********************Google Login*******************************
  
  function loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
  
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
  
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }