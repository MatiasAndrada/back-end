const socket = io.connect();

$(document).ready(function () {
  socket.emit("refresh-new-products");
  $("#deleteAll").hide();
});

function renderPartialhbs(data) {
  const template = Handlebars.compile($("#template").html());
  const html = template({ list: data, listExist: true });
  $("#prdtList").html(html);
}

socket.on("refresh-new-products", () => {
  $.ajax({ moment: "GET", url: "/api/productos" }).done((data) => {
    if (data.length > 0) {
      renderPartialhbs(data);
      $("#deleteAll").show();
    } else {
      $("#prdtList").html(
        '<h3 class="text-center m-4">No hay productos cargados</h3>'
      );
    }
  });
});

socket.on('unauthorized-access', () => {
  $("#product-list").prepend(`<h3 class="text-center text-danger">Primero tienes que estar logueado!!</h3>`);
});