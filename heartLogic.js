const updateHealth = (player, health) => {
    
}

const checkTouchHeart = (p1, p2, hearts, heart_y_range, cvright, cvleft) => {
    const p1box = p1.getBoundingBox();
    const p2box = p2.getBoundingBox();

    hearts.forEach((heart, index) => {
        let { x, y } = heart.getXY();
            
        if (p1box.isPointInBox(x, y)) {
            updateHealth(p1, 10);
            heart.setXY(-1000, -1000)
            setTimeout(() => {
                heart.setXY(Math.random() * (cvright - cvleft) + cvleft, heart_y_range[Math.floor(Math.random() * 4)] - 30)
            }, 5000);
        }

        if (p2box.isPointInBox(x, y)) {
            updateHealth(p2, 10);
            heart.setXY(-1000, -1000)
            setTimeout(() => {
                heart.setXY(Math.random() * (cvright - cvleft) + cvleft, heart_y_range[Math.floor(Math.random() * 4)] - 30)
            }, 5000);
        }
    })
}