const express = require("express");

const bcrypt = require("bcrypt");
const fs = require("fs");
const session = require("express-session");

// Create the Express app
const app = express();

// Use the 'public' folder to serve static files
app.use(express.static("public"));

// Use the json middleware to parse JSON data
app.use(express.json());

// Use the session middleware to maintain sessions
const chatSession = session({
    secret: "game",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 300000 }
});
app.use(chatSession);

// This helper function checks whether the text only contains word characters
function containWordCharsOnly(text) {
    return /^\w+$/.test(text);
}

// Handle the /register endpoint
app.post("/register", (req, res) => {
    // Get the JSON data from the body
    const { username, avatar, name, password } = req.body;
    // console.log( username, avatar, name, password );

    // D. Reading the users.json file
    const users = JSON.parse(fs.readFileSync("data/users.json"));
    // console.log(users);

    // E. Checking for the user data correctness
    // If any field is empty, return an error
    if (!username || !avatar || !name || !password) {
        res.json({ status: "error",
                    error: "Username/avatar/name/password cannot be empty."});
        return;
    }
    // If the username contains invalid characters, return an error
    if (!containWordCharsOnly(username)) {
        res.json({ status: "error",
                    error: "Use rname can only contain underscores, letters or numbers."});
        return;
    }
    // If username exists, return an error
    if (username in users) {
        res.json({ status: "error",
                    error: "Username has already been used."});
        return;
    }
 
    // G. Adding the new user account
    const hash = bcrypt.hashSync(password, 10); // Hash the password
   
    users[username] = { avatar, name, password: hash };  // Add the user in the record

    // H. Saving the users.json file
    fs.writeFileSync("data/users.json", JSON.stringify(users, null, " ")); // Save the file

    // I. Sending a success response to the browser
    res.json({ status: "success" });
});

// Handle the /signin endpoint
app.post("/signin", (req, res) => {
    // Get the JSON data from the body
    const { username, password } = req.body;

    // D. Reading the users.json file
    const users = JSON.parse(fs.readFileSync("data/users.json"));

    // If username does not exist, return an error
    if (!(username in users)) {
        res.json({ status: "error", error: "Incorrect username/password." });
        return;
    }

    // Get the user 
    const user = users[username];

    if (!bcrypt.compareSync(password, user.password)) {
        res.json({ status: "error", error: "Incorrect username/password." });
        return;
    }

    // G. Sending a success response with the user account
    req.session.user =  { username, avatar: user.avatar, name: user.name };
    res.json({ status: "success", user: { username,  avatar: user.avatar, name: user.name  } });
});

// Handle the /validate endpoint
app.get("/validate", (req, res) => {

    // B. Getting req.session.user
    if (!req.session.user) { // If the user has not signed in, return a error 
        res.json({ status: "error", error: "You have not signed in." });
        return;
    }

    // D. Sending a success response with the user account
    res.json({ status: "success", user: req.session.user });

    // Delete when appropriate
    // res.json ({ status: "error", error: "This endpoint is not yet implemented." }) ;
});

// Handle the /signout endpoint
app.get("/signout", (req, res) => {

    // Deleting req.session.user
    delete req.session.user;

    // Sending a success response
    res.json({ status: "success"}); 
});


//
// ***** Please insert your Lab 6 code here *****
//

// Create the Socket.I0 server
const { createServer } = require("http");
const { Server } = require("socket.io");
const { send } = require("process");
const { info } = require("console");
const { type } = require("os");
const httpServer = createServer(app);
const io = new Server(httpServer);

// A JavaScript object storing the online users 
const onlineUsers = {};

// Handle the web socket connection
io.on("connection", (socket) => {
    // Add a new user to the online user list 
    if (socket.request.session.user) {
        const { username, avatar, name } = socket.request.session.user;
        onlineUsers[username] = { avatar, name};
        console.log(onlineUsers);

        // Broadcast the signed-in user
        io.emit("add user", JSON.stringify(socket.request.session.user));
    }

    // Set up the disconnect event
    socket.on("disconnect", () => {
        if (socket.request.session.user) {
            const { username } = socket.request.session.user;
            if (onlineUsers[username])
                delete onlineUsers[username];
            console.log(onlineUsers);

            // Broadcast the signed-out user
            io.emit("remove user", JSON.stringify(socket.request.session.user));
        }
    })

    // Set up the get users event
    socket.on("get users", () => {
        // Send the online users to the browser
        socket.emit("users", JSON.stringify(onlineUsers));
    });
    
    // Set up the get messages event
    // socket.on("get messages", () => {
    //     // Send the chatroom messages to the browser
    //     const messages = JSON.parse(fs.readFileSync("data/game.json"));
    //     socket.emit("messages", JSON.stringify(messages));
    // });

    // Set up the post message event 
    socket.on("post message", (content) => {
        // Add the message to the chatroom
        const { username, avatar, name } = socket.request.session.user;
        // read the chatroom message
        chatroom = JSON.parse(fs.readFileSync("data/game.json"));
        // form the new message js obj
        new_message = {
            user: { username, avatar, name },
            datetime: new Date(),
            content: content
        };
        chatroom.push(new_message);
         // Save the file
        fs.writeFileSync("data/game.json", JSON.stringify(chatroom, null, " "));
        
        // Broadcast the new message to all users
        io.emit("add message", JSON.stringify(new_message));
    });

    // Server listen to browser to any pair request
    socket.on("pair user", (sender, recevier) => {
        io.emit("accept pair", sender, recevier);
    });

    // Server event to notify the browsers to start game at the same time
    socket.on("start game", () => {
        io.emit("accept start game");
    });

    // Server send the statistics data to both cilents
    socket.on("send stat", () => {
        // js obj
        data =  JSON.parse(fs.readFileSync("data/game.json"));
        // console.log("test1" + JSON.stringify(data));
        io.emit("get stat", JSON.stringify(data));
    });

    socket.on("send loc", (type, x, y, direction, username) => {
        let users = JSON.parse(fs.readFileSync("data/information.json"));
        users[type]["name"] = username;
        users[type]["x"] = x;
        users[type]["y"] = y;
        users[type]["dir"] = direction;
        fs.writeFileSync("data/information.json", JSON.stringify(users, null, " "));
        socket.emit("finish edit loc", type);
    })

    socket.on("get other loc", (type) => {
        const users = JSON.parse(fs.readFileSync("data/information.json"));
        let x = 0;
        let y = 0;
        let dir = 0;
        for (let key in users) {
            if (key != type){   // take other user's location
                let info = users[key];
                x = info["x"];
                y = info["y"];
                dir = info["dir"];
                break;
            }
        }
        socket.emit("update other loc", x, y, dir);
    });
});


// Use the session in the Socket.I0 server
io.use((socket, next) => {
    chatSession(socket.request, {}, next);
});

// Use a web server to listen at port 8000
httpServer.listen(8000, () => {
    console.log("The chat server has started...");
});
