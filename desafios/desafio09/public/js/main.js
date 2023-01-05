$(document).ready(function () {
  $("#deleteAll").hide();
  $("#product-form").hide();
  $("#product-list").hide();
  $("#user-accepted").hide();
});

function renderPartialhbs(data) {
  const template = Handlebars.compile($("#template").html());
  const html = template({ list: data, listExist: true });
  $("#prdtList").html(html);
}

function getProducts() {
  $.ajax({ moment: "GET", url: "/allProducts" }).done((data) => {
    console.log(data);
    renderPartialhbs(data);
  });
}

$("#signIn-btn").click(function (e) {
  e.preventDefault();
  let name = $("#signIn-input").val();
  fetch("/login/" + name, {
    method: "GET",
  })
    .then(() => {
      getProducts();
      $("#signIn-form").hide();
      $("#product-form").show();
      $("#product-list").show();
      $("#user-accepted").show()
      $("#user-accepted").append(
        `<h3>Bienvenido ${name}</h3>
        `
      );
    })
    .catch((err) => console.log("Hubo un error en el login", err));
});
$("#logOut-btn").click(() => {
  $.ajax({ moment: "GET", url: "/logOut" }).done((data) => {
    window.location.reload()
    console.log(data);})
});

/*$("#product-form").submit(function (e) {
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
});*/
