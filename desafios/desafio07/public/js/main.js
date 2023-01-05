const socket = io.connect();
const messageForm = document.getElementById("message-form");
const messageInputUser = document.getElementById("message-input-user");
const messageInputMessage = document.getElementById("message-input-message");
const messageList = document.getElementById("messages-container");
const productForm = document.getElementById("product-form");
const productInputName = document.getElementById("product-input-name");
const productInputPrice = document.getElementById("product-input-price");
const productInputThumbnail = document.getElementById(
  "product-input-thumbnail"
);
const productList = document.getElementById("product-container");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInputUser.value && messageInputMessage.value) {
    socket.emit("new-message", {
      user: messageInputUser.value,
      message: messageInputMessage.value,
      date: moment().format("HH:mm:ss"),
    }); //enviamos el mensaje;
  }
});

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    productInputName.value &&
    productInputPrice.value &&
    productInputThumbnail.value
  ) {
    socket.emit("new-product", {
      name: productInputName.value,
      price: productInputPrice.value,
      thumbnail: productInputThumbnail.value,
    }); //enviamos el mensaje;
    productInputThumbnail.value = "";
    productInputName.value = "";
    productInputPrice.value = "";
  }
});

socket.on("new-chat-message", async (data) => {
  const html = await renderPartialhbs("../views/partials/messages.hbs", data);
  messageList.innerHTML = html;
});

socket.on("new-product", async (data) => {
  const html = await renderPartialhbs("../views/partials/products.hbs", data);
  productList.innerHTML = html;
});

function renderPartialhbs(templateURL, data) {
  return fetch(templateURL)
    .then((response) => response.text())
    .then((plantilla) => {
      const plantillaHBS = Handlebars.compile(plantilla);
      const HTMLcompleted = plantillaHBS({ list: data, listExist: true });
      return HTMLcompleted;
    });
}
