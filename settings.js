let gear = document.getElementById("settings");
let setting_pane = document.getElementById("settings_pane");
let setting_pane_dismiss = document.getElementById("settings_dismiss");

gear.addEventListener('click', function(event) {
    setting_pane.classList.toggle('active');
});

setting_pane_dismiss.addEventListener('click', function(event) {
    setting_pane.classList.toggle('active');
});

function toggle_info_box() {
    let check_info_box = document.getElementById('check_info_box');

    if(check_info_box.checked == true) {
        document.getElementById('parvas').style.display = "block";
    }
    else {
        document.getElementById('parvas').style.display = "none";
    }
}

function toggle_date_jumper() {
    let check_date_jumper = document.getElementById('check_date_jumper');

    if(check_date_jumper.checked == true) {
        document.getElementById('brihat_calendar_date_jumper').style.display = "flex";
    }
    else {
        document.getElementById('brihat_calendar_date_jumper').style.display = "none";
    }
}

function toggle_tithis() {
    let check_tithis = document.getElementById('check_tithis');

    if(check_tithis.checked == true) {
        let lunar_infos = document.getElementsByClassName('for_lunar');
        for (var i = 0; i < lunar_infos.length; i++) {
            lunar_infos[i].style.display = "contents";
        }
    }
    else {
        let lunar_infos = document.getElementsByClassName('for_lunar');
        for (var i = 0; i < lunar_infos.length; i++) {
            lunar_infos[i].style.display = "none";
        }
    }
}

function toggle_converter_link() {
    let check_converter_link = document.getElementById('check_converter_link');

    if(check_converter_link.checked == true) {
        document.getElementById('date_converter_div').style.display = "block";
    }
    else {
        document.getElementById('date_converter_div').style.display = "none";
    }
}

function toggle_print_button() {
    let check_print_button = document.getElementById('check_print_button');

    if(check_print_button.checked == true) {
        document.getElementById('print').style.display = "block";
    }
    else {
        document.getElementById('print').style.display = "none";
    }
}

function toggle_invert_color() {
    let invert_color = document.getElementById('invert_color');

    if(invert_color.checked == true) {
        document.getElementsByTagName('html')[0].style.filter = "invert(125%)";
    }
    else {
        document.getElementsByTagName('html')[0].style.filter = "none";
    }
}

function trigger_all_event() {
    toggle_tithis();
    toggle_info_box();
    toggle_converter_link();
    toggle_print_button();
    toggle_date_jumper();
    toggle_invert_color();
}

var config = [true, false, false, false, true, false];


function save_current_config() {
    config[0] = document.getElementById('check_tithis').checked;
    config[1] = document.getElementById('check_info_box').checked;
    config[2] = document.getElementById('check_converter_link').checked;
    config[3] = document.getElementById('check_print_button').checked;
    config[4] = document.getElementById('check_date_jumper').checked;
    config[5] = document.getElementById('invert_color').checked;
    localStorage.setItem("config", JSON.stringify(config));
}

function load_config(def = false) {
    config = JSON.parse(localStorage.getItem("config"));
    if(config == null || def == true) {
        config = [true, false, false, false, true, false];
        save_current_config();
    }
    else {
        document.getElementById('check_tithis').checked = config[0];
        document.getElementById('check_info_box').checked = config[1];
        document.getElementById('check_converter_link').checked = config[2];
        document.getElementById('check_print_button').checked = config[3];
        document.getElementById('check_date_jumper').checked = config[4];
        document.getElementById('invert_color').checked = config[5];
        trigger_all_event();
    }
}

function reset_default_config() {
    load_config(true);
}

load_config();