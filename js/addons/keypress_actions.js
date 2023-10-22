document.onkeydown = trigger_key_press;

// taken from: https://stackoverflow.com/a/9310900
function trigger_key_press(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        // console.log("LEFT");
        e.preventDefault();
        previous();
    }
    else if (e.keyCode == '38') {
        // console.log("UP");
        e.preventDefault();
        up();
    }
    else if (e.keyCode == '39') {
        // console.log("RIGHT");
        e.preventDefault();
        next();
    }
    else if (e.keyCode == '40') {
        // console.log("DOWN");
        e.preventDefault();
        down();
    }
    else if (e.keyCode == '13') {
        // console.log("ENTER");
        e.preventDefault();
        go_to_today();
    }
    else {
        // some other key
        console.log(e.keyCode);
    }
}
