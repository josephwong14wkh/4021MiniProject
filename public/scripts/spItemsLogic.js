const chekcTouchSPItem = (p1, p2, shields, boots, spitem_y_range, randomx, randomy, sounds) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    let p1shields = parseInt($("#p1shield").text());
    let p2shields = parseInt($("#p2shield").text());

    shields.forEach((shield, index) => {
        const shieldxy = shield.getXY();
        let shieldx = shieldxy.x, shieldy = shieldxy.y;

        if (p1box.isPointInBox(shieldx, shieldy)) {
            //Sound effect
            if (sounds.getshield.play()) sounds.getshield.currentTime = 0;
            else sounds.getshield.play();

            if (p1shields == 0) $("#p1shield").text(1);
            shield.setXY(-1000, -1000)
            setTimeout(() => {
                shield.setXY(randomx[index], spitem_y_range[randomy[index]])
            }, 10000);
        }

        if (p2box.isPointInBox(shieldx, shieldy)) {
            //Sound effect
            if (sounds.getshield.play()) sounds.getshield.currentTime = 0;
            else sounds.getshield.play();

            if (p2shields == 0) $("#p2shield").text(1)
            shield.setXY(-1000, -1000)
            setTimeout(() => {
                shield.setXY(randomx[index], spitem_y_range[randomy[index]])
            }, 10000);
        }
    });
    
    boots.forEach((boot, index) => {
        const bootxy = boot.getXY();
        let bootx = bootxy.x, booty = bootxy.y;

        if (p1box.isPointInBox(bootx, booty)) {
            //Sound effect
            if (sounds.getboot.play()) sounds.getboot.currentTime = 0;
            else sounds.getboot.play();
            
            if (p1.getSpeed() != p1.getSpeed(p1.speedUp())) {
                p1.speedUp();
                setTimeout(() => {
                    p1.slowDown();
                }, 3000);
            }

            boot.setXY(-1000, -1000)
            setTimeout(() => {
                boot.setXY(randomx[index], spitem_y_range[randomy[index]])
            }, 10000);
        }

        if (p2box.isPointInBox(bootx, booty)) {
            //Sound effect
            if (sounds.getboot.play()) sounds.getboot.currentTime = 0;
            else sounds.getboot.play();

            if (p2.getSpeed() != p2.getSpeed(p2.speedUp())) {
                p2.speedUp();
                setTimeout(() => {
                    p2.slowDown();
                }, 3000);
            }
            
            boot.setXY(-1000, -1000)
            setTimeout(() => {
                boot.setXY(randomx[index], spitem_y_range[randomy[index]])
            }, 10000);
        }
    });
    
}