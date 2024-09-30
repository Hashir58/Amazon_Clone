import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

updateCheckoutQuantity();

export function renderOrrderSummary() {
  let cartSummaryHTML = "";

  updateCheckoutQuantity();

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingProduct.id
        }">
          <div class="delivery-date">
              Delivery date: ${dateString}
          </div>
  
          <div class="cart-item-details-grid">
              <img class="product-image"
              src="${matchingProduct.image}">
  
              <div class="cart-item-details">
              <div class="product-name">
                  ${matchingProduct.name}
              </div>
              <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                  <span>
                  Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span>
                  </span>
                  <span class="update-quantity-link link-primary 
                  js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                  </span>
                  <span class="delete-quantity-link link-primary 
                  js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                  </span>
              </div>
              </div>
  
              <div class="delivery-options">
              <div class="delivery-options-title">
                  Choose a delivery option (No Shipping on Weekdays):
              </div>
              ${deliveryOptionsHtml(matchingProduct, cartItem)}
              </div>
          </div>
          </div>
      `;
  });

  function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `${formatCurrency(deliveryOption.priceCents)} -`;

      const isCheck = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}" 
      data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" ${isCheck ? "checked" : ""}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                  <div>
                  <div class="delivery-option-date">
                      ${dateString}
                  </div>
                  <div class="delivery-option-price">
                      ${priceString} Shipping
                  </div>
                  </div>
              </div>
      `;
    });

    return html;
  }

  document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const conatiner = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      updateCheckoutQuantity();
      renderPaymentSummary();

      conatiner.remove();
    });
  });

  let count = 0;

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      //updateFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      if (count === 0) {
        const newInput = document.createElement("input");
        newInput.classList.add("quantity-input");
        newInput.id = `quantity-input-${productId}`;

        const newSpan = document.createElement("span");
        newSpan.classList.add("save-quantity-link", "link-primary");
        newSpan.textContent = "Save";

        // Insert new elements after the "Update" link
        link.insertAdjacentElement("afterend", newSpan);
        link.insertAdjacentElement("afterend", newInput);

        setTimeout(() => {
          newInput.focus();
        }, 0);

        // Hide quantity and "Update" link
        const quantityLabel = container.querySelector(".quantity-label");
        quantityLabel.style.display = "none";
        link.style.display = "none";

        newInput.style.display = "inline-block";
        newSpan.style.display = "inline-block";

        newInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            const newQuantity = parseInt(newInput.value);

            if (
              newQuantity !== "" &&
              newQuantity != 0 &&
              !(newQuantity > 1000)
            ) {
              quantityLabel.textContent = newQuantity;

              // Update the cart quantity
              updateQuantity(productId, newQuantity);

              updateCheckoutQuantity();
              renderPaymentSummary();
            } else {
              console.error(
                "Invalid quantity entered. Please enter a value between 0 and 999."
              );
            }

            newInput.style.display = "none";
            newSpan.style.display = "none";
            link.style.display = "inline-block";
            quantityLabel.style.display = "inline-block";

            //removing the input and span so next time new ones are created
            newInput.remove();
            newSpan.remove();

            container.classList.remove("is-editing-quantity");

            count--;
          }
        });

        newSpan.addEventListener("click", () => {
          const newQuantity = newInput.value.trim(); // Trim any leading/trailing whitespaces

          // GPT TOLD ME COMPLETEY OVERLOOKED THIS LOL Update the cart quantity
          if (newQuantity !== "" && newQuantity != 0 && !(newQuantity > 1000)) {
            quantityLabel.textContent = newQuantity;

            updateQuantity(productId, newQuantity);

            updateCheckoutQuantity();
          } else {
            console.error(
              "Invalid quantity entered. Please enter a value between 0 and 999."
            );
          }

          newInput.style.display = "none";
          newSpan.style.display = "none";
          link.style.display = "inline-block";
          quantityLabel.style.display = "inline-block";

          //removing the input and span so next time new ones are created
          newInput.remove();
          newSpan.remove();

          container.classList.remove("is-editing-quantity");

          count--;
        });

        count++;
      }

      container.classList.add("is-editing-quantity");

      console.log(productId);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrrderSummary();
      renderPaymentSummary();
    });
  });
}

function updateCheckoutQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  //Updating the Checkout Header
  document.querySelector(
    ".js-checkout-items"
  ).innerHTML = `${cartQuantity} items`;
}
