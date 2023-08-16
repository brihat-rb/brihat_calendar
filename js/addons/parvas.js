/**
 * Displays Event Box in the calendar (part of Brihat Calendar)
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

/* REQUIRES: NS.js, NS_BS.js, NS_AD.js, utils.js */

let parvas_info_box_lang_session = ["np", "en", "np", "np", "en"];
if(localStorage.info_box_lang != null) {
  parvas_info_box_lang_session = JSON.parse(localStorage.info_box_lang);
}

function add_parvas_list_bs(month, year) {
  var nat_parvas_event_req = new XMLHttpRequest();
  var nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
  var nat_events = JSON.parse("{}");

  nat_parvas_event_req.open('GET', nat_event_url, false);
  nat_parvas_event_req.onload = function() {
    nat_events = JSON.parse(this.response);
  }

  nat_parvas_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }

  nat_parvas_event_req.send();
  
  var parvas_event_req = new XMLHttpRequest();
  if (year >= 2076 && year <= END_BS_YEAR) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/' + year + '_detailed.json';
  }
  else {
    console.warn("BS Year Range Invalid (Valid: 2076-", END_BS_YEAR, ") Given: ", year);
    document.getElementById("parvas").innerHTML = "";
    return;
  }
  
  let parvas = "<span style='text-decoration: underline;'>पर्व, दिवस तथा बिदाहरूः</span><br />";
  parvas_event_req.open('GET', json_url, true);
  parvas_event_req.onload = function() {
    console.info("Creating BS Event Info Box...");
    let events = JSON.parse(this.response);
    for (var date = 1; date <= BS_CALENDAR_DATA[year][month-1]; date++) {
      let span_html = "";
      let has_bs_event = false;
      let parvas_span_id = year.toString() + "-" + month.toString().padStart(2,"0") + "-" + date.toString().padStart(2, "0") + "_events";
      if (events.data[month - 1][date - 1].lunar_event_one) {
        span_html += arabic_number_to_nepali(date) + " - " + events.data[month - 1][date - 1].lunar_event_one;
      }
      if (events.data[month - 1][date - 1].lunar_event_two) {
        if (events.data[month - 1][date - 1].lunar_event_one) {
          span_html += ", ";
        }
        else {
          span_html += arabic_number_to_nepali(date) + " - ";
        }
        span_html += events.data[month - 1][date - 1].lunar_event_two;
      }
      if (events.data[month - 1][date - 1].lunar_event_three) {
        if (events.data[month - 1][date - 1].lunar_event_one || events.data[month - 1][date - 1].lunar_event_two) {
          span_html += ", ";
        }
        else {
          span_html += arabic_number_to_nepali(date) + " - ";
        }
        span_html += events.data[month - 1][date - 1].lunar_event_three;
      }
      if(span_html != "") {
        console.info("Found an event: ", span_html);
        parvas += "<span id=" + parvas_span_id + ">" + span_html;
        has_bs_event = true;
      }
      else {
        span_html = "";
      }

      // this includes national events in parvas list -- added 1 JULY 2023
      let nat_parva_key = parvas_span_id.slice(5, 10);
      if (nat_events.data[nat_parva_key]) {
        console.info("Found a national event:", arabic_number_to_nepali(date), " - ", nat_events.data[nat_parva_key][1]);
        if(has_bs_event) {
          // if(parvas_info_box_lang_session[3] == "en"){
          //   if(!parvas.includes(nat_events.data[nat_parva_key][0])) {
          //     parvas += ", " + nat_events.data[nat_parva_key][0];
          //   }
          // }
          // else {
            if(!parvas.includes(nat_events.data[nat_parva_key][1])) {
              parvas += ", " + nat_events.data[nat_parva_key][1];
            }
          // }
        }
        else {
          // if (parvas_info_box_lang_session[3] == "en"){
          //   parvas += "<span id=" + parvas_span_id + ">" + arabic_number_to_nepali(date) + " - " + nat_events.data[nat_parva_key][0];
          // }
          // else {
            parvas += "<span id=" + parvas_span_id + ">" + arabic_number_to_nepali(date) + " - " + nat_events.data[nat_parva_key][1];
          // }
          has_bs_event = true;
        }
      }

      // this shows public holidays in parvas list
      let public_holiday_key = parvas_span_id.slice(5, 10);
      if(public_holidays[year].hasOwnProperty(public_holiday_key)) {
        let holiday_name_np = public_holidays[year][public_holiday_key][3];
        console.info("Found a", public_holidays[year][public_holiday_key][1] + " holiday:", arabic_number_to_nepali(date), " - ", holiday_name_np);
        if(has_bs_event) {
          if(!parvas.includes(holiday_name_np)) {
            parvas += ", " + holiday_name_np + "</span><br />";
          }
          else {
            parvas += "</span><br />";
          }
        }
        else {
          parvas += "<span id=" + parvas_span_id + ">" + arabic_number_to_nepali(date) + " - " + holiday_name_np + "</span><br />";
        }
      }
      else {
        if(has_bs_event) {
          parvas += "</span><br />";
        }
      }
    }

    document.getElementById("parvas").innerHTML = parvas;
    // document.getElementById('parvas').style.display = "block";

    const parvas_list = document.getElementById('parvas').getElementsByTagName('span');
    for(var single_parva of parvas_list) {
      var parva_holiday_id = single_parva.id.slice(5, 10);
      if(public_holidays[year].hasOwnProperty(parva_holiday_id)) {
        if(public_holidays[year][parva_holiday_id][1] == 'national') {
          single_parva.classList.add('national_holiday');
        }
        else if(public_holidays[year][parva_holiday_id][1] == 'specific') {
          single_parva.classList.add('specific_holiday');
        }
      }
    }
    highlight_event_in_calendar();
    console.info("Creating BS Event Info Box... DONE!");
  }
  
  parvas_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }

  parvas_event_req.send();
}

