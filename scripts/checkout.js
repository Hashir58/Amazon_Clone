import { renderOrrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";

async function loadPage() {
  try {
    //throw 'error1';

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      //throw "error2";
      loadCart(() => {
        //reject("error3");
        resolve("value"); //the value in resolve is return and then we can store in some variable.
      });
    });
  } catch (error) {
    console.log("unexpected error. please try again later");
  }

  renderOrrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
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
*/

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
