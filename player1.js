// This function defines the Player module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the player
// - `y` - The initial y position of the player
// - `gameArea` - The bounding box of the game area
const Player1 = function(ctx, x, y, gameArea) {

    // This is the sprite sequences of the player facing different directions.
    // It contains the idling sprite sequences `idleLeft`, `idleUp`, `idleRight` and `idleDown`,
    // and the moving sprite sequences `moveLeft`, `moveUp`, `moveRight` and `moveDown`.
    const sequences = {
        /* Idling sprite sequences for facing different directions */
        // This is sequence for mario. (mario.png: 408x352)
        idleLeft:  { x: 0, y: 44, width: 34, height: 44, count: 9, timing: 2000, loop: false },
        idleUp:    { x: 0, y: 132, width: 34, height: 44, count: 9, timing: 2000, loop: false },
        idleRight: { x: 0, y: 88, width: 34, height: 44, count: 9, timing: 2000, loop: false },
        idleDown:  { x: 0, y:  0, width: 34, height: 44, count: 9, timing: 2000, loop: false },

        moveLeft:  { x: 0, y: 220, width: 34, height: 44, count: 12, timing: 50, loop: true },
        moveUp:    { x: 0, y: 308, width: 34, height: 44, count: 12, timing: 50, loop: true },
        moveRight: { x: 0, y: 264, width: 34, height: 44, count: 12, timing: 50, loop: true },
        moveDown:  { x: 0, y: 176, width: 34, height: 44, count: 12, timing: 50, loop: true }

        // This is sequence for luigi. (luigi.png: 360x320)
        /*idleLeft:  { x: 0, y: 40, width: 30, height: 40, count: 9, timing: 2000, loop: false },
        idleUp:    { x: 0, y: 120, width: 30, height: 40, count: 9, timing: 2000, loop: false },
        idleRight: { x: 0, y: 80, width: 30, height: 40, count: 9, timing: 2000, loop: false },
        idleDown:  { x: 0, y:  0, width: 30, height: 40, count: 9, timing: 2000, loop: false },

        moveLeft:  { x: 0, y: 200, width: 30, height: 40, count: 9, timing: 50, loop: true },
        moveUp:    { x: 0, y: 280, width: 30, height: 40, count: 9, timing: 50, loop: true },
        moveRight: { x: 0, y: 240, width: 30, height: 40, count: 9, timing: 50, loop: true },
        moveDown:  { x: 0, y: 160, width: 30, height: 40, count: 9, timing: 50, loop: true }*/
    };

    // This is the sprite object of the player created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the player sprite here.
    sprite.setSequence(sequences.idleDown)
          .setScale(1.6)
          .setShadowScale({ x: 0.75, y: 0.20 })
          .useSheet("image/mario.png");

    // This is the moving direction, which can be a number from 0 to 4:
    // - `0` - not moving
    // - `1` - moving to the left
    // - `2` - moving up
    // - `3` - moving to the right
    // - `4` - moving down
    let direction = 0;
    // This is the moving speed (pixels per second) of the player
    let speed = 55;

    // This function sets the player's moving direction.
    // - `dir` - the moving direction (1: Left, 2: Up, 3: Right, 4: Down)
    const move = function(dir) {
        if (dir >= 1 && dir <= 4 && dir != direction) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.moveLeft); break;
                case 2: sprite.setSequence(sequences.moveUp); break;
                case 3: sprite.setSequence(sequences.moveRight); break;
                case 4: sprite.setSequence(sequences.moveDown); break;
            }
            direction = dir;
        }
    };

    // This function stops the player from moving.
    // - `dir` - the moving direction when the player is stopped (1: Left, 2: Up, 3: Right, 4: Down)
    const stop = function(dir) {
        if (direction == dir) {
            switch (dir) {
                case 1: sprite.setSequence(sequences.idleLeft); break;
                case 2: sprite.setSequence(sequences.idleUp); break;
                case 3: sprite.setSequence(sequences.idleRight); break;
                case 4: sprite.setSequence(sequences.idleDown); break;
            }
            direction = 0;
        }
    };

    // This function speeds up the player.
    const speedUp = function() {
        speed = 110;
    };

    // This function further speed up the player.
    const furtherSpeedUp = function() {
        speed = 400;
    }
    // This function slows down the player.
    const slowDown = function() {
        speed = 55;
    };
    // Change speed according to different event
    const changeSpeed = function(speeds) {
        speed = speeds;
    }
    const getSpeed = function() {
        return speed;
    }

    // This function updates the player depending on his movement.
    // - `time` - The timestamp when this function is called
    const update = function(time) {
        /* Update the player if the player is moving */
        if (direction != 0) {
            let { x, y } = sprite.getXY();
    
            /* Move the player */
            switch (direction) {
                case 1: x -= speed / 60; break;
                case 2: y -= speed / 60; break;
                case 3: x += speed / 60; break;
                case 4: y += speed / 60; break;
            }

            /* Set the new position if it is within the game area */
            if (gameArea.isPointInBox(x, y))
                sprite.setXY(x, y);
        }

        /* Update the sprite object */
        sprite.update(time);
    };

    // The methods are returned as an object here.
    return {
        move: move,
        stop: stop,
        speedUp: speedUp,
        furtherSpeedUp: furtherSpeedUp,
        slowDown: slowDown,
        changeSpeed: changeSpeed,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: update,
        getSpeed: getSpeed
    };
};
