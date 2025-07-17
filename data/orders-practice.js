/*const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log("By XHR");
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/greeting");
xhr.send();

fetch("https://supersimplebackend.dev/greeting").then((response) => {
  console.log("By Fetch");
  console.log(response.text());
});
*/

async function getGreetingMessage() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Hashir Arshad",
    }),
  });

  const reply = await response.text();
  console.log(reply);
}

getGreetingMessage();
