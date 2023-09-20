var event_req = new XMLHttpRequest();
var event_url = 'https://raw.githubusercontent.com/brihat-rb/brihat_events/master/data/events.json';
var events = JSON.parse("{}");
const NEPALI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

function arabic_number_to_nepali(number) {
  // converts given number to devanagari number
  number = number.toString();
  let nepali_number = "";
  for (let i = 0; i < number.length; i++) {
    nepali_number += NEPALI_DIGITS[parseInt(number.charAt(i))];
  }
  return nepali_number;
}

event_req.open('GET', event_url, false);
event_req.onload = function () {
  events = JSON.parse(this.response);
  count = 1;
  for (month in events) {
    var tr_elem = document.createElement('tr');

    var td_elem = document.createElement('td');
    td_elem.innerHTML = arabic_number_to_nepali(count++);
    td_elem.setAttribute("class", "text-center");
    tr_elem.appendChild(td_elem);

    var td_month = document.createElement('td');
    td_month.innerHTML = month;
    td_month.innerHTML += "<br />(" + events[month]["eq_names"][0] + ")";
    td_month.setAttribute("class", "text-center text-nowrap");
    tr_elem.appendChild(td_month);

    for (tithi in events[month]) {
      if (tithi == "eq_names") {
        continue;
      }

      var td_elems = document.createElement('td');
      td_elems.setAttribute("class", "text-center text-nowrap");
      td_elems.setAttribute("title", month + " (" + events[month]["eq_names"][0] + ") " + tithi);
      var individual_events = events[month][tithi];

      td_elems.innerHTML = "";
      if (individual_events == "") {
        td_elems.innerHTML = "---";
      }
      else {
        for (e in individual_events) {
          td_elems.innerHTML += individual_events[e] + "</br>";
        }
      }
      tr_elem.appendChild(td_elems);
    }
    document.getElementById("table_body").appendChild(tr_elem);
  }
}

event_req.onerror = function () {
  content.innerHTML = "Error Occured";
}

event_req.send();