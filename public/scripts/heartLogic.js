const updateHealth = (player, health) => {
    if (player == "p1")
        $("#p1health").value += health
        $("#p1health").value;
        console.log($("#p1health").value);
    if (player == "p2") {
        $("#p2health").value += health
    }
}

const checkTouchHeart = (p1, p2, hearts, heart_y_range, cvright, cvleft, sounds) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    hearts.forEach((heart, index) => {
        let { x, y } = heart.getXY();
            
        if (p1box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.getheart.play()) sounds.getheart.currentTime = 0;
            else sounds.getheart.play();

            updateHealth("p1", 10);
            heart.setXY(-1000, -1000)
            updateHealth("p1", 10);
            setTimeout(() => {
                heart.setXY(Math.random() * (cvright - cvleft) + cvleft, heart_y_range[Math.floor(Math.random() * 4)])
            }, 5000);
        }

        if (p2box.isPointInBox(x, y)) {
            //Sound effect
            if (sounds.getheart.play()) sounds.getheart.currentTime = 0;
            else sounds.getheart.play();
            
            updateHealth("p2", 10);
            heart.setXY(-1000, -1000)
            updateHealth("p2", 10);
            setTimeout(() => {
                heart.setXY(Math.random() * (cvright - cvleft) + cvleft, heart_y_range[Math.floor(Math.random() * 4)])
            }, 5000);
        }
    })
}