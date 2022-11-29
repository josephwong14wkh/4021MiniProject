const playerStatus = function(player, vertical_stairs, horizontal_stairs, vertical_total, horizontal_total, isFirstplayer) {
    const threshold = 10;
    player_box = player.getBoundingBox();
    const {x_center, y_center} = player_box.getCenter();
    let at_intersection = false;  // Check whether player is at the intersection
    let at_vertical = false;

    for (let j=0; j<vertical_total; j++){
        const vert_stair_box = vertical_stairs[j].getBoundingBox();
        for (let k=0; k<horizontal_total; k++){
            const hor_stair_box = horizontal_stairs[k].getBoundingBox();
            if (hor_stair_box.isPointInBox(x_center, (y_center+threshold)) && vert_stair_box.isPointInBox(x_center, y_center)){
                // Change the keydown event
                // Player can go left, right, up and down
                at_intersection = true;
                break;
            }
        }    
        if (at_intersection){
            break;
        }
    }

    if (!at_intersection){
        for (let j=0; j<vertical_total; j++){
            const vert_stair_box = vertical_stairs[j].getBoundingBox();
            if (vert_stair_box.isPointInBox(x_center, y_center)){
                // Change the keydown event
                // Player can only go up and down
                at_vertical = true;
                break;
            }
        }
    }

    if (isFirstplayer){
        const at_intersection1 = at_intersection;
        const at_vertical1 = at_vertical;
        return {at_intersection1, at_vertical1}
    }else{
        const at_intersection2 = at_intersection;
        const at_vertical2 = at_vertical;
        return {at_intersection2, at_vertical2}
    }
}

const playerControlChecking = function(player1, player2, at_intersection1, at_vertical1, at_intersection2, at_vertical2) {
    if (at_intersection1 && at_intersection2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 87:player1.move(2);break; // Up
                    case 68:player1.move(3);break; // Right
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 38: player2.move(2); break;  // Up
                    case 39: player2.move(3); break;  // Right
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else if (at_intersection1 && at_vertical2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 87:player1.move(2);break; // Up
                    case 68:player1.move(3);break; // Right
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 38: player2.move(2); break;  // Up
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else if (at_intersection1){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 87:player1.move(2);break; // Up
                    case 68:player1.move(3);break; // Right
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 39: player2.move(3); break;  // Right
                }
            });
    }else if (at_vertical1 && at_intersection2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 87:player1.move(2);break; // Up
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 38: player2.move(2); break;  // Up
                    case 39: player2.move(3); break;  // Right
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else if (at_vertical1 && at_vertical2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 87:player1.move(2);break; // Up
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 38: player2.move(2); break;  // Up
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else if (at_vertical1){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 87:player1.move(2);break; // Up
                    case 83:player1.move(4);break; // Down

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 39: player2.move(3); break;  // Right
                }
            });
    }else if (at_intersection2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 68:player1.move(3);break; // Right

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 38: player2.move(2); break;  // Up
                    case 39: player2.move(3); break;  // Right
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else if (at_vertical2){
        $(document).off("keydown");        
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 68:player1.move(3);break; // Right

                    case 16: player2.speedUp(); break; // Shift
                    case 38: player2.move(2); break;  // Up
                    case 40: player2.move(4); break;  // Down
                }
            });
    }else{
        $(document).off("keydown");
            $(document).on("keydown", function(event) {
                switch (event.keyCode) {
                    case 72:player1.speedUp();break;
                    case 65:player1.move(1);break;// Left
                    case 68:player1.move(3);break; // Right

                    case 16: player2.speedUp(); break; // Shift
                    case 37: player2.move(1); break;  // Left
                    case 39: player2.move(3); break;  // Right
                }
            })
    }
}