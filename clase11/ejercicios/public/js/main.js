


const socket = io.connect();

const input = document.getElementById("input")

input.addEventListener("input", () => {
    socket.emit("new-message", input.value)
})

socket.on("emitSocket", (message) => {
    document.getElementById("message").innerText = message
})