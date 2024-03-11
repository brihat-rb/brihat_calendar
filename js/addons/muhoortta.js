/**
 * Displays Muhoortta Box in the BS calendar (part of Brihat Calendar)
 * Copyright (C) 2023  Brihat Ratna Bajracharya
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

/* REQUIRES: NS.js */

let events = [];
let show_muhoortta_box_session = false;
if(localStorage.config != null) {
  show_muhoortta_box_session = JSON.parse(localStorage.config)[8];
}

function add_muhoortta_box(month, year) {
  if(CALENDAR_MODE != 2) {
    console.warn("Not implemented for this calendar mode.");
    document.getElementById("muhoortta_box").style.display = "none";
    return;
  }
  var muhoortta_event_req = new XMLHttpRequest();
  if (year >= 2079 && year <= 2081) {
    json_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/muhoortta.json';
  }
  else {
    console.warn("BS Year Range Invalid (Valid: 2079-2081) Given: ", year);
    document.getElementById("muhoortta_box").innerHTML = "";
    return;
  }
  
  let muhoortta = "";
  muhoortta_event_req.open('GET', json_url, true);
  muhoortta_event_req.onload = function() {
    console.info("Creating BS Muhoortta Info Box...");
    events = JSON.parse(this.response);
    let span_html = "";
    if (events.hasOwnProperty(year)) {
      if(events[year].hasOwnProperty("bratabandha")) {
        if(events[year]["bratabandha"][month - 1].length != 0){
          span_html = arabic_numbertext_to_nepali(events[year]["bratabandha"][month - 1].toString()).replaceAll(",", ", ").replace(/,\s([^,]+)$/, ' र $1');
          console.info("Found Bratabandha Muhoortta: ", span_html);
          muhoortta += "<div><span style='text-decoration: underline;' id='bratabandha_muhoortta'>व्रतबन्ध मुहूर्त्ताः</span>&ensp;<span> " + span_html + " गते</span></div>&emsp;";
        }
      }
      if(events[year].hasOwnProperty("bibaha")) {
        if(events[year]["bibaha"][month - 1].length != 0){
          span_html = arabic_numbertext_to_nepali(events[year]["bibaha"][month - 1].toString()).replaceAll(",", ", ").replace(/,\s([^,]+)$/, ' र $1');
          console.info("Found Bibaha Muhoortta: ", span_html);
          muhoortta += "<div><span style='text-decoration: underline;' id='bibaha_muhoortta'>विवाह मुहूर्त्ताः</span>&ensp;<span> " + span_html + " गते</span></div>";
        }
      }
    }

    document.getElementById("muhoortta_box").innerHTML = muhoortta;
    if(muhoortta != "") {
      if(show_muhoortta_box_session) {
        document.getElementById("muhoortta_box").style.display = "flex";
      }
    }
    else {
      document.getElementById("muhoortta_box").style.display = "none";
    }
    console.info("Creating BS Muhoortta Info Box... DONE!");
  }
  
  muhoortta_event_req.onerror = function() {
    content.innerHTML = "Error Occured";
  }

  muhoortta_event_req.send();
}