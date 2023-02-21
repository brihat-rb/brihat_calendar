/**
 * Settings (Preferences) Code (part of Brihat Calendar)
 * Copyright (C) 2022  Brihat Ratna Bajracharya
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
**/

let gear = document.getElementById("settings");
let setting_pane = document.getElementById("settings_pane");
let setting_pane_dismiss = document.getElementById("settings_dismiss");

gear.addEventListener('click', function(event) {
    setting_pane.classList.toggle('active');
});

setting_pane_dismiss.addEventListener('click', function(event) {
    setting_pane.classList.toggle('active');
});

function toggle_all() {
    let check_all = document.getElementById('check_all').checked;

    if (check_all) {
        document.getElementById('check_tithis').checked = true;
        document.getElementById('check_info_box').checked = true;
        document.getElementById('check_muhoortta_box').checked = true;
        document.getElementById('check_converter_link').checked = true;
        document.getElementById('check_print_button').checked = true;
        document.getElementById('check_date_jumper').checked = true;
    }
    else {
        document.getElementById('check_tithis').checked = false;
        document.getElementById('check_info_box').checked = false;
        document.getElementById('check_converter_link').checked = false;
        document.getElementById('check_print_button').checked = false;
        document.getElementById('check_date_jumper').checked = false;
    }
    trigger_all_event();
}

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

