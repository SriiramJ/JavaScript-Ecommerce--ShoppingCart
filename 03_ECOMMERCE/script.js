document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "NikeShoes", price: 29.99 },
    { id: 2, name: "T-Shirt", price: 19.99 },
    { id: 3, name: "GymBag", price: 10.0 },
  ];

  function loadCart() {
    const storedCart = localStorage.getItem("products");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
    return [];
  }

  const cart = loadCart();
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessgae = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");
  const removeBtn = document.getElementById("remove-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessgae.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        `;
        cartItems.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessgae.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkOutBtn.addEventListener("click", () => {
    cart.length = 0;
    saveCart();
    alert("Checkout Successfully");
    renderCart();
  });

  removeBtn.addEventListener("click", () => {
    if (cart.length > 0) cart.pop();
    renderCart();
    saveCart();
    emptyCartMessgae.classList.remove("hidden");
  });
  function saveCart() {
    localStorage.setItem("products", JSON.stringify(cart));
  }
  renderCart();
});
