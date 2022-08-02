const socket = io("http://localhost:3000")

const message = document.getElementById('message');
const messages = document.getElementById('messages');
const clickBtn = document.getElementById("mybtn")

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];


const handleSubmitNewMessage = () => {
  socket.emit('message', { data: message.value })
}

socket.on('message', ({ data }) => {
    if(data != "") {
        handleNewMessage(data);
    } 
})

const handleNewMessage = (message) => {
  messages.appendChild(buildNewMessage(message));
}

const buildNewMessage = (message) => {
    const text = document.createElement("li");
    
    text.classList.add('chat-message');
    var avatarElement = document.createElement('i');
    var avatarText = document.createTextNode(message[0]);
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = getAvatarColor(message);

    text.appendChild(avatarElement)
    text.appendChild(document.createTextNode(message));

    return text;
}

message.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        document.getElementById("mybtn").click();
    }
});


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}






