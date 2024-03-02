export let cart = JSON.parse(localStorage.getItem("cart"));

if(!cart) {
    cart = [{
        productId: "hammad",
        quantity: 2
    }, {
        productId: "usman",
        quantity: 1
    }];
}

function saveToStorage () {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectedQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });


    if (!matchingItem) {
        cart.push({
            productId,
            quantity: selectedQuantity
        });
    } else {
        matchingItem.quantity = Number(matchingItem.quantity) 
                                + selectedQuantity;
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;
    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(newQuantity);
        saveToStorage();
    }
}