function add_parvas_list_ad(month, year) {
  var int_parvas_event_req = new XMLHttpRequest();
  var int_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/international_events.json';
  
  let parvas = "<span style='text-decoration: underline;'>International Events:</span><br />";
  int_parvas_event_req.open('GET', int_event_url, true);
  int_parvas_event_req.onload = function() {
    console.info("Creating AD Event Info Box...");
    let events = JSON.parse(this.response);
    for (var date = 1; date < 32; date++) {
      let int_parva_key = month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
      let span_html = "";
      if (events.data[int_parva_key]) {
        if (parvas_info_box_lang_session[1] == "np"){
          span_html += date + " - " + events.data[int_parva_key][1];
        }
        else {
          span_html += date + " - " + events.data[int_parva_key][0];
        }
      }
      if(span_html != "") {
        let bs_list = convert_ad_to_bs(year, month, date).split(" ");
        let bs_year = bs_list[0];
        let bs_month = bs_list[1];
        let bs_date = bs_list[2];
        parvas += "<span id=" + bs_year.toString() + "-" + bs_month.toString().padStart(2,"0") + "-" + bs_date.toString().padStart(2, "0") + "_events>" + span_html + "</span><br />";
        console.info("Found an event: ", span_html);
      }  
    }
    document.getElementById("parvas").innerHTML = parvas;
    // document.getElementById('parvas').style.display = "block";

    const parvas_list = document.getElementById('parvas').getElementsByTagName('span');
    for(var single_parva of parvas_list) {
      var parva_holiday_id = single_parva.id.slice(5, 10);
      let bs_year = single_parva.id.slice(0, 4);

      if(public_holidays[bs_year] && public_holidays[bs_year].hasOwnProperty(parva_holiday_id)){
        if(public_holidays[bs_year][parva_holiday_id][1] == 'national') {
          single_parva.classList.add('national_holiday');
        }
        else if(public_holidays[bs_year][parva_holiday_id][1] == 'specific') {
          single_parva.classList.add('specific_holiday');
        }
      }
    }
    highlight_event_in_calendar();
    console.info("Creating AD Event Info Box... DONE!");
  }

  int_parvas_event_req.onerror = function() {
      content.innerHTML = "Error Occured";
  }

  int_parvas_event_req.send();
}


