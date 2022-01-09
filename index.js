/* REQUIRES: NS.js, NS_BS.js, NS_AD.js */

let today = new Date();
let AD_TODAY_YEAR = today.getFullYear();
let AD_TODAY_MONTH = today.getMonth();
let AD_TODAY_DATE = today.getDate();

let ns_today = convert_ad_to_ns(AD_TODAY_YEAR, AD_TODAY_MONTH + 1, AD_TODAY_DATE);
let ns_today_list = ns_today.split(" ");
let ns_today_year = ns_today_list[0];
let ns_today_month = ns_today_list[1];
let ns_today_date = ns_today_list[2];

let currentMonth = parseInt(ns_today_month);
let currentYear = parseInt(ns_today_year);
const select_year = document.getElementById("year");
const select_month = document.getElementById("month");
const monthAndYear = document.getElementById("monthAndYear");

// Some Global variables added for NS-AD-BS Calendar Toggle
const brihatcalendar_goto = document.getElementById("brihat_calendar_date_jumper");
const table_headers = document.getElementById('table_header_row');
/*
CALENDAR_MODE (default: 0)
0 - NS,   1 - AD,   2 - BS
*/
let CALENDAR_MODE = 0;
let bs_today = convert_ns_to_bs(ns_today_year, ns_today_month, ns_today_date);
let bs_today_list = bs_today.split(" ");
let bs_today_year = bs_today_list[0];
let bs_today_month = bs_today_list[1];
let bs_today_date = bs_today_list[2];

let main_title = document.getElementsByTagName('title')[0];

function add_author_info(month, year) {
  let first_td = document.getElementById('calendar-body').firstChild.firstChild;
  let last_td = document.getElementById('calendar-body').lastChild.lastChild;
  let first_colspan = first_td.getAttribute('colspan');
  let last_colspan = last_td.getAttribute('colspan');
  let copyright_notice = "&copy;<br /><b>Brihat Ratna Bajracharya</b><br />";
  copyright_notice += month + " " + year;
  let copyright_element = document.createElement('span');
  copyright_element.innerHTML = copyright_notice;
  if (first_colspan > last_colspan && last_colspan < 3) {
    first_td.appendChild(copyright_element);
    first_td.classList.add('print');

    // ADDED QR in .card-header instead
    // if (last_colspan > 0) {
    //   last_td.classList.add('qr');
    // }
    // else {
    //   first_td.classList.add('qr_fallback');
    // }
  }
  else {
    last_td.appendChild(copyright_element);
    last_td.classList.add('print');

    // ADDED QR in .card-header instead
    // if (first_colspan > 0) {
    //   first_td.classList.add('qr');
    // }
    // else {
    //   last_td.classList.add('qr_fallback');
    // }
  }
}
// Handled by function update_date_jumper() at end of this file
// create options for select year (1100-1199 NS) and select current year
// for (let ns_year = 1100; ns_year < 1200; ns_year++) {
//   let option = document.createElement("option");
//   select_year.options.add(option);
//   option.text = arabic_number_to_nepali(ns_year);
//   option.value = ns_year;
// }
// select_year.value = ns_today_year;

let pakshya_details_nep = "";
let pakshya_details_ns = "";


// BELOW function replaced in index_cal_conv.js
// function previous() {
//     // go to previous month
//     currentYear = (currentMonth == 1) ? currentYear - 1 : currentYear;
//     currentMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
//     showCalendar(currentMonth, currentYear);
// }
//
// function next() {
//     // go to next month
//     currentYear = (currentMonth == 12) ? currentYear + 1 : currentYear;
//     currentMonth = (currentMonth == 12) ? 1 : currentMonth + 1;
//     showCalendar(currentMonth, currentYear);
// }
//
// function jump() {
//     // go to specific month of specific year
//     currentYear = parseInt(select_year.value);
//     currentMonth = parseInt(select_month.value);
//     showCalendar(currentMonth, currentYear);
// }

