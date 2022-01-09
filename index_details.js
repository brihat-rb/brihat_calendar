/* * REQUIRES: index_cal_conv.js * */

// GET NATIONAL AND INTERNATIONAL EVENTS JSON
var int_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
var int_event_req = new XMLHttpRequest();
var ievents = "";

int_event_req.open('GET', int_event_url, false);
int_event_req.onload = function() {
  ievents = JSON.parse(this.response);
}
int_event_req.send();

var nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
var nat_event_req = new XMLHttpRequest();
var nevents = "";

nat_event_req.open('GET', nat_event_url, false);
nat_event_req.onload = function() {
  nevents = JSON.parse(this.response);
}
nat_event_req.send();

var solar_ns_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/solar_ns_events.json';
var solar_ns_event_req = new XMLHttpRequest();
var snsevents = "";

solar_ns_event_req.open('GET', solar_ns_event_url, false);
solar_ns_event_req.onload = function() {
  snsevents = JSON.parse(this.response);
}
solar_ns_event_req.send();

var other_calendar_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/other_calendar_events.json';
var other_calendar_event_req = new XMLHttpRequest();
var other_events = "";

other_calendar_event_req.open('GET', other_calendar_event_url, false);
other_calendar_event_req.onload = function() {
  other_events = JSON.parse(this.response);
}
other_calendar_event_req.send();

function convert_to_nepali(date_string) {
  var date_split = date_string.split("-");
  var result = "";
  result += arabic_number_to_nepali(date_split[0]) + " ";
  result += BS_MONTHS_NEP[date_split[1] - 1] + " ";
  result += arabic_number_to_nepali(date_split[2]) + " ";
  return result;
}

