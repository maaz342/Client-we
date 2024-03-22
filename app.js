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
              window.location.href='./dashboard'
  
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
      console.log(email.value);
      if(email.value==="technozone@gmail.com"&&password.value==="ztmZ7wWh"){
          firebase.auth().signInWithEmailAndPassword(email.value, password.value)
          .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            alert("Admin LOGGED IN")
            window.location.href='./admin/index.html'
    
    
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
          });
      }
      
      else{
    
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          alert("LOGGED IN")
          window.location.href='./dashboard'
  
  
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    }
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