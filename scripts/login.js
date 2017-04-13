var loginPanel = document.querySelector('#login-panel');
var loginNameInput = document.querySelector('#user');
var loginPassword = document.querySelector('#passkey');
var loginButton = document.querySelector('#loginbutton');
var headingName = document.querySelector('#headingname'); 
var chatPanel = document.querySelector('#chat-panel');
var logoutButton = document.querySelector('#logoutbutton');

function createNewUser(name, passkey){
	console.log('createNewUser');
	firebase.database().ref('/users/'+ name).set({
		name: name,
		password: passkey
	});
	loggedIn(name);
}

function loggedIn(name){
	console.log(name);
	localStorage.setItem('chatuser', name);
	loginPanel.style.display = 'none';
	headingName.innerHTML = name + "'s chatroom";
	chatPanel.style.display = 'block';
}

function verifySession(){
	var chatuser = localStorage.getItem('chatuser');
	if(chatuser == undefined || chatuser == null || chatuser == ''){
		return false;
	} else{
		return true;
	}
}

logoutButton.addEventListener('click', function(){
	localStorage.removeItem('chatuser');
	location.reload();
})

loginButton.addEventListener('click',function(){
		var name = loginNameInput.value;
		var password = loginPassword.value;
		console.log('addEventListener');
		if(name !=="" && password !==""){
			return firebase
				.database()
				.ref('/users' + name)
				.once('value')
				.then(function(snapshot){
					if(snapshot.val() === null){
						var answer = confirm("User does not exits. Do you want to continue or not");
						if(answer){
						createNewUser(name, password);
						}
					}
					else if(snapshot().val().password==password){
						loggedIn(snapshot.val().name);
					}else{
						alert('You enterred the wrong password');
					}
				});
		}
});

if(verifySession()){
	loggedIn(localStorage.getItem('chatuser'));
	
}



