import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';


document.addEventListener('DOMContentLoaded', function() {
    updateCartQuantity();
    let productsHTML = '';

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
                    src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(product.priceCents / 100).toFixed(2)}
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

    document.querySelector(".js-products-grid").innerHTML = productsHTML;
    let timerId;

    function updateCartQuantity(productId) {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
       
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        
        let messageAdded = document.querySelector(`.js-added-product-${ productId}`);
        
        console.log(messageAdded);

        if (messageAdded) {
            messageAdded.style.opacity = 1;
            
            if (timerId) {
                clearTimeout(timerId);
            }

            timerId = setTimeout(() => {
                messageAdded.style.opacity = 0;
            }, 2000);
        }
    }

    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;

            let selectedQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
            selectedQuantity = Number(selectedQuantity);

            addToCart(productId, selectedQuantity);
            updateCartQuantity(productId);
            
            console.log(cart);

        });
    });
});
