const socket = io.connect();

$(document).ready(function () {
  $("#admin-section").hide();
  $("#deleteAll").hide();
});

function renderPartialhbs(data) {
  const template = Handlebars.compile($("#template").html());
  const html = template({ list: data, listExist: true });
  $("#prdtCartList").html(html);
}

socket.on("refresh-new-products-cart", () => {
  $.ajax({ moment: "GET", url: "/api/carrito" }).done((data) => {
    console.log("🦇 ~ data", data, data.length);
    if (data.length > 0) {
      renderPartialhbs(data);
      $("#deleteAll").show();
    } else {
      $("#prdtCartList").html(
        '<h3 class="text-center m-4">No hay productos cargados</h3>'
      );
    }
  });
});
$("#signInForm").submit(function (e) {
  e.preventDefault();
  let email = $("#email-input").val();
  let password = $("#password-input").val();
  let user = {
    email: email,
    password: password,
  };
  socket.emit("sign-in", user);
  $("#admin-section").show();
  $("#sign-in-form").html(
    `<button id="log-out-btn" class="btn-danger">Log Out</button>`
  );
  $("#log-out-btn").click(function () {
    location.reload();
  });
});

$("#product-form").submit(function (e) {
  e.preventDefault();
  const product = {
    name: $("#product-input-name").val(),
    description: $("#product-input-description").val(),
    price: $("#product-input-price").val(),
    thumbnail: $("#product-input-thumbnail").val(),
  };
  fetch("/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((res) => {
    if (res.status == 200) {
      socket.emit("change-list");
      $("#product-form")[0].reset();
    }
  });
});
