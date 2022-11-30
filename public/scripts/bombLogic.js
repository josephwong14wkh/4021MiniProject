const dropBomb = (bombs, bomb_y_range, now, cvleft, cvright) => {
    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();

        //Dropping bombs by moving y-axis
        if (y <= parseInt(bomb_y_range[index])) {
            bomb.setBomb("tickingBomb");
            bomb.setXY(x, y+1)
        }

        //Despawn bombs after 3s and reassign new position for respawn
        if (bomb.getAge(now) > 3000) {
            bomb.setBomb("explode");
            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50)
            }, 500);
        }
    });
}

const checkTouchBomb = (p1, p2, bombs, cvright, cvleft, sounds) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();
    const initspeed = 55;
    let slowdown = 15

    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();
        let p1shields = parseInt($("#p1shield").text());
        let p2shields = parseInt($("#p2shield").text());
            
        if (p1box.isPointInBox(x, y)) {
            console.log("hit!");
            bomb.setBomb("explode");

            //Sound effect
            if (sounds.explosion.play()) sounds.explosion.currentTime = 0;
            else sounds.explosion.play();

            //Despawn bombs after hit player
            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50);
            }, 5);

            //Check if player has shield or not, cause damage, slow speed
            if (p1shields == 1) {
                p1.changeSpeed(slowdown);
                $("#p1shield").text(0);
                //Change back to initial speed
                setTimeout(() => {
                    p1.changeSpeed(initspeed);
                }, 5000);
            }
            else if (p1shields == 0) {
                p1.changeSpeed(slowdown);
                updateHealth("p1", -10);
                $("#p1shield").text(0);
                //Change back to initial speed
                setTimeout(() => {
                    p1.changeSpeed(initspeed);
                }, 5000);
            }
        }

        if (p2box.isPointInBox(x, y)) {
            bomb.setBomb("explode");

            //Sound effect
            if (sounds.explosion.play()) sounds.explosion.currentTime = 0;
            else sounds.explosion.play();

            //Despawn bombs after hit player
            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50)
            }, 5);
            
            //Check if player has shield or not, cause damage, slow speed
            if (p2shields == 1) {
                p2.changeSpeed(slowdown);
                $("#p2shield").text(0);
                //Change back to initial speed
                setTimeout(() => {
                    p2.changeSpeed(initspeed);
                }, 5000);
            }
            else if (p2shields == 0) {
                p2.changeSpeed(slowdown);
                updateHealth("p2", -10);
                $("#p2shield").text(0);
                //Change back to initial speed
                setTimeout(() => {
                    p2.changeSpeed(initspeed);
                }, 5000);
            }
        }
    })
}