function fill_lunar_data(year1, year2) {
    const lunar_data_url1 = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/brihat_calendar/data/" + year1.toString() + "_lunar_data.json";
    var LUNAR_EVENTS = JSON.parse('{}');
    var LUNAR_EVENTS_ONE = LUNAR_EVENTS;
    var LUNAR_EVENTS_TWO = LUNAR_EVENTS;

    if (year1 >= 2070 && year1 <= 2078) {
      var lunar_data_req1 = new XMLHttpRequest();
      lunar_data_req1.open('GET', lunar_data_url1, false);
      lunar_data_req1.onload = function() {
          LUNAR_EVENTS_ONE = JSON.parse(this.response);
      }
      lunar_data_req1.onerror = function() {
          console.warn("Error fetching Lunar Data.")
          LUNAR_EVENTS_ONE = LUNAR_EVENTS;
      }
      lunar_data_req1.send();
    }

    if (year1 != year2) {
      if (year2 >= 2070 && year2 <= 2078) {
        const lunar_data_url2 = "https://raw.githubusercontent.com/brihat-rb/brihat-rb.github.io/master/brihat_calendar/data/" + year2.toString() + "_lunar_data.json";

        var lunar_data_req2 = new XMLHttpRequest();
        lunar_data_req2.open('GET', lunar_data_url2, false);
        lunar_data_req2.onload = function() {
            LUNAR_EVENTS_TWO = JSON.parse(this.response);
        }
        lunar_data_req2.onerror = function() {
            console.warn("Error fetching Lunar Data.");
            LUNAR_EVENTS_TWO = LUNAR_EVENTS;
        }
        lunar_data_req2.send();
      }
    }

    let lunar_span = document.getElementsByClassName('for_lunar');

    let prev_span_element = "";
    let prev_lunar_month = "";

    let lunar_month_list = [];
    let lunar_month_list_nep = [];
    let lunar_year_list = [];
    let lunar_year_list_all = [];

    for (let i = 0; i < lunar_span.length; i++) {
      let span_element = lunar_span[i];
      let span_id = span_element.id;
      let span_id_year = parseInt(span_id.substr(0, 4));
      let span_event = "n/a";
      if (span_id_year == year1) {
        LUNAR_EVENTS = LUNAR_EVENTS_ONE;
      }
      else if (span_id_year == year2) {
        LUNAR_EVENTS = LUNAR_EVENTS_TWO;
      }
      if (LUNAR_EVENTS.hasOwnProperty(span_id)) {
        span_event = LUNAR_EVENTS[span_id][2];
        if (i == 0) {
          span_element.classList.add("pstart");
          lunar_month_list.push(LUNAR_EVENTS[span_id][0]);
          lunar_month_list_nep.push(LUNAR_EVENTS[span_id][1]);
          lunar_year_list.push(LUNAR_EVENTS[span_id][3]);
          lunar_year_list_all.push(LUNAR_EVENTS[span_id][3]);
        }
        if (i > 0) {
          if (prev_lunar_month != LUNAR_EVENTS[span_id][0]) {
            lunar_month_list.push(LUNAR_EVENTS[span_id][0]);
            lunar_month_list_nep.push(LUNAR_EVENTS[span_id][1]);
            lunar_year_list_all.push(LUNAR_EVENTS[span_id][3]);
            if (lunar_year_list.indexOf(LUNAR_EVENTS[span_id][3]) == -1) {
              lunar_year_list.push(LUNAR_EVENTS[span_id][3]);
            }
            // lunar_year_list.filter((e, i, a) => a.indexOf(e) === i);

            if (prev_span_element.classList.contains("pstart")) {
              span_element.classList.remove("pstart");
              span_element.classList.add("pmid1");
            }
            else if (prev_span_element.classList.contains("pmid1")) {
              span_element.classList.remove("pmid1");
              span_element.classList.add("pmid2");
            }
            else if (prev_span_element.classList.contains("pmid2")) {
              span_element.classList.remove("pmid2");
              span_element.classList.add("pend");
            }
            else {
              span_element.classList.add("pstart");
            }
          }
          else {
            if (prev_span_element.classList.contains("pstart")) {
              span_element.classList.add("pstart");
            }
            else if (prev_span_element.classList.contains("pmid1")) {
              span_element.classList.add("pmid1");
            }
            else if (prev_span_element.classList.contains("pmid2")) {
              span_element.classList.add("pmid2");
            }
            else if (prev_span_element.classList.contains("pend")) {
              span_element.classList.add("pend");
            }
          }
        }
        prev_lunar_month = LUNAR_EVENTS[span_id][0];
      }
      prev_span_element = span_element;
      if (span_event == "पूर्णिमा") {
        span_event = "&#127773;";
      }
      if (span_event == "औंसी") {
        span_event = "&#127770;";
      }
      span_element.innerHTML = span_event;
    }

    let pakshya_details = document.getElementById("lunar_details");
    if (lunar_month_list.length == 0 || lunar_year_list.length == 0) {
      pakshya_details.innerHTML = "";
    }

    // temporary code
    else if ((lunar_month_list.length == 1 || lunar_year_list.length == 1) && lunar_month_list[0] == "") {
      pakshya_details.innerHTML = "* LUNAR MONTH DETAIL: NA *";
      pakshya_details.classList.add('pakshya-details-nep');
      pakshya_details_nep = "* LUNAR MONTH DETAIL: NA *";
    }
    else {
      if (lunar_year_list.length == 1) {
        if (lunar_month_list.length < 3) {
          if (lunar_month_list.length == 1) {
            // special case for new year (BS) where prev all lunar pakshya are n/a
            pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>";
            pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]);
            pakshya_details_nep = "<span class='pstart'>" + lunar_month_list_nep[0] + "</span>";
            pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[0]);
          }
          else {
            // special case for end of year (BS) where there are only two lunar months (not tested)
            pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>" + " / ";
            pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>";
            pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]);
            pakshya_details_nep = "<span class='pstart'>" + lunar_month_list_nep[0] + "</span>" + " / ";
            pakshya_details_nep += "<span class='pmid1'>" + lunar_month_list_nep[1] + "</span>";
            pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[0]);
          }
        }
        else {
          pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>" + " / ";
          pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>" + " / ";
          pakshya_details.innerHTML += "<span class='pmid2'>" + lunar_month_list[2] + "</span>";
          pakshya_details_nep = "<span class='pstart'>" + lunar_month_list_nep[0] + "</span>" + " / ";
          pakshya_details_nep += "<span class='pmid1'>" + lunar_month_list_nep[1] + "</span>" + " / ";
          pakshya_details_nep += "<span class='pmid2'>" + lunar_month_list_nep[2] + "</span>";
          if (lunar_month_list.length == 4) {
            pakshya_details.innerHTML += " / " + "<span class='pend'>" + lunar_month_list[3] + "</span>";
            pakshya_details_nep += " / " + "<span class='pend'>" + lunar_month_list_nep[3] + "</span>";
          }
          pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]);
          pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[0]);
        }
      }
      else {
        if (lunar_month_list.length == 2) {
          pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>" + " ";
          pakshya_details.innerHTML += arabic_number_to_nepali(lunar_year_list[0]) + " / ";
          pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>" + " ";
          pakshya_details.innerHTML += arabic_number_to_nepali(lunar_year_list[1]);
          pakshya_details_nep = "<span class='pstart'>" + lunar_month_list_nep[0] + "</span>" + " ";
          pakshya_details_nep += arabic_number_to_nepali(lunar_year_list[0]) + " / ";
          pakshya_details_nep += "<span class='pmid1'>" + lunar_month_list_nep[1] + "</span>" + " ";
          pakshya_details_nep += arabic_number_to_nepali(lunar_year_list[1]);
        }
        else {
          pakshya_details.innerHTML = "<span class='pstart'>" + lunar_month_list[0] + "</span>";
          pakshya_details_nep = "<span class='pstart'>" + lunar_month_list_nep[0] + "</span>";
          if (lunar_year_list_all[0] != lunar_year_list_all[1]) {
            pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";
            pakshya_details.innerHTML += "<span class='pmid1'>" + lunar_month_list[1] + "</span>";
            pakshya_details.innerHTML += ", " + "<span class='pmid2'>" + lunar_month_list[2] + "</span>";
            pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";
            pakshya_details_nep += "<span class='pmid1'>" + lunar_month_list_nep[1] + "</span>";
            pakshya_details_nep += ", " + "<span class='pmid2'>" + lunar_month_list_nep[2] + "</span>";
            if (lunar_month_list.length > 3) {
              pakshya_details.innerHTML += ", " + "<span class='pend'>" + lunar_month_list[3] + "</span>";
              pakshya_details_nep += ", " + "<span class='pend'>" + lunar_month_list_nep[3] + "</span>";
            }
            pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[1]);
            pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[1]);
          }
          else {
            pakshya_details.innerHTML += ", " + "<span class='pmid1'>" + lunar_month_list[1] + "</span>";
            pakshya_details_nep += ", " + "<span class='pmid1'>" + lunar_month_list_nep[1] + "</span>";
            if (lunar_year_list_all[1] != lunar_year_list_all[2]) {
              pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";
              pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[0]) + " <b>/</b> ";

              pakshya_details.innerHTML += "<span class='pmid2'>" + lunar_month_list[2] + "</span>";
              pakshya_details_nep += "<span class='pmid2'>" + lunar_month_list_nep[2] + "</span>";
              if (lunar_month_list.length > 3) {
                pakshya_details.innerHTML += ", " + "<span class='pend'>" + lunar_month_list[3] + "</span>";
                pakshya_details_nep += "," + "<span class='pend'>" + lunar_month_list_nep[3] + "</span>";
              }
              pakshya_details.innerHTML += " " + arabic_number_to_nepali(lunar_year_list[1]);
              pakshya_details_nep += " " + arabic_number_to_nepali(lunar_year_list[1]);
            }
          }
        }
      }
    }
    pakshya_details_ns = pakshya_details.innerHTML;
    pakshya_details.addEventListener('click', function() {
      if (pakshya_details.classList.contains('pakshya-details-nep')) {
        pakshya_details.classList.remove('pakshya-details-nep');
      }
      if (pakshya_details.innerHTML == pakshya_details_ns) {
        pakshya_details.innerHTML = pakshya_details_nep;
        pakshya_details.classList.add("pakshya-details-nep");
      }
      else {
        pakshya_details.innerHTML = pakshya_details_ns;
      }
    });
}

