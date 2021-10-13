const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const textArea = document.getElementById("messages");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
    // recevoir un retour de message 
    socket.on('message-server', (message) => {
        const item = document.createElement('li')
        item.textContent = message;
        textArea.appendChild(item)
        window.scrollTo(0, document.body.scrollHeight);



    })
})