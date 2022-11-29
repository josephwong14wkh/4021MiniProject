const Bell = function(ctx, x, y) {

    const sequence = {  x: 192, y:  64, width: 16, height: 16, count: 4, timing: 200, loop: true };

    // This is the sprite object of the gem created from the Sprite module.
    const sprite = Sprite(ctx, x, y);

    // The sprite object is configured for the gem sprite here.
    sprite.setSequence(sequence)
          .setScale(3.5)
          .setShadowScale({ x: 0.75, y: 0.2 })
          .useSheet("../media/object_sprites.png");
          //.useSheet("image/object_sprites.png");

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update
    };
};