export const cart = [{
    productId: "hammad",
    quantity: 2
}, {
    productId: "usman",
    quantity: 1
}];

export function addToCart(productId, selectedQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingcartItem = cartItem;
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
}