$(document).ready(function () {
    const cv = $("canvas").get(0);
    const context = cv.getContext("2d");

    const sounds = {
        // background: new Audio("soundtrack/background.mp3"),
        // gameover: new Audio("soundtrack/gameover.mp3"),
        explosion: new Audio("soundtrack/explosion.mp3"),
        enemyhit: new Audio("soundtrack/enemyhit.mp3"),
        getshield: new Audio("soundtrack/getshield.mp3"),
        getboot: new Audio("soundtrack/getboot.mp3"),
        getheart: new Audio("soundtrack/getheart.mp3"),
    
    };

    const totalgametime = 180;
    let gamestarttime = 0;

    //boundary of gamearea, should be const, using let for temp
    const top = 30;   //180, 50, 700, 1450
    const left = 50;
    const bottom = 700;
    const right = 1450;

    //Refer to lab4 BoundingBox.js
    const gamearea = BoundingBox(context, top, left, bottom, right)

    //Create pipe for background
    const vertical_all_x = [200, 400, 550, 750, 950, 1100, 1300];
    const vertical_all_y = [365, 365, 270, 100, 270, 365, 365];

    const horizontal_all_x = [750, 750, 750, 750, 750];
    const horizontal_all_y = [150, 300, 400, 550, 700];

    const vertical_total = 7; 
    const horizontal_total = 5; 
    const vertical_all_stairs = All_Stairs(context, vertical_all_x, vertical_all_y, vertical_total, "vertical");
    const vertical_stairs = vertical_all_stairs.getStairs();
    const horizontal_all_stairs = All_Stairs(context, horizontal_all_x, horizontal_all_y, horizontal_total, "horizontal");
    const horizontal_stairs = horizontal_all_stairs.getStairs();

    //Create sprites
    //Create P1 & P2 from the two side of canvas
    const player1 = Player(context, left, bottom, gamearea);
    const player2 = Player(context, right, bottom, gamearea);

    //Create items
    const maxbomb = 20, maxenemy = 6, maxheart = 3, maxspitem = 2;
    const bombs = [], enemies = [], hearts = [], shields = [], boots = [];
    
    const enemy_y_range = [200, 200, 400, 400, 600, 600];
    const bomb_y_range = [200, 200, 200, 200, 200, 400, 400, 400, 400, 400, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700];
    const heart_y_range = [200, 400, 600, 700];
    const spitem_y_range = [200, 400, 600, 700];

    for (let i=0; i<maxbomb; i++) bombs.push(Bomb(context, Math.random() * (right - left) + left, Math.floor(Math.random() * -1000) - 100))
    for (let i=0; i<maxenemy; i++) enemies.push(Enemy(context, Math.random() * (right - left) + left, enemy_y_range[i]));
    for (let i=0; i<maxheart; i++) hearts.push(Heart(context, Math.random() * (right - left) + left, heart_y_range[Math.floor(Math.random() * 4)]));
    for (let i=0; i<maxspitem; i++) shields.push(Shield(context, Math.random() * (right - left) + left, spitem_y_range[Math.floor(Math.random() * 4)]));
    for (let i=0; i<maxspitem; i++) boots.push(Boot(context, Math.random() * (right - left) + left, spitem_y_range[Math.floor(Math.random() * 4)]));

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
            // if ()
            return 0;
        }
        if ($("#p1health").val() == 0 || player2.getBoundingBox().isPointInBox(800, 80)) {
            $('#game-over').show();
            $("#winner").text("P2");
            return 0;
        }
        if ($("#p2health").val() == 0 || player1.getBoundingBox().isPointInBox(800, 80)){
            $('#game-over').show();
            $("#winner").text("P1");
            return 0;
        }

        //Update objects
        //Refer to lab4 sprite.js
        vertical_stairs.forEach(stair => {stair.update(now)});
        horizontal_stairs.forEach(stair => {stair.update(now)});
        
        player1.update(now);
        player2.update(now);

        const {at_intersection1, at_vertical1} = playerStatus(player1, vertical_stairs, horizontal_stairs, vertical_total, horizontal_total, isFirstplayer=true);
        const {at_intersection2, at_vertical2} = playerStatus(player2, vertical_stairs, horizontal_stairs, vertical_total, horizontal_total, isFirstplayer=false);
        playerControlChecking(player1, player2, at_intersection1, at_vertical1, at_intersection2, at_vertical2);
        
        bombs.forEach(bomb => {bomb.update(now);});
        hearts.forEach(heart => {heart.update(now);});
        shields.forEach(enemy => {enemy.update(now);});
        enemies.forEach(shield => {shield.update(now);});
        boots.forEach(boot => {boot.update(now);});

        //Generate object
        dropBomb(bombs, bomb_y_range, now, left, right);
        checkTouchBomb(player1, player2, bombs, left, right, sounds)
        enemyMove(enemies, left, right);
        checkTouchEnemy(player1, player2, enemies, enemy_y_range, left, right, sounds)
        chekcTouchSPItem(player1, player2, shields, boots, spitem_y_range, left, right, sounds)
        checkTouchHeart(player1, player2, hearts, heart_y_range, left, right, sounds)

        //Clear the screen
        context.clearRect(0, 0, cv.width, cv.height);

        //Draw sprites
        vertical_stairs.forEach(stair => {stair.draw(now)});
        horizontal_stairs.forEach(stair => {stair.draw(now)});

        player1.draw();
        player2.draw();

        bombs.forEach(bomb => {bomb.draw();});
        hearts.forEach(heart => {heart.draw();});
        shields.forEach(enemy => {enemy.draw();});
        enemies.forEach(shield => {shield.draw();});
        boots.forEach(boot => {boot.draw();});

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
        hearts.forEach(heart => heart.setHeart());
        enemies.forEach(enemy => enemy.setEnemy());
        shields.forEach(shield => shield.setShield());
        boots.forEach(boot => boot.setBoot());

        //Start game
        requestAnimationFrame(doFrame);
    });
});