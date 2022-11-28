const chekcTouchSPItem = (p1, p2, shields, boots, cvtop, cvleft, cvbottom, cvright) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    shields.forEach(shield => {
        const shieldxy = shield.getXY();
        let shieldx = shieldxy.x, shieldy = shieldxy.y;

        if (p1box.isPointInBox(shieldx, shieldy)) {
            $("#p1shield").text(1);
            shield.setXY(-1000, -1000)
            setTimeout(() => {
                shield.setXY(Math.random() * (cvright - cvleft) + cvleft, Math.random() * (cvbottom - cvtop) + cvtop)
            }, 10000);
        }

        if (p2box.isPointInBox(shieldx, shieldy)) {
            $("#p2shield").text(1)
            shield.setXY(-1000, -1000)
            setTimeout(() => {
                shield.setXY(Math.random() * (cvright - cvleft) + cvleft, Math.random() * (cvbottom - cvtop) + cvtop)
            }, 10000);
        }
    });
    
    boots.forEach(boot => {
        const bootxy = boot.getXY();
        let bootx = bootxy.x, booty = bootxy.y;

        if (p1box.isPointInBox(bootx, booty)) {
            p1.speedUp();
            setTimeout(() => {
                p1.slowDown();
            }, 3000);
            boot.setXY(-1000, -1000)
            setTimeout(() => {
                boot.setXY(Math.random() * (cvright - cvleft) + cvleft, Math.random() * (cvbottom - cvtop) + cvtop)
            }, 10000);
        }

        if (p2box.isPointInBox(bootx, booty)) {
            p2.speedUp();
            setTimeout(() => {
                p2.slowDown();
            }, 3000);
            boot.setXY(-1000, -1000)
            setTimeout(() => {
                boot.setXY(Math.random() * (cvright - cvleft) + cvleft, Math.random() * (cvbottom - cvtop) + cvtop)
            }, 10000);
        }
    });
    
}