const SignInForm = (function() {
    // This function initializes the UI
    const initialize = function() {
        // Populate the avatar selection
        Avatar.populate($("#register-avatar"));
        
        // Hide it
        $("#signin-overlay").hide();

        // Submit event for the signin form
        $("#signin-form").on("submit", (e) => {
            // Do not submit the form
            e.preventDefault();

            // Get the input fields
            const username = $("#signin-username").val().trim();
            const password = $("#signin-password").val().trim();

            // Send a signin request
            Authentication.signin(username, password,
                () => {
                    hide();
                    UserPanel.update(Authentication.getUser());
                    UserPanel.show();

                    // hide the instr. page 
                    ChatPanel.hide_instruction();
                    Socket.connect();
                },
                (error) => { $("#signin-message").text(error); }
            );
        });

        // Submit event for the register form
        $("#register-form").on("submit", (e) => {
            // Do not submit the form
            e.preventDefault();

            // Get the input fields
            const username = $("#register-username").val().trim();
            const avatar   = $("#register-avatar").val();
            const name     = $("#register-name").val().trim();
            const password = $("#register-password").val().trim();
            const confirmPassword = $("#register-confirm").val().trim();

            // Password and confirmation does not match
            if (password != confirmPassword) {
                $("#register-message").text("Passwords do not match.");
                return;
            }

            // Send a register request
            Registration.register(username, avatar, name, password,
                () => {
                    $("#register-form").get(0).reset();
                    $("#register-message").text("You can sign in now.");
                },
                (error) => { $("#register-message").text(error); }
            );
        });
    };

    // This function shows the form
    const show = function() {
        $("#signin-overlay").fadeIn(500);
    };

    // This function hides the form
    const hide = function() {
        $("#signin-form").get(0).reset();
        $("#signin-message").text("");
        $("#register-message").text("");
        $("#signin-overlay").fadeOut(500);
    };

    return { initialize, show, hide };
})();

const UserPanel = (function() {
    // This function initializes the UI
    const initialize = function() {
        // Hide it
        $("#user-panel").hide();

        // Click event for the signout button
        $("#signout-button").on("click", () => {
            // Send a signout request
            Authentication.signout(
                () => {
                    Socket.disconnect();

                    hide();
                    // SignInForm.show();
                    ChatPanel.show_instruction();
                }
            );
        });
    };

    // This function shows the form with the user
    const show = function(user) {
        $("#user-panel").show();
    };

    // This function hides the form
    const hide = function() {
        $("#user-panel").hide();
    };

    // This function updates the user panel
    const update = function(user) {
        if (user) {
            $("#user-panel .user-avatar").html(Avatar.getCode(user.avatar));
            $("#user-panel .user-name").text(user.name);
        }
        else {
            $("#user-panel .user-avatar").html("");
            $("#user-panel .user-name").text("");
        }
    };

    return { initialize, show, hide, update };
})();

const OnlineUsersPanel = (function() {
    // This function initializes the UI
    const initialize = function() {};

    // This function updates the online users panel
    const update = function(onlineUsers) {
        const onlineUsersArea = $("#online-users-area");

        // Clear the online users area
        onlineUsersArea.empty();

		// Get the current user
        const currentUser = Authentication.getUser();

        // Add the user one-by-one
        for (const username in onlineUsers) {
            if (username != currentUser.username) {
                onlineUsersArea.append(
                    $("<div id='username-" + username + "'></div>")
                        .append(UI.getUserDisplay(onlineUsers[username]))
                );
                // Set click icon pair up event
                $("#username-" + username).on('click', ()=> {
                    response = confirm("Are you sure you want to pair up with " + onlineUsers[username].name + "?");
                    if(response) 
                        Socket.pairUser(currentUser.name, onlineUsers[username].name);
                });
            }
        }
    };

    // This function adds a user in the panel
	const addUser = function(user) {
        const onlineUsersArea = $("#online-users-area");
		
		// Find the user
		const userDiv = onlineUsersArea.find("#username-" + user.username);
		
		// Add the user
		if (userDiv.length == 0) {
			onlineUsersArea.append(
				$("<div id='username-" + user.username + "'></div>")
					.append(UI.getUserDisplay(user))
			);
		}

        // set up the pair up click
        $("#username-" + user.username).on('click', ()=> {
            response = confirm("Are you sure you want to pair up with " + user.name + "?");
            curr_user = Authentication.getUser();
            if(response) 
                Socket.pairUser(curr_user.name ,user.name);
        });
	};

    // This function removes a user from the panel
	const removeUser = function(user) {
        const onlineUsersArea = $("#online-users-area");
		
		// Find the user
		const userDiv = onlineUsersArea.find("#username-" + user.username);
		
		// Remove the user 
		if (userDiv.length > 0) userDiv.remove();
	};
    return { initialize, update, addUser, removeUser };
})();

