import { renderOrrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("Yes, products have been loaded"); //basically menas finish
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderOrrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("Yes, products have been loaded"); //basically menas finish
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrrderSummary();
    renderPaymentSummary();
  });
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrrderSummary();
    renderPaymentSummary();
  });
});
*/
