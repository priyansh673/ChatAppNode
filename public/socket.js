const socket = io('http://localhost:2000');
let username;

const login = () => {
  username = document.getElementById('username').value;
  if (username) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
  }
}

document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('input');
  if (input.value) {
    socket.emit('message', { sender: username, content: input.value });
    input.value = '';
  }
});

document.getElementById('deleteBtn').addEventListener('click', function() {
  fetch('/messages', { method: 'DELETE' })
    .then(response => response.text())
    .then(message => {
      console.log(message);
    });
});

socket.on('message', function(msg) {
  const item = document.createElement('li');
  item.textContent = `${msg.sender}: ${msg.content} (${moment(msg.timestamp).format('hh:mm A')})`;
  document.getElementById('messages').appendChild(item);
});

socket.on('clearMessages', function() {
  console.log('Clear messages event received');
  document.getElementById('messages').innerHTML = '';
});

// Fetch initial messages
fetch('/messages')
  .then(response => response.json())
  .then(messages => {
    messages.forEach(msg => {
      const item = document.createElement('li');
      item.textContent = `${msg.sender}: ${msg.content} (${moment(msg.timestamp).format('hh:mm A')})`;
      document.getElementById('messages').appendChild(item);
    });
  });