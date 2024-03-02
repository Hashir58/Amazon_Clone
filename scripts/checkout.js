import { cart, removeFromCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let cartSummaryHTML = '';

updateCheckoutQuantity();

cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId)
        {
            matchingProduct = product;
        }
    });

    

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
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
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
});

document.querySelector(".order-summary")
    .innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link")
    .forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            console.log(cart);

            const conatiner = document.querySelector(`.js-cart-item-container-${productId}`);
            
            updateCheckoutQuantity();
            
            conatiner.remove();
        });
    });

let count = 0;

document.querySelectorAll(".js-update-link")
.forEach((link) => {
    link.addEventListener("click", () => {
        const productId = link.dataset.productId;
        //updateFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);

        if (count === 0) {
            const newInput = document.createElement('input');
            newInput.classList.add('quantity-input');
            newInput.id = `quantity-input-${productId}`;

            const newSpan = document.createElement('span');
            newSpan.classList.add('save-quantity-link', 'link-primary');
            newSpan.textContent = 'Save';


            // Insert new elements after the "Update" link
            link.insertAdjacentElement('afterend', newSpan);
            link.insertAdjacentElement('afterend', newInput);

            setTimeout(() => {
                newInput.focus();
            }, 0);

            // Hide quantity and "Update" link
            const quantityLabel = container.querySelector('.quantity-label');
            quantityLabel.style.display = 'none';
            link.style.display = 'none';

            newInput.style.display = 'inline-block';
            newSpan.style.display = 'inline-block';

            newInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    const newQuantity = parseInt(newInput.value);
                    
                    if (newQuantity !== "" && newQuantity != 0 && !(newQuantity > 1000)) {
                        quantityLabel.textContent = newQuantity;
                        
                        // Update the cart quantity
                        updateQuantity(productId, newQuantity);
                        
                        updateCheckoutQuantity();
                    } else {
                        console.error("Invalid quantity entered. Please enter a value between 0 and 999.");
                    }

                    link.style.display = "inline-block";
                    quantityLabel.style.display = 'inline-block';
                    newInput.style.display = 'none';
                    newSpan.style.display = 'none';

                    container.classList.remove("is-editing-quantity");

                    count--;
                }
            });


            newSpan.addEventListener("click", () => {
                const newQuantity = newInput.value.trim();  // Trim any leading/trailing whitespaces
            
                 // GPT TOLD ME COMPLETEY OVERLOOKED THIS LOL Update the cart quantity
                if (newQuantity !== "" && newQuantity != 0 && !(newQuantity > 1000)) {
                    quantityLabel.textContent = newQuantity;
                    
                    updateQuantity(productId, newQuantity);
                    
                    updateCheckoutQuantity();

                } else {
                    console.error("Invalid quantity entered. Please enter a value between 0 and 999.");
                }

                link.style.display = "inline-block";
                quantityLabel.style.display = 'inline-block';
                newInput.style.display = 'none';
                newSpan.style.display = 'none';

                container.classList.remove("is-editing-quantity");

                count--;
            });

            count++;

        } 

        container.classList.add("is-editing-quantity");

        console.log(productId);
    });
});



function updateCheckoutQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    
console.log(cartQuantity);

document.querySelector(".js-checkout-items").innerHTML = `${cartQuantity} items`;
}