function add_parvas_list_ns(month, year) {
  var sns_parvas_event_req = new XMLHttpRequest();
  var sns_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/solar_ns_events.json';
  
  var nat_parvas_event_req = new XMLHttpRequest();
  var nat_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/national_events.json';
  
  var other_parvas_event_req = new XMLHttpRequest();
  var other_event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/calendar/data/other_calendar_events.json';
  
  document.getElementById("parvas").innerHTML = "";
  
  let has_parvasns = false;
  let parvasns = "<span style='text-decoration: underline;'>Solar Nepal Sambat Events:</span><br />";
  
  sns_parvas_event_req.open('GET', sns_event_url, true);
  sns_parvas_event_req.onload = function() {
    console.info("Creating NS Event Info Box...");
    let events = JSON.parse(this.response);
    for (var date = 1; date < 32; date++) {
      let sns_parva_key = month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
      let span_html = "";

      if (events.data[sns_parva_key]) {
        if (parvas_info_box_lang_session[2] == "en"){
          span_html += arabic_number_to_nepali(date) + " - " + events.data[sns_parva_key][0];
        }
        else {
          span_html += arabic_number_to_nepali(date) + " - " + events.data[sns_parva_key][1];
        }
      }
      if(span_html != "") {
        let bs_list = convert_ns_to_bs(year, month, date).split(" ");
        let bs_year = bs_list[0];
        let bs_month = bs_list[1];
        let bs_date = bs_list[2];
        parvasns += "<span id=" + bs_year.toString() + "-" + bs_month.toString().padStart(2,"0") + "-" + bs_date.toString().padStart(2, "0") + "_snsevents>" + span_html + "</span><br />";
        has_parvasns = true;
        console.info("Found an event: ", span_html);
      }  
    }

    if(has_parvasns) {
      document.getElementById("parvas").innerHTML += parvasns + "<br />";
      // document.getElementById('parvas').style.display = "block";
    }
  }

  sns_parvas_event_req.onerror = function() {
      content.innerHTML = "Error Occured";
  }

  sns_parvas_event_req.send();

  let has_parvanat = false;
  let parvanat = "<span style='text-decoration: underline;'>National Events:</span><br />";

  nat_parvas_event_req.open('GET', nat_event_url, true);
  nat_parvas_event_req.onload = function() {
    let events = JSON.parse(this.response);
    for (var date = 1; date < 32; date++) {
      if(!verify_ns_date(year, month, date)) {
          continue;
      }
      let bs_list = convert_ns_to_bs(year, month, date).split(" ");
      let bs_year = bs_list[0];
      let bs_month = bs_list[1];
      let bs_date = bs_list[2];

      let nat_parva_key = bs_month.toString().padStart(2, "0") + "-" + bs_date.toString().padStart(2, "0");
      let span_html = "";
      if (events.data[nat_parva_key]) {
        if (parvas_info_box_lang_session[3] == "en"){
          span_html += arabic_number_to_nepali(date) + " - " + events.data[nat_parva_key][0];
        }
        else {
          span_html += arabic_number_to_nepali(date) + " - " + events.data[nat_parva_key][1];
        }
      }
      if(span_html != "") {
        has_parvanat = true;
        parvanat += "<span id=" + bs_year.toString() + "-" + bs_month.toString().padStart(2,"0") + "-" + bs_date.toString().padStart(2, "0") + "_natevents>" + span_html + "</span><br />";
        console.info("Found an event: ", span_html);
      }  
    }

    if(has_parvanat) {
      document.getElementById("parvas").innerHTML += parvanat + "<br />";
      // document.getElementById('parvas').style.display = "block";
    }
  }

  nat_parvas_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }

  nat_parvas_event_req.send();

  let has_parvaother = false;
  let parvaother = "<span style='text-decoration: underline;'>Other Events:</span><br />";

  other_parvas_event_req.open('GET', other_event_url, true);
  other_parvas_event_req.onload = function() {
    let events = JSON.parse(this.response);
    for (var date = 1; date < 32; date++) {
      if(!verify_ns_date(year, month, date)) {
          continue;
      }
      let ad_list = convert_ns_to_ad(year, month, date).split(" ");
      let ad_year = ad_list[0];
      let ad_month = ad_list[1];
      let ad_date = ad_list[2];

      let other_parva_key = ad_month.toString().padStart(2, "0") + "-" + ad_date.toString().padStart(2, "0");
      let span_html = "";
      if (events.data[ad_year][other_parva_key]) {
        if (parvas_info_box_lang_session[4] == "np"){
          span_html += arabic_number_to_nepali(date) + " - " + events.data[ad_year][other_parva_key][1];
        }
        else {
          span_html += arabic_number_to_nepali(date) + " - " + events.data[ad_year][other_parva_key][0];
        }
      }
      if(span_html != "") {
        has_parvaother = true;
        let bs_list = convert_ns_to_bs(year, month, date).split(" ");
        let bs_year = bs_list[0];
        let bs_month = bs_list[1];
        let bs_date = bs_list[2];
        parvaother += "<span id=" + bs_year.toString() + "-" + bs_month.toString().padStart(2,"0") + "-" + bs_date.toString().padStart(2, "0") + "_otherevents>" + span_html + "</span><br />";
        console.info("Found an event: ", span_html);
      }  
    }

    if(has_parvaother) {
      document.getElementById("parvas").innerHTML += parvaother;
      // document.getElementById('parvas').style.display = "block";
    }

    const parvas_list = document.getElementById('parvas').getElementsByTagName('span');
    for(var single_parva of parvas_list) {
      var parva_holiday_id = single_parva.id.slice(5, 10);
      let bs_year = single_parva.id.slice(0, 4);

      if(public_holidays[bs_year] && public_holidays[bs_year].hasOwnProperty(parva_holiday_id)) {
        if(public_holidays[bs_year][parva_holiday_id][1] == 'national') {
          single_parva.classList.add('national_holiday');
        }
        else if(public_holidays[bs_year][parva_holiday_id][1] == 'specific') {
          single_parva.classList.add('specific_holiday');
        }
      }
    }
    highlight_event_in_calendar();
    console.info("Creating NS Event Info Box... DONE!");
  }

  other_parvas_event_req.onerror = function() {
      content.innerHTML = "Error Occured";
  }

  other_parvas_event_req.send();
}
