const Enemy = function(ctx, x, y) {

    // This is the sprite sequences of the bomb
    const sequences = { x: 160, y:  0, width: 16, height: 16, count: 2, timing: 200, loop: true };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences)
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("image/object_sprites.png");

    let birthTime = performance.now();

    const setEnemy = function() {
        sprite.setSequence(sequences);
        birthTime = performance.now();
    };
    
    const getAge = function(now) {
        return now - birthTime;
    };

    const randomize = function(area) {
        setEnemy();
        /* Randomize the position */
        const {x, y} = area.randomPoint();
        sprite.setXY(x, y);
    };

    let reverse = false;
    let exist = true;

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        setEnemy: setEnemy,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        draw: sprite.draw,
        update: sprite.update,
        reverse: reverse,
        exist: exist
    };
}