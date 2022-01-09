/* REQUIRES: index.js */

function previous() {
    // go to previous month
    currentYear = (currentMonth == 1) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth == 1) ? 12 : currentMonth - 1;
    if (CALENDAR_MODE == 0) {
      showCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 1) {
      showADCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 2) {
      showBSCalendar(currentMonth, currentYear);
    }
    else {
      console.warn("error in calendar mode");
    }
}

function next() {
    // go to next month
    currentYear = (currentMonth == 12) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth == 12) ? 1 : currentMonth + 1;
    if (CALENDAR_MODE == 0) {
      showCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 1) {
      showADCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 2) {
      showBSCalendar(currentMonth, currentYear);
    }
    else {
      console.warn("error in calendar mode");
    }
}

function jump() {
    // go to specific month of specific year
    currentYear = parseInt(select_year.value);
    currentMonth = parseInt(select_month.value);
    if (CALENDAR_MODE == 0) {
      showCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 1) {
      showADCalendar(currentMonth, currentYear);
    }
    else if (CALENDAR_MODE == 2) {
      showBSCalendar(currentMonth, currentYear);
    }
    else {
      console.warn("error in calendar mode");
    }
}

function showADCalendar(month, year) {
    // this funciton displays the AD calendar and all the data inside it
    table_headers.innerHTML = "<th>&ensp;SUN&ensp;</th><th>&ensp;MON&ensp;</th>";
    table_headers.innerHTML += "<th>&ensp;TUE&ensp;</th><th>&ensp;WED&ensp;</th>";
    table_headers.innerHTML += "<th>&ensp;THU&ensp;</th><th>&ensp;FRI&ensp;</th>";
    table_headers.innerHTML += "<th class='saturday'>&ensp;SAT&ensp;</th>";

    let first_day = (new Date(year.toString() + "-" + month.toString() + "-1")).getDay();
    let last_date = 29;
    if (is_leap_year(year)) {
      last_date = LEAP_DAYS_LIST[month - 1];
    }
    else {
      last_date = DAYS_LIST[month - 1];
    }

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // get NS months and years that lie in this month
    let ns_start_date_list_from_ad = convert_ad_to_ns(year, month, 1).split(" ");
    let ns_year_start = ns_start_date_list_from_ad[0];
    let ns_month_start = ns_start_date_list_from_ad[1];
    let ns_date_start = ns_start_date_list_from_ad[2];

    let ns_end_date_list_from_ad = convert_ad_to_ns(year, month, last_date).split(" ");
    let ns_year_end = ns_end_date_list_from_ad[0];
    let ns_month_end = ns_end_date_list_from_ad[1];
    let ns_date_end = ns_end_date_list_from_ad[2];

    let ns_month_year = "";
    if (ns_year_start == ns_year_end) {
      ns_month_year = NS_NEP[ns_month_start - 1] + " / " + NS_NEP[ns_month_end - 1] + " " + arabic_number_to_nepali(ns_year_start);
    }
    else{
      ns_month_year = NS_NEP[ns_month_start - 1] + " " + arabic_number_to_nepali(ns_year_start) + " / " + NS_NEP[ns_month_end - 1] + " " + arabic_number_to_nepali(ns_year_end);
    }

    // get BS months and years that lie in this month
    let bs_start_date_list_from_ns = convert_ns_to_bs(ns_year_start, ns_month_start, ns_date_start).split(" ");
    let bs_year_start = bs_start_date_list_from_ns[0];
    let bs_month_start = BS_MONTHS_NEP[bs_start_date_list_from_ns[1] - 1];

    let bs_end_date_list_from_ns = convert_ns_to_bs(ns_year_end, ns_month_end, ns_date_end).split(" ");
    let bs_year_end = bs_end_date_list_from_ns[0];
    let bs_month_end = BS_MONTHS_NEP[bs_end_date_list_from_ns[1] - 1];

    let bs_month_year = "";
    if (bs_year_start == bs_year_end) {
      bs_month_year = bs_month_start + " / " + bs_month_end + " " + arabic_number_to_nepali(bs_year_start);
    }
    else{
      bs_month_year = bs_month_start + " " + arabic_number_to_nepali(bs_year_start) + " / " + bs_month_end + " " + arabic_number_to_nepali(bs_year_end);
    }

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = "";
    monthAndYear.innerHTML += "<b>" + AD_MONTHS[month - 1] + " " + year + "</b>";
    monthAndYear.innerHTML += "<h6><span style='color: green' onclick='showCalendar(ns_today_month, ns_today_year)'>" + ns_month_year + "</span>&emsp;|&emsp;<span style='color: chocolate' onclick='showBSCalendar(bs_today_month, bs_today_year)'>" + bs_month_year + "</span></h6>";
    monthAndYear.innerHTML += "<div id='lunar_details'></div>";
    monthAndYear.innerHTML += "<div id='footer'>brihat (brihatbajracharya@gmail.com)</div>";
    // update Go To section as well
    select_year.value = ns_year_start;
    select_month.value = ns_month_start;

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
            else if (date > last_date) {
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
                let ns_list = convert_ad_to_ns(year, month, date).split(" ");
                let ns_year = ns_list[0];
                let ns_month = ns_list[1];
                let ns_date = ns_list[2];

                let bs_list = convert_ad_to_bs(year, month, date).split(" ");
                let bs_year = bs_list[0];
                let bs_month = bs_list[1];
                let bs_date = bs_list[2];


                let result = "<h4 align='center'><b>" + date + "</b></h4>";
                let bs_date_for_lunar_data = bs_year.toString() + "-" + bs_month.toString().padStart(2, "0") + "-" + bs_date.toString().padStart(2, "0");
                result += "<span class='for_lunar' align='center' id=" + bs_date_for_lunar_data + "></span><br />";
                if (ns_date == 1)
                  result += "<span class='ns_date_left'><b>" + NS_NEP_SHORT[ns_month - 1] + " " + arabic_number_to_nepali(ns_date) + "</b></span>";
                else
                  result += "<span class='ns_date_left'>" + arabic_number_to_nepali(ns_date) + "</span>";
                if (bs_date == 1)
                  result += "<span class='bs_date_right'><b>" + BS_MONTHS_NEP_SHORT[bs_month - 1] + " " + arabic_number_to_nepali(bs_date) + "</b></span>";
                else
                  result += "<span class='bs_date_right'>" + arabic_number_to_nepali(bs_date) + "</span>";
                let cellText = document.createElement("span");
                cellText.innerHTML = result;
                if (date == today.getDate() && year == today.getFullYear() && (month == today.getMonth() + 1)) {
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
        if (date > last_date) {
          // no more row needed
          break;
        }
    }
    // // finally fill lunar pakshya
    fill_lunar_data(parseInt(bs_year_start), parseInt(bs_year_end));
    CALENDAR_MODE = 1;
    localStorage.setItem('CALMODE', CALENDAR_MODE);
    currentYear = parseInt(year);
    currentMonth = parseInt(month);
    // brihatcalendar_goto.style.display = "none";
    show_public_holidays(bs_year_start, bs_year_end, bs_start_date_list_from_ns[1], bs_end_date_list_from_ns[1]);
    main_title.innerText = AD_MONTHS[month - 1] + " " + year + " (Brihat Calendar)";
    add_author_info(AD_MONTHS[month - 1], year);
    update_date_jumper(CALENDAR_MODE);
}

function showBSCalendar(month, year) {
    // this funciton displays the BS calendar and all the data inside it
    table_headers.innerHTML = "<th>आइतबार</th><th>सोमबार</th><th>मङ्गलबार</th>";
    table_headers.innerHTML += "<th>बुधबार</th><th>बिहिबार</th><th>शुक्रबार</th>"
    table_headers.innerHTML += "<th class='saturday'>शनिबार</th>";

    let ns_start_date_list_from_bs = convert_bs_to_ns(year, month, 1).split(" ");
    let ad_start_date_from_bs = convert_bs_to_ad(year, month, 1)
    let ad_start_date_list_from_bs = ad_start_date_from_bs.split(" ");

    let first_day = (new Date(ad_start_date_from_bs)).getDay();
    let last_date = BS_CALENDAR_DATA[year.toString()][month - 1];

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // get NS months and years that lie in this month
    let ns_year_start = ns_start_date_list_from_bs[0];
    let ns_month_start = ns_start_date_list_from_bs[1];
    let ns_date_start = ns_start_date_list_from_bs[2];

    let ns_end_date_list_from_bs = convert_bs_to_ns(year, month, last_date).split(" ");
    let ns_year_end = ns_end_date_list_from_bs[0];
    let ns_month_end = ns_end_date_list_from_bs[1];
    let ns_date_end = ns_end_date_list_from_bs[2];

    let ns_month_year = "";
    if (ns_year_start == ns_year_end) {
      ns_month_year = NS_NEP[ns_month_start - 1] + " / " + NS_NEP[ns_month_end - 1] + " " + arabic_number_to_nepali(ns_year_start);
    }
    else {
      ns_month_year = NS_NEP[ns_month_start - 1] + " " + arabic_number_to_nepali(ns_year_start) + " / " + NS_NEP[ns_month_end - 1] + " " + arabic_number_to_nepali(ns_year_end);
    }

    // get AD months and years that lie in this month
    let ad_year_start = ad_start_date_list_from_bs[0];
    let ad_month_start = AD_MONTHS_SHORT[ad_start_date_list_from_bs[1] - 1];

    let ad_end_date_list_from_ns_from_bs = convert_ns_to_ad(ns_year_end, ns_month_end, ns_date_end).split(" ");
    let ad_year_end = ad_end_date_list_from_ns_from_bs[0];
    let ad_month_end = AD_MONTHS_SHORT[ad_end_date_list_from_ns_from_bs[1] - 1];

    let ad_month_year = "";
    if (ad_year_start == ad_year_end) {
      ad_month_year = ad_month_start + " / " + ad_month_end + " " + ad_year_start;
    }
    else{
      ad_month_year = ad_month_start + " " + ad_year_start + " / " + ad_month_end + " " + ad_year_end;
    }

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = "";
    monthAndYear.innerHTML += "<b>" + BS_MONTHS_NEP[month - 1] + " " + arabic_number_to_nepali(year) + "</b>";
    monthAndYear.innerHTML += "<h6><span style='color: green' onclick='showADCalendar(AD_TODAY_MONTH + 1, AD_TODAY_YEAR)'>" + ad_month_year + "</span>&emsp;|&emsp;<span style='color: chocolate' onclick='showCalendar(ns_today_month, ns_today_year)'>" + ns_month_year + "</span></h6>";
    monthAndYear.innerHTML += "<div id='lunar_details'></div>";
    monthAndYear.innerHTML += "<div id='footer'>brihat (brihatbajracharya@gmail.com)</div>";
    // update Go To section as well
    select_year.value = ns_year_start;
    select_month.value = ns_month_start;

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
            else if (date > last_date) {
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
                let ns = convert_bs_to_ns(year, month, date);
                let ns_list = ns.split(" ");
                let ns_year = ns_list[0];
                let ns_month = ns_list[1];
                let ns_date = ns_list[2];

                let ad = convert_bs_to_ad(year, month, date);
                let ad_list = ad.split(" ");
                let ad_year = ad_list[0];
                let ad_month = ad_list[1];
                let ad_date = ad_list[2];


                let result = "<h4 align='center'><b>" + arabic_number_to_nepali(date) + "</b></h4>";
                let bs_date_for_lunar_data = year.toString() + "-" + month.toString().padStart(2, "0") + "-" + date.toString().padStart(2, "0");
                result += "<span class='for_lunar' align='center' id=" + bs_date_for_lunar_data + "></span><br />";
                if (ad_date == 1)
                  result += "<span class='ad_date_left'><b>" + AD_MONTHS_SHORT[ad_month - 1] + " " + ad_date + "</b></span>";
                else
                  result += "<span class='ad_date_left'>" + ad_date + "</span>";
                if (ns_date == 1)
                  result += "<span class='ns_date_right'><b>" + NS_NEP_SHORT[ns_month - 1] + " " + arabic_number_to_nepali(ns_date) + "</b></span>";
                else
                  result += "<span class='ns_date_right'>" + arabic_number_to_nepali(ns_date) + "</span>";
                let cellText = document.createElement("span");
                cellText.innerHTML = result;
                if (date == bs_today_date && year == bs_today_year && month == bs_today_month) {
                    cell.classList.add("text-primary");
                    cell.classList.add("cell-today");
                    // cell.classList.add("bg-dark");
                } //
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
        if (date > last_date) {
          // no more row needed
          break;
        }
    }
    // finally fill lunar pakshya
    fill_lunar_data(parseInt(year), parseInt(year));
    CALENDAR_MODE = 2;
    localStorage.setItem('CALMODE', CALENDAR_MODE);
    currentYear = parseInt(year);
    currentMonth = parseInt(month);
    // brihatcalendar_goto.style.display = "none";
    show_public_holidays(year, year, month, month);
    main_title.innerText = BS_MONTHS_NEP[month - 1] + " " + arabic_number_to_nepali(year) + " (Brihat Calendar)";
    add_author_info(BS_MONTHS_NEP[month - 1], arabic_number_to_nepali(year));
    update_date_jumper(CALENDAR_MODE);
}

function go_to_today() {
  let saved_calendar_mode = localStorage.CALMODE;
  if (saved_calendar_mode == 1) {
    showADCalendar(AD_TODAY_MONTH + 1, AD_TODAY_YEAR);
  }
  else if (saved_calendar_mode == 2) {
    showBSCalendar(bs_today_month, bs_today_year);
  }
  else {
    showCalendar(ns_today_month, ns_today_year);
  }
  update_date_jumper(parseInt(saved_calendar_mode));
}

go_to_today();
