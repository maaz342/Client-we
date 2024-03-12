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

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
        newProduct.innerHTML = 
        `<img src="${product.images}" alt=""><hr>
            <h2 class="mt-2 text-center">${product.title}</h2><hr>
    <div class="d-flex justify-content-between mx-4">
    <div class="price">Rs.${product.price}</div>
    <div class="oldprice"><s>Rs.${product.oldprice}</s></div>
        </div>          <p class="text-danger text-center">${product.off}</p>
<button onclick="addtocart()" class="addCart btn mb-2 add">Add To Cart</button>
<button onclick="buyNow()" class="btn btn-danger mb-2 buy" data-title="${product.title}" data-price="${product.price}" data-quantity="${product.quantity}">Buy Now</button>`;

                listProductHTML.appendChild(newProduct);
            });
        }
    }
    
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
            else if (positionClick.classList.contains('buy')) {
                buyNow(event);
            }
            else if(positionClick.classList.contains('')){
                checkOut(event);
            }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const userUID = user.uid;
        addCartToHTML(userUID); 
    
    }
});
// *********************** Local Storage *****************************// 
var addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    var totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            var newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            var positionProduct = products.findIndex((value) => value.id == item.product_id);
            var info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div id="${products.id}" class="image">
                    <img src="${info.images}">
                </div>
                <div id="name" class="name">
                ${info.title}
                </div>
                <div id="price" class="totalPrice">Rs. ${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span id="quantity">${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
//********************** Add To Cart ************** */
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });
}

initApp();

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
// -----------------------check Out Section---------------------------//


// ************************ Buy Now ******************************//

let selectedProduct = {};

function buyNow(event) {
    document.getElementById('buyNow').style.display = 'block';
    selectedProduct = {
       id:id.value
    };

    document.getElementById("selectedProductid").innerText = `${selectedProduct.id}`;
}

function buyNow() {
    
    document.getElementById('buyNow').style.display = 'block';
    
}

function order() {
    var name = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var number = document.getElementById("number");
    var city = document.getElementById("city");
    var address = document.getElementById("address");
    var province = document.getElementById("province");

    // Check if any of the fields is empty
    if (!name.value || !lastname.value || !number.value || !city.value || !address.value || !province.value) {
        alert("Please fill out the form completely.");
        return; // Stop execution if validation fails
    }

    var orderDetails = 
    
    {
        name: name.value,
        lastname: lastname.value,
        number: number.value,
        city: city.value,
        address: address.value,
        province: province.value
    }

    var key = Math.random() * 654331;

    firebase.database().ref("user/" + Math.round(key)).set(orderDetails);

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your Order has been added succesfully",
        showConfirmButton: false,
        timer: 1500
      });
    name.value = '';
    lastname.value = '';
    number.value = '';
    city.value = '';
    address.value = '';
    province.value = '';
    cart=[];
    addCartToHTML();
}






function closeBuyNow() {
    document.getElementById('buyNow').style.display = 'none';
}

// ********************** checkout(event)*****************************//
function checkOt(event){
var button = event.target;

// Retrieve the item details from the array
var items = [];
var names = document.getElementsByClassName('name');
var totalPrices = document.getElementsByClassName("totalPrice");
var quantities = document.getElementsByClassName("quantity");

for (var i = 0; i < names.length; i++) {
    var title = names[i].innerText;
    var price = totalPrices[i].innerText;
    var quantity = quantities[i].innerText;

    items.push({ title: title, price: price, quantity: quantity });
}

// Assuming you want to pass the items array to the buyNow function
var product = {
    items: items
};

var key = Math.random() * 2345678;

firebase.database().ref("product/" + Math.round(key)).set(product)
    .then(function() {
        // If data is successfully saved, display success message
        alert("You bought the item successfully!");
    })
    .catch(function(error) {
        // If an error occurs while saving data, log the error
        console.error("Error buying item: ", error);
        alert("An error occurred while buying the item. Please try again later.");
    });
// Show the buyNow modal
document.getElementById('buyNow').style.display = 'block';

   var itemDetails = {
        user: {
            name: name,
            lastname: lastname,
            number: number,
            city: city,
            address: address,
            province: province,
        },
    }
   
}
 


function addtocart() {
    body.classList.toggle('showCart');

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your item has been added",
        showConfirmButton: false,
        timer: 1500
      });
}