function showCalendar(month, year) {
    // this funciton displays the calendar and all the data inside it
    table_headers.innerHTML = "<th>आइतबाः</th><th>सोमबाः</th><th>मङ्लबाः</th>";
    table_headers.innerHTML += "<th>बुधबाः</th><th>बिहिबाः</th><th>सुक्रबाः</th>";
    table_headers.innerHTML += "<th class='saturday'>सनिबाः</th>";

    let equivalent_bs_date = convert_ns_to_bs(year, month, 1);
    let equivalent_bs_date_list = equivalent_bs_date.split(" ");
    let equivalent_bs_year = equivalent_bs_date_list[0];
    let equivalent_bs_month = equivalent_bs_date_list[1];
    let equivalent_bs_day = equivalent_bs_date_list[2];

    let equivalent_ad_date = convert_bs_to_ad(equivalent_bs_year, equivalent_bs_month, equivalent_bs_day);

    let first_day = (new Date(equivalent_ad_date)).getDay();
    let last_date = get_last_date_ns(year, month);

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // get BS months and years that lie in this month
    let bs_start_date_list_from_ns = convert_ns_to_bs(year, month, 1).split(" ");
    let bs_year_start = bs_start_date_list_from_ns[0];
    let bs_month_start = bs_start_date_list_from_ns[1];

    let bs_end_date_list_from_ns = convert_ns_to_bs(year, month, last_date).split(" ");
    let bs_year_end = bs_end_date_list_from_ns[0];
    let bs_month_end = bs_end_date_list_from_ns[1];

    let bs_month_year = "";
    if (bs_year_start == bs_year_end) {
      bs_month_year = BS_MONTHS_NEP[bs_month_start - 1] + " / " + BS_MONTHS_NEP[bs_month_end - 1] + " " + arabic_number_to_nepali(bs_year_start);
    }
    else{
      bs_month_year = BS_MONTHS_NEP[bs_month_start - 1] + " " + arabic_number_to_nepali(bs_year_start) + " / " + BS_MONTHS_NEP[bs_month_end - 1] + " " + arabic_number_to_nepali(bs_year_end);
    }

    // get AD months and years that lie in this month
    let ad_start_date_list_from_ns = convert_ns_to_ad(year, month, 1).split(" ");
    let ad_year_start = ad_start_date_list_from_ns[0];
    let ad_month_start = AD_MONTHS_SHORT[ad_start_date_list_from_ns[1] - 1];

    let ad_end_date_list_from_ns = convert_ns_to_ad(year, month, last_date).split(" ");
    let ad_year_end = ad_end_date_list_from_ns[0];
    let ad_month_end = AD_MONTHS_SHORT[ad_end_date_list_from_ns[1] - 1];

    let ad_month_year = ""
    if (ad_year_start == ad_year_end) {
      ad_month_year = ad_month_start + " / " + ad_month_end + " " + ad_year_start;
    }
    else{
      ad_month_year = ad_month_start + " " + ad_year_start + " / " + ad_month_end + " " + ad_year_end;
    }

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = ""
    monthAndYear.innerHTML += "<b>" + NS_NEP[month - 1] + " " + arabic_number_to_nepali(year) + "</b>";
    monthAndYear.innerHTML += "<h6><span style='color: green' onclick='showBSCalendar(bs_today_month, bs_today_year)'>" + bs_month_year + "</span>&emsp;|&emsp;<span style='color: chocolate' onclick='showADCalendar(AD_TODAY_MONTH + 1, AD_TODAY_YEAR)'>" + ad_month_year + "</span></h6>";
    monthAndYear.innerHTML += "<div id='lunar_details'></div>"
    monthAndYear.innerHTML += "<div id='footer'>brihat (brihatbajracharya@gmail.com)</div>"
    // update Go To section as well
    select_year.value = year;
    select_month.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < first_day) {
                let cell = document.createElement("td");
                cell.setAttribute('colspan', first_day);
                j = first_day - 1;
                // if (j == 6) {
                //   cell.classList.add("saturday");
                // }
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > get_total_days_in_ns_month(month, year)) {
                // filling up the table for all days completed
                let cell = document.createElement("td");
                cell.setAttribute('colspan', 7-j);
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                break;
            }

            else {
                let cell = document.createElement("td");
                cell.setAttribute('onclick', 'tdclick(this.childNodes[0].childNodes[1].id);');
                cell.setAttribute('data-toggle', 'modal');
                cell.setAttribute('data-target', '#myModal');
                if (j == 6) {
                  cell.classList.add("saturday");
                }

                let bs_list = convert_ns_to_bs(year, month, date).split(" ");
                let bs_year = bs_list[0];
                let bs_month = bs_list[1];
                let bs_date = bs_list[2];

                let ad_list = convert_bs_to_ad(bs_year, bs_month, bs_date).split(" ");
                let ad_year = ad_list[0];
                let ad_month = ad_list[1];
                let ad_date = ad_list[2];

                let result = "<h4 align='center'><b>" + arabic_number_to_nepali(date) + "</b></h4>";
                let bs_date_for_lunar_data = bs_year.toString() + "-" + bs_month.toString().padStart(2, "0") + "-" + bs_date.toString().padStart(2, "0");
                result += "<span class='for_lunar' align='center' id=" + bs_date_for_lunar_data + "></span><br />";
                if (bs_date == 1)
                  result += "<span class='bs_date'><b>" + BS_MONTHS_NEP_SHORT[bs_month - 1] + " " + arabic_number_to_nepali(bs_date) + "</b></span>";
                else
                  result += "<span class='bs_date'>" + arabic_number_to_nepali(bs_date) + "</span>";
                if (ad_date == 1)
                  result += "<span class='ad_date'><b>" + AD_MONTHS_SHORT[ad_month - 1] + " " + ad_date + "</b></span>";
                else
                  result += "<span class='ad_date'>" + ad_date + "</span>";
                let cellText = document.createElement("span");
                cellText.innerHTML = result;
                if (date == ns_today_date && year == ns_today_year && month == ns_today_month) {
                    cell.classList.add("text-primary");
                    cell.classList.add("cell-today");
                    // cell.classList.add("bg-dark");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
        if (date > get_total_days_in_ns_month(month, year)) {
          // no more row needed
          break;
        }
    }
    // finally fill lunar pakshya
    fill_lunar_data(parseInt(bs_year_start), parseInt(bs_year_end));
    CALENDAR_MODE = 0;
    localStorage.setItem('CALMODE', CALENDAR_MODE);
    currentMonth = parseInt(month);
    currentYear = parseInt(year);
    // brihatcalendar_goto.style.display = "flex";
    show_public_holidays(bs_year_start, bs_year_end, bs_month_start, bs_month_end);
    main_title.innerText = NS_NEP[month - 1] + " " + arabic_number_to_nepali(year) + " (Brihat Calendar)";
    add_author_info(NS_NEP[month - 1], arabic_number_to_nepali(year));
    update_date_jumper(CALENDAR_MODE);
}

