const All_Stairs = function(ctx, all_x, all_y, total, isVertical) {

    let stairs = [];

    for (let i=0; i<total; i++){

        x = all_x[i];
        y = all_y[i];
        const colors = ["purple", "green", "grey", "orange", "blue", "red", "yellow"];
        const color = colors[Math.floor(Math.random() * 7)];
        element = Stair(ctx, x, y, color, isVertical);
        stairs.push(element);

    }

    const getStairs = function() {
        return stairs;
    }

    return {
        getStairs: getStairs
    };
}