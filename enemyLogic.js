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
    
const checkTouchEnemy = (p1, p2, enemies, enemy_y_range, cvleft, cvright) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();
    const initspeed = 50;
    let slowdown = 15
    
    enemies.forEach((enemy, index) => {
        let { x, y } = enemy.getXY();

        if (p1box.isPointInBox(x, y)) {
            enemy.exist = false
            enemy.setXY(-1000, -1000)

            if ($("#p1shield").text() == "0") p1.changeSpeed(slowdown);
            else $("#p1shield").text(0)

            setTimeout(() => {
                enemy.setXY(Math.random() * (cvright - cvleft) + cvleft, enemy_y_range[index] - 30)
                enemy.exist = true
            }, 3000);

            setTimeout(() => {
                p1.changeSpeed(initspeed);
            }, 3000);

            //updateHealth(p1);
        }

        if (p2box.isPointInBox(x, y)) {
            exist = false
            enemy.setXY(-1000, -1000)

            if ($("#p2shield").text() == "0") p2.changeSpeed(slowdown);
            else $("#p2shield").text(0)

            setTimeout(() => {
                enemy.setXY(Math.random() * (cvright - cvleft) + cvleft, enemy_y_range[index] - 30)
                enemy.exist = true
            }, 3000);

            setTimeout(() => {
                p2.changeSpeed(initspeed);
            }, 3000);

            //updateHealth(p2);
        }
    });
}
