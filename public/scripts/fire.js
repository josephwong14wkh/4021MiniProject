// This function defines the Fire module.
// - `ctx` - A canvas context for drawing
// - `x` - The initial x position of the fire
// - `y` - The initial y position of the fire

const Fire = function(ctx, x, y) {

    // This is the sprite sequences of the fire
    const sequence = {
        x: 0, y: 160, width: 16, height: 16, count: 8, timing: 200, loop: true 
    }

    const sprite = Sprite(ctx, x, y);

    sprite.setSequence(sequence)
          .setScale(2)
          .setShadowScale({ x: 0.75, y: 0.20 })
          .useSheet("../media/object_sprites.png");

    sprite.setXY(x, y);

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        draw: sprite.draw,
        update: sprite.update
    };
}