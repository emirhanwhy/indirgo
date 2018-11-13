
<!-- saved from url=(0041)https://www.shoutbox.com/chat/chat.js.php -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body cz-shortcut-listen="true">document.write('<link rel="stylesheet" type="text/css" href="./chat_files/shoutbox.css">\<link rel="stylesheet" type="text/css" href="./chat_files/font-awesome.min.css">\<script src="./chat_files/sprintf.min.js.indir"></script>\<script src="./chat_files/jquery.min.js.indir"></script>\<script src="./chat_files/socket.io.js.indir"></script>\<div class="shoutBoxContainer">\    <div id="shoutBoxHeader" class="shoutBoxHeader">\        <i class="fa fa-users" alt="users online" title="users Online"></i>\        <div id="shoutBoxHeaderText"></div>\        <div id="shoutBoxUserList"></div>\    </div>\    <div id="shoutChat" class="shoutChat"></div>\    <div class="shoutInput">\        <input class="shoutInputRed" required="" type="text" id="shoutBoxInput" placeholder="Enter your nickname">\        <div class="adShoutBox">\            Get your own <a href="https://www.shoutbox.com/" title="get your free shout box">free shoutbox</a>\        </div>\    </div>\    <div id="configPanel" class="configPanel">\    	<div>\        	<div style="margin-left:10px"><label for="emailAdmin">Shoutbox admin panel</label></div>\            <input type="text" placeholder="Enter email" id="emailAdmin">\        </div>\        <div>\	        <input type="password" placeholder="Enter password" id="passwordAdmin">\        </div>\        <div>\        	<button type="button" id="loginAdminBtn">Enter as admin</button>\        </div>\        <div class="error"></div>  \        <div style="text-align:center"><span id="forgottenBtn">forgotten password ?</span></div>\              \	</div>\    \    <div id="configPanel2" class="configPanel">\    	<div>\        	<div><label for="changePassword1">Enter new pasword</label></div>\            <div>\                <input type="password" id="changePassword1" placeholder="Enter new password">\                <input type="password" id="changePassword2" placeholder="Enter new password">\            </div>\            <div style="margin-top:15px"><label for="userMustRegister">User must register before enter shoutbox <input type="checkbox" id="userMustRegister"></label></div>\            <div><button type="button" id="saveBtn">Save config</button></div>\            <div class="error"></div>         \        </div>\    </div>\    \    <div id="forgottenPassword" class="configPanel">\    	<div>\        	<div><label for="forgottenEmail">Enter email to get your password back</label></div>\            <div><input type="text" required="" id="forgottenEmail" placeholder="enter your email"></div>\            <div><button id="sendMyPasswordBtn">Send me my password</button></div>\			<div class="error"></div>             \        </div>\    </div>  \    \    <div id="loginPanel" class="configPanel">\    	<div>\        	<div>Enter email</div>\            <div><input type="text" required="" id="usernameLogin" placeholder="Enter your username or email"></div>\            <div><input type="text" required="" id="passwordLogin" placeholder="Enter your password"></div>\            <div><button id="sendMyPasswordBtn">Login</button></div>\            <div>\            	<div>Register for new account</div>\            </div>\             <div>\            	<div>forgotten password ?</div>\            </div>\            <div><input type="text" required="" id="passwordLogin" placeholder="Enter your password"></div>           \			<div class="error"></div>             \        </div>\    </div> \    \    <div id="registerPanel" class="configPanel">\    	<div>\        	<div>Enter email</div>\            <div><input type="text" required="" id="usernameRegister" placeholder="Enter your username or email"></div>\            <div><input type="text" required="" id="passwordRegister" placeholder="Enter your password"></div>\            <div><input type="text" required="" id="passwordRegister" placeholder="Confirm your password"></div>\            <div><button id="registerBtn">Register</button></div>\            <div><input type="text" required="" id="passwordLogin" placeholder="Enter your password"></div>           \			<div class="error"></div>             \        </div>\    </div>  \    \    <div id="forgottenPasswordUser" class="configPanel">\    	<div>\        	<div><label for="forgottenUserEmail">Enter email to get your password back</label></div>\            <div><input type="text" required="" id="forgottenUserEmail" placeholder="enter your email"></div>\            <div><button id="sendUserPasswordBtn">Send me my password</button></div>\			<div class="error"></div>             \        </div>\    </div>             \    \    \    \    <div class="adminCog">\    	<i class="fa fa-cog" id="shoutBoxAdminImage" style="float:right;margin-top: 2px;" title="login admin"></i>\    </div>\</div>');
var Chat = function(room, username, avatar) {
	var server = "https://www.shoutbox.com";
	avatar = avatar || "https://www.shoutbox.com/avatars/" + Math.ceil(Math.random()*29) + ".svg";
	username = username || '';	
	var shoutbox = this;
    console.log("init");
	this.myUser = {"username":username, "room":room, "avatar":avatar, "password":"", id: new Date().getTime()};
	

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
	
this.ago = function(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval &gt; 0) {
        return interval + " y. ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval &gt; 0) {
        return interval + " mon. ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval &gt; 0) {
        return interval + " d. ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval &gt; 0) {
        return interval + " h ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval &gt; 0) {
        return interval + " min. ago";
    }
	return "now";
    //return Math.floor(seconds) + " s ago";
};
	
