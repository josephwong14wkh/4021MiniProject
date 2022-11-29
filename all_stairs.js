const All_Stairs = function(ctx, all_x, all_y, total, isVertical) {

    let stairs = [];

    for (let i=0; i<total; i++){

        x = all_x[i];
        y = all_y[i];
        const colors = ["green", "grey", "orange", "blue", "red", "yellow"];
        const color = colors[Math.floor(Math.random() * 6)];
        element = Stair(ctx, x, y, color, isVertical);
        if (isVertical == "vertical"){
            if (i == 2){
                element.setScale(13);
            }else if (i == 3){
                element.setScale(3);
                element.setColor("purple");
            }else if (i == 4){
                element.setScale(13);
            }
        }
        stairs.push(element);

    }

    const getStairs = function() {
        return stairs;
    }

    return {
        getStairs: getStairs
    };
}