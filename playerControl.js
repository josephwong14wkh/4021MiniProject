const moving = (player1, player2) => {
    $(document).on("keydown", function (event) {
        /* Handle the key down */
        switch (event.keyCode) {
            case 72:player1.speedUp();break;
            case 65:player1.move(1);break;
            case 87:player1.move(2);break;
            case 68:player1.move(3);break;
            case 83:player1.move(4);break;

            case 222:player2.speedUp();break;
            case 37:player2.move(1);break;
            case 38:player2.move(2);break;
            case 39:player2.move(3);break;
            case 40:player2.move(4);break;
        }
    });
}    
    

const stopping = (player1, player2) => {
    $(document).on("keyup", function (event) {
        /* Handle the key up */
        switch (event.keyCode) {
            case 72:player1.changeSpeed(50);break;
            case 65:player1.stop(1);break;
            case 87:player1.stop(2);break;
            case 68:player1.stop(3);break;
            case 83:player1.stop(4);break;

            case 222:player2.changeSpeed(50);break;
            case 37:player2.stop(1);break;
            case 38:player2.stop(2);break;
            case 39:player2.stop(3);break;
            case 40:player2.stop(4);break;
        }

    });
}