import { cart } from "../data/cart-class.js";
import { products } from "../data/products.js";

document.addEventListener("DOMContentLoaded", function () {
  // Initial call to update cart quantity display
  updateCartQuantity();

  let productsHTML = "";

  // Loop through each product to generate HTML for the products list
  products.forEach((product) => {
    productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="${product.getStarsURL()}">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                ${product.extraInfoHtml()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-product-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button 
                button-primary js-add-to-cart"
                data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
  });

  // Insert the generated HTML into the products grid container
  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  let timerId;

  function updateCartQuantity(productId) {
    let cartQuantity = 0;

    // Calculate total quantity of items in the cart
    cart.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    // Update the cart quantity display
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // Select the new message to display based on the product ID
    let messageAdded = document.querySelector(`.js-added-product-${productId}`);

    console.log(messageAdded);

    if (messageAdded) {
      // Ensure the message is visible
      messageAdded.style.opacity = 1;

      // Clear previous timer if it exists
      if (timerId) {
        clearTimeout(timerId);
      }

      // Set a new timer to hide the message after 2 seconds
      timerId = setTimeout(() => {
        messageAdded.style.opacity = 0;
      }, 1200);
    }
  }

  // Add event listeners to all "Add to Cart" buttons
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      // Get the product ID from the button's data attribute
      const { productId } = button.dataset;

      // Get the selected quantity from the dropdown
      let selectedQuantity = document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value;
      selectedQuantity = Number(selectedQuantity);

      // Add the selected quantity of the product to the cart
      cart.addToCart(productId, selectedQuantity);

      // Update the cart quantity and show the "added to cart" message
      updateCartQuantity(productId);
    });
  });
});
