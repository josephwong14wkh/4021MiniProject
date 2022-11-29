const updateHealth = (player, health) => {
    if (player == "p1")
        document.getElementById("p1health").value += health

    if (player == "p2") {
        document.getElementById("p2health").value += health
    }
}

const checkTouchHeart = (p1, p2, hearts, heart_y_range, randomx, randomy, sounds) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    hearts.forEach((heart, index) => {
        let { x, y } = heart.getXY();
            
        if (p1box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.getheart.play()) sounds.getheart.currentTime = 0;
            else sounds.getheart.play();

            updateHealth(p1, 10);
            heart.setXY(-1000, -1000)
            updateHealth("p1", 10);
            setTimeout(() => {
                heart.setXY(randomx[index], heart_y_range[randomy[index]])
            }, 5000);
        }

        if (p2box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.getheart.play()) sounds.getheart.currentTime = 0;
            else sounds.getheart.play();
            
            updateHealth(p2, 10);
            heart.setXY(-1000, -1000)
            updateHealth("p2", 10);
            setTimeout(() => {
                heart.setXY(randomx[index], heart_y_range[randomy[index]])
            }, 5000);
        }
    })
}