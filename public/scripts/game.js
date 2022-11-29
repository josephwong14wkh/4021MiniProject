function game_fuc() {
    /* Get the canvas and 2D context */
    const cv = $("canvas").get(0);
    const context = cv.getContext("2d");

    $("#container").hide();
    $("#game-container").show();

    /* Create the sounds */
    const sounds = {
        background: new Audio("../media/background.mp3"),
        collect: new Audio("../media/collect.mp3"),
        gameover: new Audio("../media/gameover.mp3")
    };

    const totalGameTime = 5;   // Total game time in seconds
    const gemMaxAge = 3000;     // The maximum age of the gems in milliseconds
    let gameStartTime = 0;      // The timestamp when the game starts
    let collectedGems = 0;      // The number of gems collected in the game

    /* Create the game area */
    const gameArea = BoundingBox(context, 165, 60, 420, 800);

    /* Create the sprites in the game */
    const player = Player(context, 427, 240, gameArea); // The player
    const gem = Gem(context, 427, 350, "green");        // The gem


    // Create fires
    // get four conrner location
    const {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    } = gameArea.getPoints()
    
    const fires = [
        Fire(context, topLeft[0], topLeft[1]),
        Fire(context, topRight[0], topRight[1]),
        Fire(context, bottomLeft[0], bottomLeft[1]),
        Fire(context, bottomRight[0], bottomRight[1])
    ]
    

    /* The main processing of the game */
    function doFrame(now) {
        if (gameStartTime == 0) gameStartTime = now;

        /* Update the time remaining */
        const gameTimeSoFar = now - gameStartTime;
        const timeRemaining = Math.ceil((totalGameTime * 1000 - gameTimeSoFar) / 1000);
        $("#time-remaining").text(timeRemaining);


        /* TODO */
        /* Handle the game over situation here */
        if (timeRemaining == 0) {
            $("#game-start").hide();
            $("#final-gems").text(collectedGems);
            $("#game-over").show(); 

            
            // constrcut and send statistic data
            timeleft = 12;
            health = 80;
            
            data = {timeleft, health};
            Socket.send_stat(data);

            sounds.background.pause();
            sounds.collect.pause();
            sounds.gameover.play();
            return;    // stop the animation loop 
        }


        /* Update the sprites */
        gem.update(now);
        player.update(now);
        for (let obj of fires) 
            obj.update(now);


        /* TODO */
        /* Randomize the gem and collect the gem here */
        if (gem.getAge(now) > gemMaxAge)
            gem.randomize(gameArea);

        /* Check whether the player can collect the gem */
        const {x, y} = gem.getXY();
        const box = player.getBoundingBox(); 
        if (box.isPointInBox(x, y)) {
            sounds.collect.play();
            collectedGems++;

            // randomize a new gem
            gem.randomize(gameArea);
        }
        
        /* Clear the screen */
        context.clearRect(0, 0, cv.width, cv.height);

        /* Draw the sprites */
        gem.draw();
        player.draw();
        for (let obj of fires) 
            obj.draw();

        /* Process the next frame */
        requestAnimationFrame(doFrame);
    }

    /* Handle the start of the game */
    $("#game-start").on("click", function() {
        /* Hide the start screen */
        $("#game-start").hide();

        // play bg music 
        sounds.background.play();

        /* Handle the keydown of arrow keys and spacebar */
        $(document).on("keydown", function(event) {

            /* TODO */
            /* Handle the key down */
            // console.log ("Releasing key:" + event.keyCode);
            switch (event.keyCode) {
                case 37: player.move(1); break;
                case 38: player.move(2); break;
                case 39: player.move(3); break;
                case 40: player.move(4); break; 
                case 32: player.speedUp(); break;
            }

        });

        /* Handle the keyup of arrow keys and spacebar */
        $(document).on("keyup", function(event) {

            /* TODO */
            /* Handle the key up */
            // console.log ("Releasing key:" + event.keyCode);
            switch (event.keyCode) {
                case 37: player.stop(1); break;
                case 38: player.stop(2); break;
                case 39: player.stop(3); break;
                case 40: player.stop(4); break;
                case 32: player.slowDown(); break;
            }

        });

        /* Randomize the gem */
        gem.randomize(gameArea);

        /* Start the game */
        requestAnimationFrame(doFrame);
    });
};