export const cart = [];

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