// traductions
	this.traductions = {
	welcome:"Welcome %s. <button type="button" class="changeUsernameBtn">Change username</button>",
	userOnline:"%s user online",
	usersOnline:"%s users online",
	enterYourTextHere : "Enter your text here",
	serverMessage: "<div class="shoutServerText">%s</div>",
	enterAdminPassword:"Enter admin password",
	imageAvatar: "<img src="./chat_files/%s" class="shoutBoxAvatar">",
	youAreAdminNow:"You are admin now",
	mp3: "https://www.shoutbox.com/chat/dink.mp3",
	addUser : "<div class="shoutBoxUserItem" data-id="%s" id="shoutBoxUser%s">%s %s</div>",
	banText : "<button class="shoutboxBanBtn" alt="Ban all messages from this user" title="Ban all messages from this user">Ban</button>",
	receivedText:"<div data-id="%s" data-ip="%s" class="shoutText">%s<span class="shoutDate">%s </span><span class="shoutUserText">%s</span>: %s<button class="shoutboxBanBtn">ban</button><button class="shoutboxDelBtn">del</button></div>"
	
};
// smileys
	this.smileys = {
	"(angry)":"<img src="./chat_files/(angry).gif">",
	"(lol)":"<img src="./chat_files/(lol).gif">",
	"(love)":"<img src="./chat_files/(love).gif">",
	"(sorry)":"<img src="./chat_files/(sorry).gif">",
	"(why)":"<img src="./chat_files/(why).gif">",
	":D":"<img src="./chat_files/D).gif">",
	";(":"<img src="./chat_files/saved_resource">",
	";)":"<img src="./chat_files/(happy).gif">",
	":)":"<img src="./chat_files/(happy).gif">"
};
	this.parseSmileys = function(text) {
		for (var symbol in this.smileys) {
			var image = this.smileys[symbol];
			text = text.replaceAll(symbol,image);
		}
		return text;
	};
		

	this.stripHTML = function(html) {
		var div = document.createElement("div");
		div.innerHTML = html;
		return div.textContent || div.innerText || "";		
	};
	
	this.clearChat = function() {
		$("#shoutChat").html("");
	};
	
	this.refreshChat = function() {
		this.clearChat();
		var shoutbox = this;
		$.post('https://www.shoutbox.com/chat/ajax.php',{a:'getLastMessages', id:shoutbox.myUser.room},function(data) {
			var messages = JSON.parse(data);
			//console.log(messages.length);
			for (var i=messages.length-1;i&gt;=0;i--) {
				var message = messages[i];
				shoutbox.receiveText(message.username , message.message, message.date,0,message.avatar,message.ip, message.id);
			}
		});		
	};
	
	
	this.getLastMessages = function() {
		var shoutbox = this;
		$.post('https://www.shoutbox.com/chat/ajax.php',{a:'getLastMessages', id:shoutbox.myUser.room},function(data) {
			var messages = JSON.parse(data);
			//console.log(messages.length);
			for (var i=messages.length-1;i&gt;=0;i--) {
				var message = messages[i];
				shoutbox.receiveText(message.username , message.message, message.date, 0, message.avatar, message.ip, message.id);
			}
			if (shoutbox.myUser.username!=='') {
				shoutbox.welcome();
			}
		});
	};
	
    function keyPressedFunction(e){
        //console.log("keyPressed");
	  	if (!e) {
			e = window.event;
		}
		    var keyCode = e.keyCode || e.which;
    		if (keyCode == '13'){
	      	  this.sendText();
	    }		
    }   

    this.sendText = function() {	
        var texte = $('#shoutBoxInput').val();
		texte = this.stripHTML(texte);
        if (texte==='') {
			return;
		}
		// enter username
		if (this.enteringAdminPassword) {
			this.enteringAdminPassword = false;
			this.shoutboxSocket.emit("checkPassword", texte);
			$("#shoutBoxInput").removeClass("adminShoutBoxInput");
			$('#shoutBoxInput').val('');
			$('#shoutBoxInput').get(0).type = 'text';
			$('#shoutBoxInput').attr("placeholder", shoutbox.traductions.enterYourTextHere);
			return;
		}

		if (this.myUser.username==='') {
			this.myUser.username = texte;
			$('#shoutBoxInput').val("");
			shoutbox.welcome();
			shoutbox.shoutboxSocket.emit('changeUser', shoutbox.myUser);
			return;
		}
        $('#shoutBoxInput').val('');
        this.shoutboxSocket.emit('send', this.myUser, texte);
		   
    };
	this.welcome = function() {
		$('#shoutBoxInput').attr("placeholder", shoutbox.traductions.enterYourTextHere);
		localStorage.setItem("username", this.myUser.username);
		this.serverMessage(sprintf(shoutbox.traductions.welcome, this.myUser.username));
		$("#shoutBoxInput").removeClass("shoutInputRed");
		localStorage.setItem('username', this.myUser.username);
	};

	
	this.serverMessage = function(texte) {

		$("#shoutChat").append(sprintf(shoutbox.traductions.serverMessage, texte));
		$("#shoutChat").animate({ scrollTop: $("#shoutChat")[0].scrollHeight}, 1000);
	};
	
    this.receiveText = function(username, message, date, scrollTimer, avatar, ip, id) {  
		message = shoutbox.parseSmileys(message);
		if (avatar!=="") {
			avatar = sprintf(shoutbox.traductions.imageAvatar, avatar);
		}
		if (date!=='') {
			date="("+date+")";
		}
		var text = sprintf(shoutbox.traductions.receivedText, id, ip, avatar, date, username, message);
		//console.log(text);

		$("#shoutChat").animate({ scrollTop: $("#shoutChat")[0].scrollHeight}, scrollTimer);	
		$(text).hide().appendTo("#shoutChat").fadeIn(2000);   
    };
	
	this.addUser = function(user) {
		if (user.username==='') {
			user.username='Guest';
		}
		this.updateNumberUsersDisplay();
		var avatar = user.avatar;
		if (avatar!=='') {
			var image  = user.avatar || 'avatars/' + Math.ceil(Math.random()*29) + '.svg';
			avatar = sprintf(shoutbox.traductions.imageAvatar, image);
		}
		var txt = sprintf(shoutbox.traductions.addUser, user.id, user.id, avatar, user.username);
		//console.log(user);
		//console.log("shoutBoxUserList"+txt);
		$('#shoutBoxUserList').append(txt);
		
	};
	
	