function tdclick(id) {
  // console.log(id);
  var td_element = document.getElementById(id).parentNode.parentNode;
  var title = document.getElementById('modal_title');
  var content = document.getElementById('modal_body');
  content.innerHTML = "Loading Details ...";

  document.getElementById("javascript_form").style.display = "none";
  document.getElementById("js_send").value = 'SEND SUGGESTION';
  document.getElementById("js_send").disabled = false;
  document.getElementById("suggestion_info").innerHTML = "";
  document.getElementById("suggest_subject").value = "";
  document.getElementById("suggest_message").value = "";

  var lunar_classlist = Array.from(document.getElementById(id).classList);
  lunar_classlist.splice(lunar_classlist.indexOf("for_lunar"), 1);
  var lunar_class = lunar_classlist[0];

  var bs_date_split = id.split("-");
  var bs_year = bs_date_split[0];
  var bs_month = bs_date_split[1];
  var bs_date = bs_date_split[2];

  let ns_date_list = convert_bs_to_ns(bs_year, bs_month, bs_date).split(" ");
  // let ad_date = convert_ns_to_ad(ns_date_list[0], ns_date_list[1], ns_date_list[2]);
  let ad_date = convert_bs_to_ad(bs_year, bs_month, bs_date);
  let ad_date_list = ad_date.split(" ");
  let ad_date_sub = "<sup>th</sup>";
  if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 1) {
    ad_date_sub = "<sup>st</sup>";
  }
  else if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 2) {
    ad_date_sub = "<sup>nd</sup>";
  }
  else if (ad_date_list[2].split("")[ad_date_list[2].length - 1] == 3) {
    ad_date_sub = "<sup>rd</sup>";
  }
  else {
    ad_date_sub = "<sup>th</sup>";
  }
  let nepali_day = new Date(ad_date).getDay();

  let nepali_date = arabic_number_to_nepali(bs_year) + " ";
  nepali_date += BS_MONTHS_NEP[bs_month-1] + " ";
  nepali_date += arabic_number_to_nepali(bs_date);
  let nepali_date_day = nepali_date + ", " + NEPALI_DAYS[nepali_day];

  let solar_ns_date_list = convert_bs_to_ns(bs_year, bs_month, bs_date).split(" ");
  let solar_ns_date = "सौ. ने. सं. " + arabic_number_to_nepali(solar_ns_date_list[0]) + " ";
  solar_ns_date += NS_NEP[solar_ns_date_list[1] - 1] + " " + arabic_number_to_nepali(solar_ns_date_list[2]);
  // solar_ns_date += ", " + NS_DAYS[nepali_date_day];

  // EVENTS KEYS
  let int_events_key = ad_date_list[1].toString().padStart(2, '0') + "-" + ad_date_list[2].toString().padStart(2, '0');
  let nat_events_key = bs_month.toString().padStart(2, '0') + "-" + bs_date.toString().padStart(2, '0');
  let solar_ns_events_key = solar_ns_date_list[1].toString().padStart(2, '0') + "-" + solar_ns_date_list[2].toString().padStart(2, '0');
  let other_events_key = int_events_key; // for now

  if (CALENDAR_MODE == 2) {
    title.innerHTML = "<b>" + "वि. सं. " + nepali_date_day + "</b>";
  }
  else if (CALENDAR_MODE == 1) {
    title.innerHTML = "<b>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD, " + ENGLISH_DAYS[nepali_day] + "</b>";
  }
  else if (CALENDAR_MODE == 0) {
    title.innerHTML = "<b>" + solar_ns_date + ", " + NS_DAYS[nepali_day] + "</b>";
  }
  else {
    title.innerHTML = "<b>Unknown Error Occured</b>";
  }

  if (td_element.classList.contains("text-primary")) {
    title.classList.add("text-primary");
  }
  else {
    title.classList.remove("text-primary");
  }

  if(nepali_day == 6) {
    title.classList.add('saturday');
  }
  else {
    title.classList.remove('saturday');
  }

  if (bs_year < 2070 || bs_year > 2078) {
    let default_content = "";
    if (CALENDAR_MODE == 2) {
      default_content += "<brihat class='ad_left'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</brihat>";
      default_content += "<br /><brihat class='ns_right'>" + solar_ns_date + "</brihat>";
    }
    else if (CALENDAR_MODE == 1) {
      default_content += "<brihat class='ns_left'>" + solar_ns_date + "</brihat>";
      default_content += "<br />" + "<brihat class='bs_right'>वि. सं. " + nepali_date + "</brihat>";
    }
    else if (CALENDAR_MODE == 0) {
      default_content += "<brihat class='bs_left'>वि. सं. " + nepali_date + "</brihat><br />";
      default_content += "<brihat class='ad_choco'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</brihat>";
    }

    // show national and international events as default
    let default_events = false;
    if(nevents.data[nat_events_key]) {
      default_content += "<br />";
      if(!default_events) {
        default_content += "<br />";
      }
      default_content +="<div class='national_event event_type'>national event</div>";
      default_content +="<div class='national_event'>" + nevents.data[nat_events_key][1] + "</div>";
      default_events = true;
    }
    if(ievents.data[int_events_key]) {
      default_content += "<br />";
      if(!default_events) {
        default_content += "<br />";
      }
      default_content +="<div class='international_event event_type'>international event</div>";
      default_content +="<div class='international_event'>" + ievents.data[int_events_key][1] + "</div>";
      default_content +="<div id='international_event_eng'>( " + ievents.data[int_events_key][0] + " )</div>";
      default_events = true;
    }

    // IF REQUIRED TO SHOW SOLAR NS EVENTS AND OTHER EVENTS AS WLL
    // if(snsevents.data[solar_ns_events_key]) {
    //   default_content += "<br />";
    //   if(!default_events) {
    //     default_content += "<br />";
    //   }
    //   default_content +="<div class='solar_ns_event event_type'>solar nepal sambat event</div>";
    //   default_content +="<div class='solar_ns_event'>" + snsevents.data[solar_ns_events_key][1] + "</div>";
    //   default_content +="<div id='solar_ns_event_eng'>( " + snsevents.data[solar_ns_events_key][0] + " )</div>";
    //   default_events = true;
    // }
    // if(other_events.data[ad_date_list[0].toString()][other_events_key]) {
    //   default_content += "<br />";
    //   if(!default_events) {
    //     default_content += "<br />";
    //   }
    //   default_content +="<div class='other_calendar_event event_type'>other event</div>";
    //   default_content +="<div class='other_calendar_event'>" + other_events.data[ad_date_list[0].toString()][other_events_key][1] + "</div>";
    //   default_content +="<div id='other_calendar_event_eng'>( " + other_events.data[ad_date_list[0].toString()][other_events_key][0] + " )</div>";
    //   default_events = true;
    // }
    if (!default_events) {
      default_content += '<br /><br /><div id="no_info"><b>This date has no events</b></div>';
    }
    content.innerHTML = default_content + "<br />";
    content.innerHTML += "<b>Lunar details not available for वि. सं. '<u>" + arabic_number_to_nepali(bs_year) + "</u>'</b>";
    return;
  }

  var nepal_event_req = new XMLHttpRequest();
  // json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
  if (bs_year >= 2076 && bs_year <= 2078) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '_detailed.json';
  }
  else {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + bs_year + '.json';
  }

  nepal_event_req.open('GET', json_url, true);
  nepal_event_req.onload = function() {
    let events = JSON.parse(this.response);

    let info_content = '<div id="tithi" class="' + lunar_class + '">';
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("ns_year")) {
      info_content += "ने. सं. " + arabic_number_to_nepali(events.data[bs_month - 1][bs_date - 1].ns_year) + " ";
    }
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("lunar_month")) {
      info_content += events.data[bs_month - 1][bs_date - 1].lunar_month;
    }
    if (events.data[bs_month - 1][bs_date - 1].hasOwnProperty("pakshya")) {
      info_content += " (" + events.data[bs_month - 1][bs_date - 1].pakshya + ") ";
    }
    info_content += events.data[bs_month - 1][bs_date - 1].tithi + '</div>';
    if (bs_year >= 2070 && bs_year <= 2075) {
      info_content += "<div style='font-variant: small-caps; font-size=5px; color: darkgray;'>* detail info not available *</div>";
    }

    // if (CALENDAR_MODE != 0) {
    //   info_content += "<br />";
    // }
    info_content += "<br />";

    if (CALENDAR_MODE == 2) {
      info_content += "<span class='ad_left'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</span>";
      info_content += "<br /><span class='ns_right'>" + solar_ns_date + "</span>";
    }
    else if (CALENDAR_MODE == 1) {
      info_content += "<span class='ns_left'>" + solar_ns_date + "</span><br />";
      info_content += "<span class='bs_right'>वि. सं. " + nepali_date + "</span>";
    }
    else {
      info_content += "<span class='bs_left'>" + "वि. सं. " + nepali_date + "</span><br />";
      info_content += "<span class='ad_choco'>" + ad_date_list[2] + ad_date_sub + " " + AD_MONTHS[ad_date_list[1] - 1] + " " + ad_date_list[0] + " AD</span>";
    }

    let has_events = false;

    if(events.data[bs_month - 1][bs_date - 1].lunar_event_one || events.data[bs_month - 1][bs_date - 1].lunar_event_two || events.data[bs_month - 1][bs_date - 1].lunar_event_three) {
      info_content += "<br /><br />";
    }
    if (events.data[bs_month - 1][bs_date - 1].lunar_event_one) {
      info_content += '<div id="info1">' + events.data[bs_month - 1][bs_date - 1].lunar_event_one + '</div>';
      has_events = true;
    }
    if (events.data[bs_month - 1][bs_date - 1].lunar_event_two) {
      info_content += '<div id="info2">' + events.data[bs_month - 1][bs_date - 1].lunar_event_two + '</div>';
      has_events = true;
    }
    if (events.data[bs_month - 1][bs_date - 1].lunar_event_three) {
      info_content += '<div id="info3">' + events.data[bs_month - 1][bs_date - 1].lunar_event_three + '</div>';
      has_events = true;
    }

    var public_holidays_information = add_public_holiday_info(id, has_events);
    if (public_holidays_information) {
      info_content += public_holidays_information
      has_events = true;
    }

    if(nevents.data[nat_events_key]) {
      info_content += "<br />";
      if(!has_events) {
        info_content += "<br />";
      }
      info_content +="<div class='national_event event_type'>national event</div>";
      info_content +="<div class='national_event'>" + nevents.data[nat_events_key][1] + "</div>";
      has_events = true;
    }
    if(ievents.data[int_events_key]) {
      info_content += "<br />";
      if(!has_events) {
        info_content += "<br />";
      }
      info_content +="<div class='international_event event_type'>international event</div>";
      info_content +="<div class='international_event'>" + ievents.data[int_events_key][1] + "</div>";
      info_content +="<div id='international_event_eng'>( " + ievents.data[int_events_key][0] + " )</div>";
      has_events = true;
    }
    if(snsevents.data[solar_ns_events_key]) {
      info_content += "<br />";
      if(!has_events) {
        info_content += "<br />";
      }
      info_content +="<div class='solar_ns_event event_type'>solar nepal sambat event</div>";
      info_content +="<div class='solar_ns_event'>" + snsevents.data[solar_ns_events_key][1] + "</div>";
      has_events = true;
    }
    if(other_events.data[ad_date_list[0].toString()][other_events_key]) {
      info_content += "<br />";
      if(!has_events) {
        info_content += "<br />";
      }
      info_content +="<div class='other_calendar_event event_type'>other event</div>";
      info_content +="<div class='other_calendar_event'>" + other_events.data[ad_date_list[0].toString()][other_events_key][1] + "</div>";
      info_content +="<div id='other_calendar_event_eng'>( " + other_events.data[ad_date_list[0].toString()][other_events_key][0] + " )</div>";
      has_events = true;
    }
    if (!has_events) {
      info_content += '<br /><br /><div id="no_info"><b>This date has no events</b></div>';
    }
    content.innerHTML = info_content;
  }
  nepal_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }
  nepal_event_req.send();
}
