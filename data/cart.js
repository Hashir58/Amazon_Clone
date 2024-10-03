export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "hammad",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "usman",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectedQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    cart.push({
      productId,
      quantity: selectedQuantity,
      deliveryOptionId: "1",
    });
  } else {
    matchingItem.quantity = Number(matchingItem.quantity) + selectedQuantity;
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity = parseInt(newQuantity);
    saveToStorage();
  }
}

export function calculateCartQuantity() {
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