const ChatPanel = (function() {
	// This stores the chat area
    let chatArea = null;

    // This function initializes the UI
    const initialize = function() {
		// Set up the chat area
		chatArea = $("#chat-area");

        text = "Your goal is to collect the star in top level of the map. \
                You can also pick up different speical objects in the game. <br><br>\
                Bomb will damage your health bar! <br> Heart will heal your health! <br>\
                Shoes will speedup your character! <br> Sheild could protect you from a damage! <br><br>\
                Player1's key (WASD) <br> Player2's key (↑←↓→)<br>\
                Player1 cheat key: Shift <br> Player2's cheat key: H" 

        chatArea.append(
			$("<div class='chat-instruction-container'></div>")
            .append($("<div class='chat-instruction-title'>" + "Game Instructions" + "<br><br></div>"))
            .append($("<div class='chat-instruction'>" + text + "</div>")));

        // begin button 
        $("#start_game_button").on("click", ()=> {
            SignInForm.show(); 
        });
 	};

    // This function updates the chatroom area
    const update = function(chatroom) {
        // Clear the online users area
        chatArea.empty();

        // Add the chat message one-by-one
        for (const message of chatroom) {
			addMessage(message);
        }
    };

    const hide_instruction = function() {
        $(".chat-instruction-container").remove();
        $("#start_game_button_container").hide();
    };
    const show_instruction = function() {
        ChatPanel.initialize();
        $("#start_game_button_container").show();
    };

    const show_pairup = function (name) {
        chatArea = $("#chat-area");

        chatArea.append(
            $("<div class ='pairup-container'></div>").
            append($("<div class ='pairup-windows'>Do you want to pair up with "+ name + "? </div>")).
            append($("<div class='pair_button_container'></div>").
            append($("<button id='pair_button' type='pair'>Pair</button> \
            <button id='unpair_button' type='unpair'>Cancel</button>"))));
        
        $("#pair_button").on('click', ()=> {
            chatArea.empty();
            Socket.startgame();
        });

        $("#unpair_button").on('click', ()=> {
            chatArea.empty();
        });
    };

    const show_endpage = function(time, health) {
        time = 14;
        health = 30; 

        chatArea = $("#chat-area");

        // chatArea.append(
		// 	$("<div class ='pairup-container''></div>")
        //     .append($("<div class='chat-enpage-title'>" + "Game Statistics" + "<br><br></div>"))
        //     .append($("<div class='chat-date'>" + time + "</div>"))
        //     .append($("<div class='chat-content'>" + health + "</div>")));


        // chatArea.append(
        //     $("<div class ='pairup-container'></div>").
        //     append($("<div class ='pairup-windows'>Game Statistics</div>")).
        //     append($("<div class='col>" + time + "</div>")).
        //     append($("<div class='col'>" + health + "</div>")));


        // chatArea.append(
        //     $("<div class='chat-message-panel row'></div>")

        //         .append($("<div class='chat-message col'></div>")
        //             .append($("<div class='chat-date'>" + time + "</div>"))
        //             .append($("<div class='chat-content'>" + health + "</div>"))
        //         )
        // );    
        
        room_page();
    }
    const room_page = function() {
        setTimeout(()=> {
            $('#game-over').hide();
            $("#container").show();
            $("#game-container").hide();
        }, 2000);
    }

    return { initialize, update, hide_instruction, show_instruction, show_endpage, show_pairup, room_page };
})();



const UI = (function() {
    // This function gets the user display
    const getUserDisplay = function(user) {
        return $("<div class='field-content row shadow'></div>")
            .append($("<span class='user-avatar'>" +
			        Avatar.getCode(user.avatar) + "</span>"))
            .append($("<span class='user-name'>" + user.name + "</span>"));
    };

    // The components of the UI are put here
    const components = [SignInForm, UserPanel, OnlineUsersPanel, ChatPanel];

    // This function initializes the UI
    const initialize = function() {
        // Initialize the components
        for (const component of components) {
            component.initialize();
        }
    };

    return { getUserDisplay, initialize };
})();