function update_date_jumper(cal_mode) {
  select_year.innerHTML = "";
  select_month.innerHTML = "";
  switch(cal_mode) {
    case 0:
      for (let ns_year = 1100; ns_year <= 1200; ns_year++) {
        let option = document.createElement("option");
        select_year.options.add(option);
        option.text = arabic_number_to_nepali(ns_year);
        option.value = ns_year;
      }

      for (let ns_month = 0; ns_month < 12; ns_month++) {
        let option = document.createElement("option");
        select_month.options.add(option);
        option.text = NS_NEP[ns_month];
        option.value = ns_month + 1;
      }
      break;
    case 1:
      for (let ad_year = 1980; ad_year <= 2050; ad_year++) {
        let option = document.createElement("option");
        select_year.options.add(option);
        option.text = ad_year;
        option.value = ad_year;
      }

      for (let ad_month = 0; ad_month < 12; ad_month++) {
        let option = document.createElement("option");
        select_month.options.add(option);
        option.text = AD_MONTHS[ad_month];
        option.value = ad_month + 1;
      }
      break;
    case 2:
      for (let bs_year = 2000; bs_year <= 2100; bs_year++) {
        let option = document.createElement("option");
        select_year.options.add(option);
        option.text = arabic_number_to_nepali(bs_year);
        option.value = bs_year;
      }

      for (let bs_month = 0; bs_month < 12; bs_month++) {
        let option = document.createElement("option");
        select_month.options.add(option);
        option.text = BS_MONTHS_NEP[bs_month];
        option.value = bs_month + 1;
      }
      break;
    default:
      document.getElementById("brihat_calendar_date_jumper").style.display = "none";
  }
  select_year.value = currentYear;
  select_month.value = currentMonth;
}

// function print() {
//   var print_content = document.getElementsByTagName('html')[0].innerHTML;
//   // 595 x 842
//   var win = window.open('bri', 'hat', 'left=0, top=0, width=800, height=567, toolbar=0, scrollbars=0, status=0');
//   win.document.title = 'Brihat Calendar My new title';
//   win.document.write('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
//   win.document.write('<link rel="stylesheet" href="./index.css" />');
//   win.document.write('<link rel="stylesheet" href="./index_cal_conv.css" />');
//   win.document.write('<link rel="stylesheet" href="./index_details.css" />');
//   win.document.write(print_content);
//   win.document.getElementById("solarnsconverter").style.display = "none";
//   win.document.getElementById("brihat_calendar_date_jumper").style.display = "none";
//   win.document.getElementById("print").style.display = "none";
//   win.document.close();
//   win.focus();
//   win.print();
//   win.close();
// }
