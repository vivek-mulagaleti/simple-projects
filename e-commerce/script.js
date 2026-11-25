let cart = [];
let products = [];
async function productsList() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    displayProducts();
  } catch (error) {
    console.log(error);
  }
}

productsList();

function displayProducts(category='all') {
  let productsList = "";
  let items=[];
  const continer = document.querySelector(".product-display-section");
  if (category === "all") {
    items = products;
  } else {
    items = products.filter((item) => {
      return item.category === category;
    });
  }

   items.forEach((item)=>{
        productsList+=`
            <div class="product-cards">
                <img class="product-image" src="${item.image}" alt="${item.title}">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-description">${item.description}</p>
                <h3 class="product-price">${item.price}</h3>
                <h4 class="product-category">${item.category}</h4>
                <p class="product-rating">${item.rating.rate}</p>
                <p class="product-count">${item.rating.count}</p>
                <button class="js-add-to-cart-btn" data-id="${item.id}">Add to cart</button>
            </div>
        `
    });

  calculateCounts();
  continer.innerHTML = productsList;
}

function calculateCounts() {
  const totalProducts = (document.querySelector(
    "#js-total-products-count",
  ).innerHTML = products.length);

  const cartItems = (document.querySelector("#js-total-cart-items").innerHTML =
    cart.length);

  const cartValue = document.querySelector("#js-total-cart-value");

  const total = document.querySelector("#js-cart-value");

  let totalCartValue = 0;

  cart.forEach((cartItems) => {
    totalCartValue += cartItems.price;
  });

  cartValue.innerHTML = totalCartValue;
  total.innerHTML = totalCartValue;
}

const addToCartBtn = document.querySelector(".product-display-section");
addToCartBtn.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-add-to-cart-btn")) {
    const id = Number(event.target.dataset.id);

    const product = products.find((item) => {
      return item.id === id;
    });

    cart.push(product);
    console.log(cart);
  }

  displayCart();
  calculateCounts();
});

function displayCart() {
  let cartList = "";
  const cartSection = document.querySelector(".js-cart-items");
  if (cart.length === 0) {
    cartSection.innerHTML = `<h2>Your cart is empty`;
  } else {
    cart.forEach((cartItems) => {
      cartList += `
                <div class="cart-cards">
                    <div class="cart-item-description">
                        <h3 class="cart-item-title">${cartItems.title}</h3>
                        <p class="cart-item-price">${cartItems.price}</p>
                    </div>
                    <button class="js-product-delete-btn" data-id="${cartItems.id}">delete</button>
                </div>
            `;
    });
    cartSection.innerHTML = cartList;
  }
}

const deleteFromCart = document.querySelector(".js-cart-items");
deleteFromCart.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-product-delete-btn")) {
    const id = Number(event.target.dataset.id);

    const item = cart.find((cartItem) => {
      return cartItem.id === id;
    });

    cart.splice(cart.indexOf(item), 1);

    displayCart();
    calculateCounts();
  }
});

const clearCartBtn = document.querySelector("#js-clear-cart-btn");
clearCartBtn.addEventListener("click", (event) => {
  cart.length = 0;
  displayCart();
  calculateCounts();
});

const filterBtn = document.querySelector("#item-type");
filterBtn.addEventListener("change", (event) => {
  displayProducts(event.target.value);
});
