const Socket = (function() {
    // This stores the current Socket.IO socket
    let socket = null;

    // This function gets the socket from the module
    const getSocket = function() {
        return socket;
    };

    // This function connects the server and initializes the socket
    const connect = function() {
        socket = io();

        // Wait for the socket to connect successfully
        socket.on("connect", () => {
            // Get the online user list
            socket.emit("get users");

            // Get the chatroom messages
            socket.emit("get messages");
        });

        // Set up the users event
        socket.on("users", (onlineUsers) => {
            onlineUsers = JSON.parse(onlineUsers);

            // Show the online users
            OnlineUsersPanel.update(onlineUsers);
        });

        // Set up the add user event
        socket.on("add user", (user) => {
            user = JSON.parse(user);

            // Add the online user
            OnlineUsersPanel.addUser(user);
        });

        // Set up the remove user event
        socket.on("remove user", (user) => {
            user = JSON.parse(user);

            // Remove the online user
            OnlineUsersPanel.removeUser(user);
        });

        // Set up the acceptance event 
        socket.on("accept pair", (sender_name, recevier_name) => {     
            // console.log(sender_name, recevier_name);      
            if (Authentication.getUser().name == recevier_name) {
                const response = confirm("Do want to pair up with " + sender_name + "?");
                if(response)
                    socket.emit("start game");
            }
        });

        // start game 
        socket.on("start game", startgame);

        socket.on("rand", () => {
            console.log("in socket.on rand");
            console.log(Authentication.getUser());
            console.log(socket.request.session.user);
            if (Authentication.getUser() != socket.request.session.user) {
                console.log("in if");
                randomize();
            }
        })
    };

    // This function disconnects the socket from the server
    const disconnect = function() {
        socket.disconnect();
        socket = null;
    };

    // This function sends a post message event to the server
    const postMessage = function(content) {
        if (socket && socket.connected) {
            socket.emit("post message", content);
        }
    };

    // This function send a pair up request to server
    const pairUser= function(sender_name, recevier_name) {
        if (socket && socket.connected) {
            // console.log("send pair to" + username);
            socket.emit("pair user", sender_name, recevier_name);
        }
    };
    const startgame = function() {
        if (socket && socket.connected) {
            main();
        }
    };

    // This function send statistics data to sever
    const send_stat = function(data) {
        if (socket && socket.connected) {
            socket.emit("send stat", data);
        }
    }
    
    return { getSocket, connect, disconnect, postMessage, pairUser, startgame, send_stat};
})();
