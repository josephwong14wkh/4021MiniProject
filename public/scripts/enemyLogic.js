const enemyMove = (enemies, cvleft, cvright) => {
    enemies.forEach(enemy => {
        let {x, y} = enemy.getXY();
        if (!enemy.reverse && enemy.exist) {
            enemy.setXY(x+1, y)
            if (x > cvright) enemy.reverse = true;
        }
        if (enemy.reverse && enemy.exist){
            enemy.setXY(x-1, y)
            if (x < cvleft) enemy.reverse = false;
        }
    });
}
    
const checkTouchEnemy = (p1, p2, enemies, enemy_y_range, cvleft, cvright, sounds) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    let p1shields = parseInt($("#p1shield").text());
    let p2shields = parseInt($("#p2shield").text());

    const initspeed = 55;
    let slowdown = 15
    
    enemies.forEach((enemy, index) => {
        let { x, y } = enemy.getXY();

        if (p1box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.enemyhit.play()) sounds.enemyhit.currentTime = 0;
            else sounds.enemyhit.play();

            enemy.exist = false
            enemy.setXY(-1000, -1000)

            if (p1shields == 1) {
                p1.changeSpeed(slowdown);
                $("#p1shield").text(0);
                setTimeout(() => {
                    p1.changeSpeed(initspeed);
                }, 5000);
            }
            else if (p1shields == 0) {
                p1.changeSpeed(slowdown);
                updateHealth("p1", -25);
                $("#p1shield").text(0);
                setTimeout(() => {
                    p1.changeSpeed(initspeed);
                }, 5000);
            }

            setTimeout(() => {
                enemy.setXY(Math.random() * (cvright - cvleft) + cvleft, enemy_y_range[index])
                enemy.exist = true
            }, 3000);
        }

        if (p2box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.enemyhit.play()) sounds.enemyhit.currentTime = 0;
            else sounds.enemyhit.play();

            exist = false
            enemy.setXY(-1000, -1000)

            if (p2shields == 1) {
                p2.changeSpeed(slowdown);
                $("#p2shield").text(0);
                setTimeout(() => {
                    p2.changeSpeed(initspeed);
                }, 5000);
            }
            else if (p2shields == 0) {
                p2.changeSpeed(slowdown);
                updateHealth("p2", -25);
                $("#p2shield").text(0);
                setTimeout(() => {
                    p2.changeSpeed(initspeed);
                }, 5000);
            }

            setTimeout(() => {
                enemy.setXY(Math.random() * (cvright - cvleft) + cvleft, enemy_y_range[index])
                enemy.exist = true
            }, 3000);
        }
    });
}
