function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId, selectedQuantity) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (!matchingItem) {
        this.cartItems.push({
          productId,
          quantity: selectedQuantity,
          deliveryOptionId: "1",
        });
      } else {
        matchingItem.quantity =
          Number(matchingItem.quantity) + selectedQuantity;
      }

      this.saveToStorage();
    },

    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    },

    updateQuantity(productId, newQuantity) {
      const cartItem = this.cartItems.find(
        (item) => item.productId === productId
      );
      if (cartItem) {
        cartItem.quantity = parseInt(newQuantity);
        this.saveToStorage();
      }
    },

    calculateCartQuantity() {
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");
cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
