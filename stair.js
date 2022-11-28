const Stair = function(ctx, x, y, color, isVertical) {
    // Hard code for extracting the images
    const temp1 = 5;
    const temp2 = 16
    const sequences = {
        "vertical" : { purple :  { x: 0+temp1+3, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false },
                       green : { x: 34+temp1+1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }, 
                       grey : { x: 68+temp1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }, 
                       orange : { x: 102+temp1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }, 
                       blue : { x: 136+temp1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }, 
                       red : { x: 170+temp1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }, 
                       yellow : { x: 204+temp1, y: 10, width: 33-temp2, height: 58-temp2, count: 1, timing: 1000, loop: false }
                      },

        "horizontal" : { purple :  { x: 10, y: 0+temp1+3, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false },
                         green : { x: 10, y: 34+temp1+1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }, 
                         grey : { x: 10, y: 68+temp1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }, 
                         orange : { x: 10, y: 102+temp1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }, 
                         blue : { x: 10, y: 136+temp1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }, 
                         red : { x: 10, y: 170+temp1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }, 
                         yellow : { x: 10, y: 204+temp1, width: 58-temp2, height: 33-temp2, count: 1, timing: 1000, loop: false }
                       }
    };

    const sprite = Sprite(ctx, x, y, true);

    // The sprite object is configured for the player sprite here.
    filename = "";
    isVerticalBoolean = false;
    if (isVertical == "vertical"){
        filename = "stair.png";
        isVerticalBoolean = true
    }else{
        filename = "stair2.png";
    }
    sprite.setSequence(sequences[isVertical][color])
          .setScale(40)
          .setShadowScale({ x: 0.75, y: 0.20 })
          .useSheet(filename)
          .setIsVertical(isVerticalBoolean);

    const setColor = function(color) {
        sprite.setSequence(sequences[color]);
    };

    return {
        getXY: sprite.getXY,
        setXY: sprite.setXY,
        getBoundingBox: sprite.getBoundingBox,
        draw: sprite.draw,
        update: sprite.update, 
        setColor: setColor
    };
}