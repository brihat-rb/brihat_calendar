document.onkeydown = trigger_key_press;

// taken from: https://stackoverflow.com/a/9310900
function trigger_key_press(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        // console.log("LEFT");
        previous();
    }
    else if (e.keyCode == '38') {
        // console.log("UP");
        up();
    }
    else if (e.keyCode == '39') {
        // console.log("RIGHT");
        next();
    }
    else if (e.keyCode == '40') {
        // console.log("DOWN");
        down();
    }
    else {
        // some other key
        console.log(e.keyCode);
    }
}