var messageInput = document.querySelector('#text');
var postButton = document.querySelector('#post');
var chatuser = localStorage.getItem('chatuser');
var chatContainer = document.querySelector('#chat-container');

postButton.addEventListener('click', function(){
	var message = messageInput.value;
	if(message !== ''){
		msgList.push({
			username: chatuser,
			text: message
		});
	}
});

msgList.on('child_added', function(snapshot){
	var message = snapshot.val();
	var msgElement = document.createElement('div');
	var msgNameElement = document.createElement('b');
	var msgTextElement = document.createElement('p');
	if(message.username == chatuser){
		msgNameElement.textContent = 'You';
		msgElement.className = 'msg-self';
	}else{
		msgNameElement.textContent = message.username;
		msgElement.className = 'msg';
	}
	msgTextElement.textContent = message.text;
	msgElement.appendChild(msgNameElement);
	msgElement.appendChild(msgTextElement);
	chatContainer.appendChild(msgElement);
});
