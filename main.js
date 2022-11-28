$(document).ready(function () {
    const cv = $("canvas").get(0);
    const context = cv.getContext("2d");

    const sounds = {};

    const totalgametime = 180;
    let gamestarttime = 0;

    //boundary of gamearea, should be const, using let for temp
    const top = 180;
    const left = 50;
    const bottom = 700;
    const right = 1450;

    //Refer to lab4 BoundingBox.js
    const gamearea = BoundingBox(context, top, left, bottom, right)

    //Create pipe for background
    vertical_all_x = [  200, 200, 200, 200, 200, 200, 200, 200, 200,
                        400, 400, 400, 400, 400, 400, 400, 400, 400, 
                        600, 600, 600, 600, 600, 600, 600, 600, 600,
                        800, 800, 800, 800, 800, 800, 800, 800, 800,
                        1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
                        1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 
                        1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400, 1400];

    vertical_all_y = [  170, 170, 250, 330, 410, 490, 570, 650, 730, 
                        170, 170, 250, 330, 410, 490, 570, 650, 730,
                        170, 170, 250, 330, 410, 490, 570, 650, 730,
                        170, 170, 250, 330, 410, 490, 570, 650, 730,
                        170, 170, 250, 330, 410, 490, 570, 650, 730,
                        170, 170, 250, 330, 410, 490, 570, 650, 730,
                        170, 170, 250, 330, 410, 490, 570, 650, 730]

    horizontal_all_x = [90, 170, 250, 330, 410, 490, 570, 650, 730, 
                        810, 890, 970, 1050, 1130, 1210, 1290, 1370, 1450,  
                        90, 170, 250, 330, 410, 490, 570, 650, 730,
                        810, 890, 970, 1050, 1130, 1210, 1290, 1370, 1450, 
                        90, 170, 250, 330, 410, 490, 570, 650, 730, 
                        810, 890, 970, 1050, 1130, 1210, 1290, 1370, 1450]

    horizontal_all_y = [200, 200, 200, 200, 200, 200, 200, 200, 200, 
                        200, 200, 200, 200, 200, 200, 200, 200, 200,
                        400, 400, 400, 400, 400, 400, 400, 400, 400, 
                        400, 400, 400, 400, 400, 400, 400, 400, 400, 
                        600, 600, 600, 600, 600, 600, 600, 600, 600, 
                        600, 600, 600, 600, 600, 600, 600, 600, 600];

    vertical_total = 63;
    horizontal_total = 54;
    const vertical_all_stairs = All_Stairs(context, vertical_all_x, vertical_all_y, vertical_total, "vertical");
    const vertical_stairs = vertical_all_stairs.getStairs();
    const horizontal_all_stairs = All_Stairs(context, horizontal_all_x, horizontal_all_y, horizontal_total, "horizontal");
    const horizontal_stairs = horizontal_all_stairs.getStairs();

    //Create sprites
    //Create P1 & P2 from the two side of canvas
    const player1 = Player(context, left, bottom, gamearea);
    const player2 = Player(context, right, bottom, gamearea);

    //Create health bar
    // const healthBarWidth = 200;
    // const healthBarHeight = 30;
    // const x = cv.width / 2 - healthBarWidth / 2;
    // const y = cv.height / 2 - healthBarHeight / 2;

    // const healthBar = new HealthBar(70, 45, 100, 30, 100, "green");

    //Create items
    const maxbomb = 12, maxenemy = 6, maxheart = 3, maxspitem = 2;
    const bombs = [], enemies = [], hearts = [], shields = [], boots = [];
    
    const enemy_y_range = [200, 200, 400, 400, 600, 600];
    const bomb_y_range = [200, 200, 200, 400, 400, 400, 600, 600, 600, 730, 730, 730];
    const heart_y_range = [200, 400, 600, 730]
    const spitem_y_range = [200, 400, 600, 730];

    for (let i=0; i<maxbomb; i++) bombs.push(Bomb(context, Math.random() * (right - left) + left, -100))
    for (let i=0; i<maxenemy; i++) enemies.push(Enemy(context, Math.random() * (right - left) + left, enemy_y_range[i] - 30));
    for (let i=0; i<maxheart; i++) hearts.push(Heart(context, Math.random() * (right - left) + left, heart_y_range[Math.floor(Math.random() * 4)] - 30));
    for (let i=0; i<maxspitem; i++) shields.push(Shield(context, Math.random() * (right - left) + left, spitem_y_range[Math.floor(Math.random() * 4)] - 30));
    for (let i=0; i<maxspitem; i++) boots.push(Boot(context, Math.random() * (right - left) + left, spitem_y_range[Math.floor(Math.random() * 4)] - 30));

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
        
        //Update objects
        //Refer to lab4 sprite.js
        vertical_stairs.forEach(stair => {stair.update(now)});
        horizontal_stairs.forEach(stair => {stair.update(now)});
        
        player1.update(now);
        player2.update(now);

        bombs.forEach(bomb => {bomb.update(now);});
        hearts.forEach(heart => {heart.update(now);});
        shields.forEach(enemy => {enemy.update(now);});
        enemies.forEach(shield => {shield.update(now);});
        boots.forEach(boot => {boot.update(now);});

        //Generate health bar
        // healthBar.show(context);
        // csv.onclick = function() {
        //     health -= 10;
        //     healthBar.updateHealth(health);
        // };

        //Generate object
        // for (let i=0; i<maxbomb; i++) yarr.push(Math.random() * (bottom - top) + top);
        dropBomb(bombs, bomb_y_range, now, left, right);
        checkTouchBomb(player1, player2, bombs, bomb_y_range, left, right)
        enemyMove(enemies, left, right);
        checkTouchEnemy(player1, player2, enemies, enemy_y_range, left, right)
        chekcTouchSPItem(player1, player2, shields, boots, spitem_y_range, left, right)
        checkTouchHeart(player1, player2, hearts, heart_y_range, left, right)

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