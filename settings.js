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
    console.info("Preferences (Show Event Info Box) set to: ", check_info_box.checked);
}

function toggle_date_jumper() {
    let check_date_jumper = document.getElementById('check_date_jumper');

    if(check_date_jumper.checked == true) {
        document.getElementById('brihat_calendar_date_jumper').style.display = "flex";
    }
    else {
        document.getElementById('brihat_calendar_date_jumper').style.display = "none";
    }
    console.info("Preferences (Show Date Jumper) set to: ", check_date_jumper.checked);
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
    console.info("Preferences (Show Tithis) set to: ", check_tithis.checked);
}

function toggle_converter_link() {
    let check_converter_link = document.getElementById('check_converter_link');

    if(check_converter_link.checked == true) {
        document.getElementById('date_converter_div').style.display = "block";
    }
    else {
        document.getElementById('date_converter_div').style.display = "none";
    }
    console.info("Preferences (Show Date Converter Link) set to: ", check_converter_link.checked);
}

function toggle_print_button() {
    let check_print_button = document.getElementById('check_print_button');

    if(check_print_button.checked == true) {
        document.getElementById('print').style.display = "block";
    }
    else {
        document.getElementById('print').style.display = "none";
    }
    console.info("Preferences (Show Print Button) set to: ", check_print_button.checked);
}

function toggle_invert_color() {
    let invert_color = document.getElementById('invert_color');

    if(invert_color.checked == true) {
        document.getElementsByTagName('html')[0].style.filter = "invert(125%)";
    }
    else {
        document.getElementsByTagName('html')[0].style.filter = "none";
    }
    console.info("Preferences (Invert Color) set to: ", invert_color.checked);
}

function trigger_all_event() {
    toggle_tithis();
    toggle_info_box();
    toggle_converter_link();
    toggle_print_button();
    toggle_date_jumper();
    toggle_invert_color();
}

var config = [];
const default_config = [true, false, false, false, true, false];


function save_current_config() {
    config[0] = document.getElementById('check_tithis').checked;
    config[1] = document.getElementById('check_info_box').checked;
    config[2] = document.getElementById('check_converter_link').checked;
    config[3] = document.getElementById('check_print_button').checked;
    config[4] = document.getElementById('check_date_jumper').checked;
    config[5] = document.getElementById('invert_color').checked;
    localStorage.setItem("config", JSON.stringify(config));
    console.info("Current Preferences Saved Successfully.");
    swal("Success!", "Current Config Saved", "success");
}

function load_config(def = false) {
    config = JSON.parse(localStorage.getItem("config"));
    if(config == null || def == true) {
        localStorage.setItem("config", JSON.stringify(default_config));
        console.info("No User Preferences Found: Default Loaded and Saved.");
        load_config();
    }
    else {
        document.getElementById('check_tithis').checked = config[0];
        document.getElementById('check_info_box').checked = config[1];
        document.getElementById('check_converter_link').checked = config[2];
        document.getElementById('check_print_button').checked = config[3];
        document.getElementById('check_date_jumper').checked = config[4];
        document.getElementById('invert_color').checked = config[5];
        trigger_all_event();
        console.info("User Preferences Loaded Successfully.");
    }
}

function reset_default_config() {
    swal({
        title: "Are you sure?",
        text: "Restore Default Config?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            load_config(true);
            console.info("Default User Preferences Loaded Successfully.");
            swal("Success!", "Default Config Restored", "success", {icon: "success"});
        }
        else {
          swal("Aborted");
          console.info("Preferences Reset Operation Cancelled");
        }
      });
}

load_config();

document.getElementById("setting_pane_author").innerHTML = "<i class='fa fa-solid fa-copyright'></i><br />";
document.getElementById("setting_pane_author").innerHTML += "सौ. ने. सं. " + arabic_number_to_nepali(ns_today_year) + " | " + AD_TODAY_YEAR + " AD | वि. सं. " + arabic_number_to_nepali(bs_today_year);
document.getElementById("setting_pane_author").innerHTML += "<br />Brihat Ratna Bajracharya";