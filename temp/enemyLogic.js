const enemyMove = (enemy, reverse, exist) => {
    let {x, y} = enemy.getXY();
    if (!reverse && exist) {
        enemy.setXY(x+0.5, 200)
        if (x > 780) reverse = true;
    }
    if (reverse && exist){
        enemy.setXY(x-0.5, 200)
        if (x < 60) reverse = false;
    }
}
    
const checkTouchEnemy = (p1, p2, enemy, exist) => {
    let p1box = p1.getBoundingBox();
    let p2box = p2.getBoundingBox();
    let { x, y } = enemy.getXY();

    if (p1box.isPointInBox(x, y)) {
        exist = false
        enemy.setXY(-1000, -1000)
        $("#p1shield").text(0)
        setTimeout(() => {
        enemy.setXY(Math.random() * (780 - 60) + 60, 200)
        exist = true
        }, 3000);
    }

    if (p2box.isPointInBox(x, y)) {
        exist = false
        enemy.setXY(-1000, -1000)
        $("#p1shield").text(0)
        setTimeout(() => {
        enemy.setXY(Math.random() * (780 - 60) + 60, 200)
        exist = true
        }, 3000);
    }
}
