const Shield = function(ctx, x, y) {

    // This is the sprite sequences of the bomb
    const sequences =  {x: 16, y: 0, width: 16, height: 16, count: 1, timing: 200, loop: true}

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequences)
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("image/object_sprites.png");

    let birthTime = performance.now();

    const setShield = function() {
        sprite.setSequence(sequences);
        birthTime = performance.now();
    };
    const getAge = function(now) {
        return now - birthTime;
    };

    const randomize = function(area) {
        setShield();
        const {x, y} = area.randomPoint();
        sprite.setXY(x, y);
    };

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        setShield, setShield,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        draw: sprite.draw,
        update: sprite.update
    };
}