const dropBomb = (bombs, yarr, now, cvleft, cvright) => {
    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();

        if (y <= parseInt(yarr[index])) {
            bomb.setBomb("idleBomb");
            bomb.setXY(x, y+1)
        }

        if (y == parseInt(yarr[index])) {
            bomb.setBomb("tickingBomb");
        }

        if (bomb.getAge(now) > 3000) {
            bomb.setBomb("explode");
            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50)
            }, 500);
        }
    });
}

const checkTouchBomb = (p1, p2, bombs, yarr, cvright, cvleft) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();
    const initspeed = 50;
    let slowdown = 15

    bombs.forEach((bomb, index) => {
        let { x, y } = bomb.getXY();
            
        if (p1box.isPointInBox(x, y) && y-1 == parseInt(yarr[index])) {
            bomb.setBomb("explode");

            if ($("#p1shield").text() == "0") p1.changeSpeed(slowdown);
            else $("#p1shield").text(0)

            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50)
            }, 100);

            setTimeout(() => {
                p1.changeSpeed(initspeed);
            }, 3000);

            // updateHealth(p1);
        }

        if (p2box.isPointInBox(x, y) && y-1 == parseInt(yarr[index])) {
            bomb.setBomb("explode");

            if ($("#p2shield").text() == "0") p2.changeSpeed(slowdown);
            else $("#p2shield").text(0)

            setTimeout(() => {
                bomb.setXY(Math.random() * (cvright - cvleft) + cvleft, -50)
            }, 100);

            setTimeout(() => {
                p2.changeSpeed(initspeed);
            }, 3000);
            
            // updateHealth(p2);
        }
    })
}