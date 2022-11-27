const dropBomb = (bombs, yarr, now) => {
    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();

        if (y <= parseInt(yarr[index])) {
            bomb.setBomb("idleBomb");
            bomb.setXY(x, y + 0.5)
        }

        if (y == parseInt(yarr[index])) {
            bomb.setBomb("tickingBomb");
        }

        if (bomb.getAge(now) > 3000) {
            bomb.setBomb("explode");
            setTimeout(() => {
                bomb.setXY(Math.random() * (800 - 60) + 60, -50)
            }, 500);
        }
    });
}

const checkTouchBomb = (p1, p2, bombs, yarr) => {
    let p1box = p1.getBoundingBox();
    let p2box = p2.getBoundingBox();

    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();
        
        if (p1box.isPointInBox(x, y) && parseInt(y) == parseInt(yarr[index])) {
            bomb.setBomb("explode");
            setTimeout(() => {
                bomb.setXY(Math.random() * (800 - 60) + 60, -50)
            }, 100);
            // updateHealth(p1);
        }

        if (p2box.isPointInBox(x, y) && parseInt(y) == parseInt(yarr[index])) {
            bomb.setBomb("explode");
            setTimeout(() => {
                bomb.setXY(Math.random() * (800 - 60) + 60, -50)
            }, 100);
            // updateHealth(p2);
        }
    })
}