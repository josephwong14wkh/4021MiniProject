const Bomb = function(ctx, x, y, bomb) {

    const sequences = { 
        tickingBomb: {x: 64, y:  112, width: 16, height: 16, count: 9, timing: 350, loop: true},
        idleBomb: {x: 128, y: 48, width: 16, height: 16, count: 1, timing: 200, loop: true},
        explode: {x: 128, y:  160, width: 16, height: 16, count: 4, timing: 100, loop: false}
    };

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequences[bomb])
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("image/object_sprites.png");

    let birthTime = performance.now();

    const setBomb = function(bomb) {
        sprite.setSequence(sequences[bomb]);
        birthTime = performance.now();
    };
    const getAge = function(now) {
        return now - birthTime;
    };

    const randomize = function(area) {
        const bombs = "idleBomb";
        setBomb(bombs)
        const {x, y} = area.randomPoint();
        sprite.setXY(x, y);
    };

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        setBomb: setBomb,
        getAge: getAge,
        getBoundingBox: sprite.getBoundingBox,
        randomize: randomize,
        draw: sprite.draw,
        update: sprite.update
    };
}