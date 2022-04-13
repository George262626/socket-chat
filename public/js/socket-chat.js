var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has("Nombre") || !params.has("Sala")) {
  window.location = "index.html";
  throw new Error("El nombre o sala son necesarios");
}

var usuario = {
  nombre: params.get("Nombre"),
  sala: params.get("Sala"),
};

socket.on("connect", function () {
  console.log("Conectado al servidor");

  socket.emit("entrarChat", usuario, function (resp) {
    console.log("Usuarios Conectados", resp);
  });
});

// escuchar
socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");
});

// Enviar información
socket.emit(
  "enviarMensaje",
  {
    usuario: "Fernando",
    mensaje: "Hola Mundo",
  },
  function (resp) {
    console.log("respuesta server: ", resp);
  }
);

//socket.emit("crearMensaje")

// Escuchar información
socket.on("crearMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});

socket.on("listaPersona", function (personas) {
  console.log(personas);
});

socket.on("mensajePrivado", function (mensaje) {
  console.log("Mensaje Privado :", mensaje);
});