//******************************************* init ********************************************
	
	
    document.getElementById('shoutBoxInput').addEventListener("keypress", keyPressedFunction.bind(this), false);
	this.getLastMessages();
	this.users = [];
	
	this.shoutboxSocket = io.connect(server+":1400");
	this.shoutboxSocket.on('connect', function() {
		var username = localStorage.getItem('username');
		if(username) {
			shoutbox.myUser.username = username;
		}
		shoutbox.shoutboxSocket.emit('enterRoom', shoutbox.myUser);
	});
	
	this.shoutboxSocket.on('roomEntered', function () {
		var username = localStorage.getItem('username');
		if (username) {
			shoutbox.welcome();
		}
	});
	
	this.shoutboxSocket.on('del', function (id) {
		$('*[data-id='+id+']').remove();		
	});
	
	this.shoutboxSocket.on('ban', function (ip) {
		$('*[data-ip='+ip+']').remove();		
	});	
		
	
	this.shoutboxSocket.on('receiveText', function (user, message, ip, id) {
		shoutbox.receiveText(user.username, message , "",200,user.avatar, ip, id);
		var snd = new Audio(shoutbox.traductions.mp3);
		snd.play();		
	});
	
	this.setAdminMode = function(password) {
		this.myUser.password = password;
		shoutbox.serverMessage(shoutbox.traductions.youAreAdminNow);
		$("#shoutBoxAdminImage").toggle();
	};
	

	$( ".shoutBoxContainer").on( "click", ".shoutboxBanBtn", function() {
		var ip = ($(this).parent().data("ip"));
	  	shoutbox.shoutboxSocket.emit("ban", ip);
	});
	
	$( ".shoutBoxContainer").on( "click", ".shoutboxDelBtn", function() {
		var id = ($(this).parent().data("id"));
	  	shoutbox.shoutboxSocket.emit("del", id);
	});
		
		
		

	this.shoutboxSocket.on('userChanged', function (user) {
		var avatar = user.avatar;
		if (avatar!=='') {
			avatar = sprintf(shoutbox.traductions.imageAvatar, avatar);
		}		
		var txt = sprintf(shoutbox.traductions.addUser, user.id, user.id, avatar, user.username);
		//console.log(txt);
		$("#shoutBoxUser"+user.id).html(txt);
	});	

	
	this.shoutboxSocket.on('setAdminMode', function (password) {
		shoutbox.setAdminMode(password);
		$(".shoutboxBanBtn").css("display","block");
		$(".shoutboxDelBtn").css("display","block");
	});	
	
	this.shoutboxSocket.on('error', function (errorMessage) {
		console.log(errorMessage);
	});

	
	this.shoutboxSocket.on('addUser', function(user) {
		shoutbox.users[user.id] = user;
		shoutbox.addUser(user);
	});
	$(document).on('click', ".changeUsernameBtn", function() {
        localStorage.clear();
		shoutbox.myUser.username = '';
		$("#shoutBoxInput").addClass("shoutInputRed");
		$('#shoutBoxInput').val('');
		$('#shoutBoxInput').attr("placeholder", 'Enter new nickname');
    });
	
	this.updateNumberUsersDisplay = function() {
        var len =  Object.keys(shoutbox.users).length;
		var text = sprintf(shoutbox.traductions.userOnline, len);
		if (shoutbox.users.length&gt;1) {
			text = sprintf(shoutbox.traductions.usersOnline, len);
		}
		$("#shoutBoxHeaderText").text(text);
	};

	this.shoutboxSocket.on('getUsers', function(usersInRoom) {
		// convert to array !
		//console.log("usersInRoom="+usersInRoom+ "len=" + usersInRoom.length);
		shoutbox.users = usersInRoom;
		shoutbox.updateNumberUsersDisplay();
		//shoutbox.sortUsers();
        for (var id in usersInRoom) {
            shoutbox.addUser(usersInRoom[id]);
        }

	});
	
	this.sortUsers = function() {
		shoutbox.users.sort(function(user1, user2) {
   			return user1.avatar &lt; user2.avatar;
		});
	};
	
	this.shoutboxSocket.on('removeUser', function(user) {
		delete shoutbox.users[user.id];
		shoutbox.updateNumberUsersDisplay();
		$("#shoutBoxUser"+user.id).remove();
		
	});	
	
	$(".shoutBoxContainer").on( "click", ".shoutBoxUserItem", function(e) {	
		e.stopImmediatePropagation();
		var userid = ($(e.currentTarget).data("id"));
		shoutbox.openPrivateChat(userid);
	});
	
	this.openPrivateChat = function(userid) {
		//$("body").append("<div class="privateChat">zaza</div>");
	};
	
	this.displayError = function($_element, message) {
		$_element.html(message);
		setTimeout(function() {
			$_element.empty();			
		},3000);
	};
	
	$("#forgottenBtn").click(function() {
        $("#forgottenPassword").slideToggle(200);
    });
	
	$("#saveBtn").click(function() {
    	var $_element = $(this).parent().parent().find(".error");
    	var userMustRegister = $("#userMustRegister").is(':checked');
		var password = $("#changePassword1").val(); 
		var password2 = $("#changePassword2").val(); 
		if (password.length&lt;3 || password!==password2) {
			shoutbox.displayError($_element , "Invalid Password");
			return;
		}
		$(".error").empty();
		$.ajax({
			type: 'POST',
			url: 'https://www.shoutbox.com/chat/ajax.php',
			crossDomain: true,
			data: {a:'updateAdmin', userMustRegister:userMustRegister, password:password},
			success: function (user) {
				if(user==="ko") {
					shoutbox.displayError($_element , "Invalid email/password");
					return;
				}
				user = JSON.parse(user);
				shoutbox.myUser.password = user.password;
				shoutbox.myUser.userMustRegister = user.userMustRegister;
				$("#configPanel2").slideToggle(200);
				$("#configPanel").hide();
			}
	    });					
    });
	
	$('#loginAdminBtn').click(function() {
		var $_element = $(this).parent().parent().find('.error');
        var email = $('#emailAdmin').val();
		var password = $('#passwordAdmin').val();
		if (password.length&lt;3) {
			shoutbox.displayError($_element , 'Invalid Password');
			return;
		}
		var re = /^(([^&lt;&gt;()[\]\\.,;:\s@"]+(\.[^&lt;&gt;()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if (!re.test(email)) {
			shoutbox.displayError($_element, 'Invalid email');
			return;
		}
		$('.error').empty();
		$.ajax({
			type: 'POST',
			url: 'https://www.shoutbox.com/chat/ajax.php',
			crossDomain: true,
			data: {a:'loginAdmin', email:email, password:password},
			success: function (user) {
				if(user==="ko") {
					shoutbox.displayError($_element , "Invalid email/password");
					return;
				}
				user = JSON.parse(user);
				shoutbox.myUser.username = "admin";
				shoutbox.myUser.password = user.password;
				shoutbox.myUser.userMustRegister = user.userMustRegister;
				shoutbox.myUser.isAdmin = true;
				shoutbox.myUser.avatar = 'https://www.shoutbox.com/avatars/admin.svg';
				$("#configPanel2").slideToggle(200);
				shoutbox.serverMessage(shoutbox.traductions.youAreAdminNow);
			}
	    });		
	});
	$("#sendMyPasswordBtn").click(function() {
        var $_element = $(this).parent().parent().find(".error");
		var re = /^(([^&lt;&gt;()[\]\\.,;:\s@"]+(\.[^&lt;&gt;()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	var email = $("#forgottenEmail").val();
		if (!re.test(email)) {
			shoutbox.displayError($_element, "Invalid email");
			return;
		}
		$.ajax({
			type: 'POST',
			url: 'https://www.shoutbox.com/chat/ajax.php',
			crossDomain: true,
			data: {a:'forgottenPasswordAdmin', email:email},
			success: function (res) {
				if(res==="ko") {
					shoutbox.displayError($_element , "No such email !");
					return;
				}
				$("#forgottenPassword").hide(200);
			}
	    });				
		
    });
	
	$("#shoutBoxAdminImage").click(function(e) {
		e.stopImmediatePropagation();
		$("#configPanel").slideToggle(200);
		$("#configPanel2").hide();
		$("#forgottenPassword").hide();
    });
	
	$("#shoutBoxHeader").click(function() {
    	$("#shoutBoxUserList").toggle("fast");
		
	});
	
};</body></html>