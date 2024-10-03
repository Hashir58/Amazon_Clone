import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("test suite: add to cart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart("usman");
    expect(cart.length).toEqual(1);
  });

  //it("adds an existing product to the cart", () => {});
});