function toggle_muhoortta_box() {
    let check_muhoortta_box = document.getElementById('check_muhoortta_box');

    if(check_muhoortta_box.checked == true) {
        document.getElementById('muhoortta_box').style.display = "flex";
    }
    else {
        document.getElementById('muhoortta_box').style.display = "none";
    }
    console.info("Preferences (Show Muhoortta Box) set to: ", check_muhoortta_box.checked);
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

function toggle_pakshya_lang(){
    let lunar_month_info = document.getElementById("lunar_details");
    let check_pakshya_lang = document.getElementById("check_pakshya_lang");

    if(check_pakshya_lang.checked == true) {
        if(!lunar_month_info.classList.contains('pakshya-details-nep')) {
            lunar_month_info.click();
        }
    }
    else {
        if(lunar_month_info.classList.contains('pakshya-details-nep')) {
            lunar_month_info.classList.remove('pakshya-details-nep');
            lunar_month_info.click();
        }
    }
    console.info("Preferences (Lunar Month Info Lang) set to: ", check_pakshya_lang.checked ? "Nepali" : "Default");
}

function toggle_public_holiday_lang(){
    let check_public_holiday_lang = document.getElementById('check_public_holiday_lang');

    if(localStorage.CALMODE == 2) {
        console.info("Public Holiday Language Change not applicable in this calendar view.");
        return;
    }

    if(check_public_holiday_lang.checked == true) {
        public_holiday_lang_en = true;
        add_public_holiday_box(currentMonth, currentYear);
    }
    else {
        public_holiday_lang_en = false;
        add_public_holiday_box(currentMonth, currentYear);
    }
    console.info("Public Holiday Lang set to: ", check_public_holiday_lang.checked ? "en" : "np");
}
     
function toggle_lang_info_international() {
    let check_lang_info_international = document.getElementById('check_lang_info_international');

    if(localStorage.CALMODE != 1) {
        console.info("International Event Language Change not applicable in this calendar view.");
        return;
    }

    if(check_lang_info_international.checked == true) {
        parvas_info_box_lang_session[1] = "np";
        add_parvas_list_ad(currentMonth, currentYear);
    }
    else {
        parvas_info_box_lang_session[1] = "en";
        add_parvas_list_ad(currentMonth, currentYear);
    }
    console.info("Event Info Lang (AD Calendar) set to: ", check_lang_info_international.checked ? "np" : "en");
}

function toggle_lang_info_solarns(type = "") {
    let check_lang_info_solarns = document.getElementById('check_lang_info_solarns');

    if(localStorage.CALMODE != 0) {
        console.info("Language change of this event is not applicable in current calendar view.");
        return;
    }

    switch(type) {
        case "solarns":
            parvas_info_box_lang_session[2] = check_lang_info_solarns.checked ? "en": "np";
            add_parvas_list_ns(currentMonth, currentYear);
            console.info("Solar Nepal Sambat Event Info Language (SNS Calendar) set to: ", check_lang_info_solarns.checked ? "en" : "np");
            break;

        case "national":
            parvas_info_box_lang_session[3] = check_lang_info_national.checked ? "en" : "np";
            add_parvas_list_ns(currentMonth, currentYear);
            console.info("National Event Info Lang (SNS Calendar) set to: ", check_lang_info_national.checked ? "en" : "np");
            break;

        case "other":
            parvas_info_box_lang_session[4] = check_lang_info_other.checked ? "np" : "en";
            add_parvas_list_ns(currentMonth, currentYear);
            console.info("Other Event Info Lang (SNS Calendar) set to: ", check_lang_info_other.checked ? "np" : "en");
            break;

        default:
            console.info("Solar Nepal Sambat Event Info Language (SNS Calendar) set to: ", check_lang_info_solarns.checked ? "en" : "np");
            console.info("National Event Info Lang (SNS Calendar) set to: ", check_lang_info_national.checked ? "en" : "np");
            console.info("Other Event Info Lang (SNS Calendar) set to: ", check_lang_info_other.checked ? "np" : "en");
    }
}

function trigger_all_event() {
    toggle_tithis();
    toggle_info_box();
    toggle_muhoortta_box();
    toggle_converter_link();
    toggle_print_button();
    toggle_date_jumper();
    toggle_invert_color();
    toggle_pakshya_lang();
    toggle_public_holiday_lang();
    toggle_lang_info_solarns("solarns");
    toggle_lang_info_solarns("national");
    toggle_lang_info_solarns("other");
    toggle_lang_info_international();
}

var config = [];
const default_config = [true, false, false, false, true, false, false, false, false];


// parvas info box lang: values (np, en): [BS, INTERNAT, SNS, NAT, OTHER]
const parvas_info_box_lang_default = ["np", "en", "np", "np", "en"];
let parvas_info_box_lang = [];

function save_current_config() {
    config[0] = document.getElementById('check_tithis').checked;
    config[1] = document.getElementById('check_info_box').checked;
    config[2] = document.getElementById('check_converter_link').checked;
    config[3] = document.getElementById('check_print_button').checked;
    config[4] = document.getElementById('check_date_jumper').checked;
    config[5] = document.getElementById('invert_color').checked;
    config[6] = document.getElementById('check_pakshya_lang').checked;
    config[7] = document.getElementById('check_public_holiday_lang').checked;
    config[8] = document.getElementById('check_muhoortta_box').checked;
    localStorage.setItem("config", JSON.stringify(config));
    
    parvas_info_box_lang[0] = 'np';
    parvas_info_box_lang[1] = document.getElementById('check_lang_info_international').checked ? 'np' : 'en';
    parvas_info_box_lang[2] = document.getElementById('check_lang_info_solarns').checked ? 'en' : 'np';
    parvas_info_box_lang[3] = document.getElementById('check_lang_info_national').checked ? 'en' : 'np';
    parvas_info_box_lang[4] = document.getElementById('check_lang_info_other').checked ? 'np' : 'en';
    localStorage.setItem("info_box_lang", JSON.stringify(parvas_info_box_lang));
    parvas_info_box_lang_session = parvas_info_box_lang;
    console.info("Current Event Info Language Preferences Saved Successfully.");

    console.info("Current Preferences Saved Successfully.");
    swal("Success!", "Current Config Saved", "success");
}

function load_config(def = false) {
    if (localStorage.config == null) {
        config = default_config;
        localStorage.setItem("config", JSON.stringify(default_config));
    }
    else {
        config = JSON.parse(localStorage.config);
    }

    if (localStorage.info_box_lang == null) {
        parvas_info_box_lang_session = parvas_info_box_lang_default;
        localStorage.setItem("info_box_lang", JSON.stringify(parvas_info_box_lang_default));
    }

    else {
        parvas_info_box_lang_session = JSON.parse(localStorage.info_box_lang);
    }

    if(def == true) {
        localStorage.setItem("config", JSON.stringify(default_config));
        console.info("No User Preferences Found: Default Loaded and Saved.");

        localStorage.setItem("info_box_lang", JSON.stringify(parvas_info_box_lang_default));
        console.info("No Language Preferences Found: Default Loaded and Saved.");

        load_config();
    }
    
    else if (config == null) {
        localStorage.setItem("config", JSON.stringify(default_config));
        console.info("No User Preferences Found: Default Loaded and Saved.");
        load_config();
    }

    else if (parvas_info_box_lang == null) {
        localStorage.setItem("info_box_lang", JSON.stringify(parvas_info_box_lang_default));
        console.info("No Language Preferences Found: Default Loaded and Saved.");
        load_config();
    }

    else {
        document.getElementById('check_tithis').checked = config[0];
        document.getElementById('check_info_box').checked = config[1];
        document.getElementById('check_converter_link').checked = config[2];
        document.getElementById('check_print_button').checked = config[3];
        document.getElementById('check_date_jumper').checked = config[4];
        document.getElementById('invert_color').checked = config[5];
        document.getElementById('check_pakshya_lang').checked = config[6];
        document.getElementById('check_public_holiday_lang').checked = config[7];
        document.getElementById('check_muhoortta_box').checked = config[8];

        document.getElementById("check_lang_info_solarns").checked = parvas_info_box_lang_session[2] == "en";
        document.getElementById("check_lang_info_national").checked = parvas_info_box_lang_session[3] == "en";
        document.getElementById("check_lang_info_international").checked = parvas_info_box_lang_session[1] == "np";
        document.getElementById("check_lang_info_other").checked = parvas_info_box_lang_session[4] == "np";

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
document.getElementById("setting_pane_author").innerHTML += "<br />Brihat Ratna Bajracharya<br />v3.1<br /><br />";