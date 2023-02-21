/**
 * Retrieves Public Holidays and marks them in calendar (part of Brihat Calendar)
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

// GET PUBLIC HOLIDAYS
var public_holiday_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_calendar/main/data/public_holidays_in_nepal.json';
var public_holiday_req = new XMLHttpRequest();
var public_holidays = JSON.parse("{}");
var public_holidays_start_year = 2076;
var public_holidays_end_year = 2079;

let public_holiday_lang_en = false;
if(localStorage.config != null) {
  public_holiday_lang_en = JSON.parse(localStorage.config)[7];
}

public_holiday_req.open('GET', public_holiday_url, false);
public_holiday_req.onload = function() {
  public_holidays = JSON.parse(this.response);
  public_holidays_start_year = public_holidays.start_year;
  public_holidays_end_year = public_holidays.end_year;
}
public_holiday_req.send();

function show_public_holidays(bs_year_start, bs_year_end, bs_month_start, bs_month_end) {
  console.info("Checking for Public Holidays...");
  if(bs_year_end < public_holidays_start_year || bs_year_start > public_holidays_end_year) {
    return;
  }

  var start_index = bs_year_start.toString() + "-" + bs_month_start.toString().padStart(2, '0');
  var end_index = bs_year_end.toString() + "-" + bs_month_end.toString().padStart(2, '0');

  var failsafe = 0;
  var ph_year = bs_year_start;
  var ph_month = bs_month_start;

  for(var index = start_index; index <= end_index;) {
    for(var days = 1; days <= BS_CALENDAR_DATA[ph_year][ph_month - 1]; days++) {
      // console.log(ph_year, " ", ph_month, " ", days);

      failsafe++;
      var public_holidays_key = ph_month.toString().padStart(2, "0") + "-" + days.toString().padStart(2, '0');
      var complete_date = ph_year + "-" + public_holidays_key;

      if(!document.getElementById(complete_date)) {
        continue;
      }

      if(public_holidays[ph_year]) {
        if(public_holidays[ph_year][public_holidays_key]) {
          console.info("Public Holiday found for: ", complete_date);
          var holiday_cause = public_holidays[ph_year][public_holidays_key][0];
          var holiday_type = public_holidays[ph_year][public_holidays_key][1];
          var holiday_description = public_holidays[ph_year][public_holidays_key][1];

          if(holiday_type == "national") {
            document.getElementById(complete_date).parentNode.parentNode.classList.add('national_holiday');
          }

          else if(holiday_type == "specific") {
            var date_node = document.getElementById(complete_date).parentNode.parentNode;

            // special case if specific holiday occurs on saturday
            if (date_node.classList.contains('saturday')) {
              date_node.classList.add('national_holiday');
            }
            else {
              date_node.classList.add('specific_holiday');
            }

            // special case if specific holiday occurs on sundaytrial (>=2079-02)
            if ((parseInt(complete_date.substring(0,4)) == 2079 && parseInt(complete_date.substring(5,7)) == 2)) {
              if (date_node.classList.contains('sundaytrial')) {
                date_node.classList.add('national_holiday');
              }
              else {
                date_node.classList.add('specific_holiday');
              }
            }
          }
        }
      }
    }
    if (failsafe > 65) {
      console.warn("Failsafe triggered");
      break;
    }
    ph_month++;
    if (ph_month > 12) {
      ph_month = 1;
      ph_year++;
    }
    index = ph_year.toString() + "-" + ph_month.toString().padStart(2, '0');
  }
  console.info("Checking for Public Holidays... DONE!");
}

function add_public_holiday_info(complete_date, has_events) {
  document.getElementById('modal_title').classList.remove("national_holiday");
  document.getElementById('modal_title').classList.remove("specific_holiday");

  var public_holidays_year = complete_date.toString().substr(0,4);
  var public_holidays_key = complete_date.toString().slice(5);
  var public_holidays_info = "";

  if(public_holidays_year < public_holidays_start_year.toString() || public_holidays_year > public_holidays_end_year.toString()) {
    return public_holidays_info;
  }

  if (public_holidays[public_holidays_year][public_holidays_key]) {
    console.info("Public Holiday Found!");
    public_holidays_array = public_holidays[public_holidays_year][public_holidays_key];
    public_holidays_info = "<br />";
    if(!has_events) {
      public_holidays_info += "<br />";
    }
    public_holidays_info += "<div class=" + public_holidays_array[1] + "_holiday>";
    public_holidays_info += "<div id='public_holiday_title'>holiday information</div>";
    public_holidays_info += "<div id='public_holiday_cause'>" + public_holidays_array[0] + "</div>";
    public_holidays_info += "<div id='public_holiday_description'>( " + public_holidays_array[2] + " )</div>";
    public_holidays_info += "</div>";

    var date_detail_popup_title = document.getElementById('modal_title');
    date_detail_popup_title.classList.add(public_holidays_array[1] + "_holiday");

    // special case when specific holiday lies on saturday
    if (date_detail_popup_title.classList.contains('saturday')) {
      date_detail_popup_title.classList.remove('saturday');
      date_detail_popup_title.classList.add('saturday');
    }
    // special case when specific holiday lies on sundaytrial after 2079-02
    if ((parseInt(complete_date.substring(0,4)) == 2079 && parseInt(complete_date.substring(5,7)) == 2)) {
      if (date_detail_popup_title.classList.contains('sundaytrial')) {
        date_detail_popup_title.classList.remove('sundaytrial');
        date_detail_popup_title.classList.add('sundaytrial');
      }
    }
    console.info("Public Holiday Displayed!");
  }

  return public_holidays_info;
}

function add_public_holiday_box(month, year) {
  // this lists public holidays in AD and Solar NS Calendar
  if(CALENDAR_MODE == 2) {
    console.info("Public Holidays' Info Integrated in Event Info Box itself.");
    return;
  }
  console.info("Creating Public Holiday Info Box...");

  let public_holiday_list_html = "<span style='text-decoration: underline;'>सार्वजनिक बिदाहरू:</span><br />";
  if(public_holiday_lang_en) {
    public_holiday_list_html = "<span style='text-decoration: underline;'>Public Holidays:</span><br />";
  }
  let public_holiday_box = document.getElementById("public_holiday_box");
  let last_date = CALENDAR_MODE ? 32 : get_last_date_ns(year, month);
  let has_public_holiday = false;

  for (var date = 1; date < last_date; date++) {
    let bs_list = "";
    if(CALENDAR_MODE == 0) {
      bs_list = convert_ns_to_bs(year, month, date).split(" ");
    }
    else if (CALENDAR_MODE == 1) {
      bs_list = convert_ad_to_bs(year, month, date).split(" ");
    }
    else {
      console.error("Unexpected Error Occured in: make_public_holiday_box()");
      return;
    }

    let bs_year = bs_list[0];
    let bs_month = bs_list[1];
    let bs_date = bs_list[2];

    let public_holiday_key = bs_month.toString().padStart(2, '0') + "-" + bs_date.toString().padStart(2, '0')
    let public_holiday_span_id = bs_year.toString() + "-" + public_holiday_key + "_PH";
    if(public_holidays.hasOwnProperty(bs_year)) {
      if(public_holidays[bs_year].hasOwnProperty(public_holiday_key)) {
        let holiday_name = public_holidays[bs_year][public_holiday_key][3];
        if(public_holiday_lang_en) {
          holiday_name = public_holidays[bs_year][public_holiday_key][0];
        }
        public_holiday_list_html += "<span id=" + public_holiday_span_id + ">";
        let public_holiday_list_span = CALENDAR_MODE ? date : arabic_number_to_nepali(date);
        public_holiday_list_span += " - " + holiday_name;
        public_holiday_list_html += public_holiday_list_span + "</span><br />";
        console.info("Added to list: ", public_holiday_list_span);
        has_public_holiday = true;
      }
    }
  }

  public_holiday_box.innerHTML = public_holiday_list_html;

  const holidays_list = document.getElementById('public_holiday_box').getElementsByTagName('span');
  for(var holiday of holidays_list) {
    var holiday_id = holiday.id.slice(5, 10);
    let bs_year = holiday.id.slice(0, 4);

    if(public_holidays[bs_year] && public_holidays[bs_year].hasOwnProperty(holiday_id)){
      if(public_holidays[bs_year][holiday_id][1] == 'national') {
        holiday.classList.add('national_holiday');
      }
      else if(public_holidays[bs_year][holiday_id][1] == 'specific') {
        holiday.classList.add('specific_holiday');
      }
    }
  }
  public_holiday_box.style.display = "block";
  if(!has_public_holiday) {
    public_holiday_box.style.display = "none";
  }
  console.info("Creating Public Holiday Info Box... DONE!");
}
