const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message_1");
const messageTwo = document.querySelector("#message_2");
const imgPic = document.getElementById("pic");
weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "loading...";
  messageTwo.textContent = "loading...";

  if (!isNaN(location)) {
    messageOne.textContent = "Please enter a valid address";
    messageTwo.textContent = "";
    return;
  }
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = "Temperature: " + data.temperature;
        messageTwo.textContent = "Weather description: " + data.weatherDesc;
        imgPic.src = data.img;
      }
    });
  });
});
