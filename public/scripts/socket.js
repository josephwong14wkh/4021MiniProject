const Socket = (function() {
    // This stores the current Socket.IO socket
    let socket = null;
    let I_am = null;
    let isSender = null;
    let other_x = 0
    let other_y = 0;
    let other_dir = 0;

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
            if (Authentication.getUser().name == recevier_name) {
                I_am = recevier_name;
                isSender = false;
                ChatPanel.show_pairup(sender_name);
            }
        });

        // Set up the get location event
        socket.on("finish edit loc", (type) => {
            socket.emit("get other loc", type);
        });

        // Set up the receive location event
        socket.on("update other loc", (x, y, dir) => {
            other_x = x;
            other_y = y;
            other_dir = dir;
        })

        // start game 
        socket.on("accept start game", () => {main(I_am, isSender)});
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
            I_am = sender_name;
            isSender = true;
            socket.emit("pair user", sender_name, recevier_name);
        }
    };

    const startgame = function() {
        if (socket && socket.connected) {
            socket.emit("start game");
        }
    };

    // This function request statistics data to sever
    const get_stat = function() {
        if (socket && socket.connected) {
            socket.emit("send stat");
        }
    }

    const end_game = function() {
        if (socket && socket.connected) {
            // main();
        }
    }

    // This function send players'location to server
    const send_loc = function(type, player, username){
        if (socket && socket.connected) {
            const {x, y} = player.getXY();
            const direction = player.getDirection();
            socket.emit("send loc", type, x, y, direction, username);
        }
    }
    
    const get_other_loc = function() {
        return {other_x, other_y, other_dir};
    }
    return { getSocket, connect, disconnect, postMessage, pairUser, startgame, get_stat, send_loc, get_other_loc};
})();
