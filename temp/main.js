$(document).ready(function () {
    const cv = $("canvas").get(0);
    const context = cv.getContext("2d");

    const sounds = {};

    const totalgametime = 180;
    let gamestarttime = 0;

    //boundary of gamearea, should be const, using let for temp
    let top = 165;
    let left = 60;
    let bottom = 420;
    let right = 800;

    //Refer to lab4 BoundingBox.js
    const gamearea = BoundingBox(context, top, left, bottom, right)

    //Create sprites
    //Create P1 & P2 from the two side of canvas
    const player1 = Player(context, left, bottom, gamearea);
    const player2 = Player(context, right, bottom, gamearea);

    //Create items
    const bombs = [ Bomb(context, Math.random() * (right - left) + left, -10),
                    Bomb(context, Math.random() * (right - left) + left, -10),
                    Bomb(context, Math.random() * (right - left) + left, -10),
                    Bomb(context, Math.random() * (right - left) + left, -10),
                    Bomb(context, Math.random() * (right - left) + left, -10)]

    const boots = Boot(context, Math.random() * (right - left) + left, Math.random() * (bottom - top) + top);
    const hearts = Heart(context, Math.random() * (right - left) + left, Math.random() * (bottom - top) + top);
    const shields = Shield(context, Math.random() * (right - left) + left, Math.random() * (bottom - top) + top);
    const enemies = Enemy(context, Math.random() * (right - left) + left, Math.random() * (bottom - top) + top);

    const maxbomb = 5;
    const yarr = [];

    let reverse = false;
    let exist = true;

    function doFrame(now) {
        //Handle game start and gameover
        if (gamestarttime == 0) gamestarttime = now;

        //Update time remaining
        const gameTimeSoFar = now - gamestarttime;
        const timeRemaining = Math.ceil((totalgametime * 1000 - gameTimeSoFar) / 1000);
        $("#time-remaining").text(timeRemaining);

        //Gameover
        if (timeRemaining == 0) {
            //Show gameover page
            $('#game-over').show();
            return 0;
        }
        
        //Update objects
        //Refer to lab4 sprite.js
        player1.update(now);
        player2.update(now);
        bombs.forEach(bomb => {bomb.update(now);});
        hearts.update(now);
        shields.update(now);
        enemies.update(now);
        boots.update(now);

        //Generate object
        for (let i=0; i<maxbomb; i++) yarr.push(Math.random() * (bottom - top) + top);
        dropBomb(bombs, yarr, now);
        checkTouchBomb(player1, player2, bombs, yarr)
        enemyMove(enemies, reverse, exist);
        checkTouchEnemy(player1, player2, enemies, exist)

        //Clear the screen
        context.clearRect(0, 0, cv.width, cv.height);

        //Draw sprites
        player1.draw();
        player2.draw();
        bombs.forEach(bomb => {bomb.draw();});
        hearts.draw();
        shields.draw();
        enemies.draw();
        boots.draw();

        //Proceed to next frame
        requestAnimationFrame(doFrame);
    }

    //Handle game start event
    $("#game-start").on("click", function () {

        //Hide start page
        $("#game-start").hide();

        //Player controls
        moving(player1, player2);
        stopping(player1, player2);

        //Randomize object positions
        bombs.forEach(bomb => bomb.setBomb("idleBomb"));
        hearts.randomize(gamearea);
        shields.randomize(gamearea);
        enemies.randomize(gamearea);
        boots.randomize(gamearea);

        //Start game
        requestAnimationFrame(doFrame);
    });
});