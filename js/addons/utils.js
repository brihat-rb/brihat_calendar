function highlight_event_in_calendar() {
    var parvas_dom = document.getElementById("parvas").childNodes;
    var parvas_span_events = [].filter.call(parvas_dom, function(el) {
        return el.id.includes('events');
    });

    parvas_span_events.forEach(event => {
        var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
        event.addEventListener("mouseover", (e) => {
            event.style = "color: darkgoldenrod; font-weight: bolder;";
            if (corresponding_td.classList.contains('national_holiday')) {
                corresponding_td.style = "background-color: pink !important; border-color: black;";
            }
            else if (corresponding_td.classList.contains('specific_holiday')) {
                corresponding_td.style = "background-color: powderblue !important; border-color: black;";
            }
            else {
                corresponding_td.style = "background-color: khaki !important; border-color: black;";
            }
        });

        event.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                event.style = "color: none; font-weight: none;";
                corresponding_td.style = "background-color: none; border-color: none;";
            }, 250);
        });
    });

    var parvas_title = parvas_dom[0];
    // parvas_title.addEventListener("mouseover", (e) => {
    //     setTimeout(() => {
    //         parvas_span_events.forEach(event => {
    //             var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
    //             corresponding_td.style = "background-color: gold !important; border-color: black;";
    //         });
    //     }, 250);
    // });
    parvas_title.addEventListener("mouseout", (e) => {
        parvas_span_events.forEach(event => {
            var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
            corresponding_td.style = "background-color: none; border-color: none;";
        });
    });
}

function highlight_events() {
    var parvas_dom = document.getElementById("parvas").childNodes;
    var parvas_span_events = [].filter.call(parvas_dom, function(el) {
        return el.id.includes('events');
    });

    parvas_span_events.forEach(function (event, index) {
        setTimeout(() => {
            event.style = "color: darkgoldenrod; font-weight: none;";
            event.dispatchEvent(new Event("mouseover"));
            event.style = "color: none; font-weight: none;";
            // event.dispatchEvent(new Event("mouseout"));
        }, index * 100);
    });
}

function highlight_holidays_in_adns_calendar() {
    if (CALENDAR_MODE == 2) {
        console.info("No separate holiday box in BS Calendar");
        return;
    }
    var public_holiday_dom = document.getElementById("public_holiday_box").childNodes;
    var public_holiday_events = [].filter.call(public_holiday_dom, function(el) {
        return el.id.includes('_PH');
    });

    public_holiday_events.forEach(event => {
        var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
        event.addEventListener("mouseover", (e) => {
            event.style = "color: darkgoldenrod; font-weight: bolder;";
            if (corresponding_td.classList.contains('national_holiday')) {
                corresponding_td.style = "background-color: pink !important; border-color: black;";
            }
            else if (corresponding_td.classList.contains('specific_holiday')) {
                corresponding_td.style = "background-color: #D1EAF0 !important; border-color: black;";
            }
            else {
                console.warn("Unexpected Error Occured");
            }
        });

        event.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                event.style = "color: none; font-weight: none;";
                corresponding_td.style = "background-color: none; border-color: none;";
            }, 250);
        });
    });

    var public_holiday_dom_title = public_holiday_dom[0];
    // parvas_title.addEventListener("mouseover", (e) => {
    //     setTimeout(() => {
    //         parvas_span_events.forEach(event => {
    //             var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
    //             corresponding_td.style = "background-color: gold !important; border-color: black;";
    //         });
    //     }, 250);
    // });
    public_holiday_dom_title.addEventListener("mouseout", (e) => {
        public_holiday_events.forEach(event => {
            var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
            corresponding_td.style = "background-color: none; border-color: none;";
        });
    });
}

function highlight_ph_events() {
    if (CALENDAR_MODE == 2) {
        console.info("No separate holiday box in BS Calendar");
        return;
    }
    var public_holiday_dom = document.getElementById("public_holiday_box").childNodes;
    var public_holiday_events = [].filter.call(public_holiday_dom, function(el) {
        return el.id.includes('_PH');
    });

    public_holiday_events.forEach(function (event, index) {
        setTimeout(() => {
            event.style = "color: darkgoldenrod; font-weight: none;";
            event.dispatchEvent(new Event("mouseover"));
            event.style = "color: none; font-weight: none;";
            // event.dispatchEvent(new Event("mouseout"));
        }, index * 100);
    });
}

function init_anim() {
    var total_parvas_count = 0;
    var parvas_dom = document.getElementById("parvas").childNodes;
    var parvas_span_events = [].filter.call(parvas_dom, function(el) {
        return el.id.includes('_events');
    });

    parvas_span_events.forEach(function (event, index) {
        setTimeout(() => {
            event.dispatchEvent(new Event("mouseover"));
            event.dispatchEvent(new Event("mouseout"));
        }, index * 75);
        total_parvas_count = index;
    });

    if(CALENDAR_MODE != 2) {
        var holiday_dom = document.getElementById("public_holiday_box").childNodes;
        var holiday_span_events = [].filter.call(holiday_dom, function(el) {
            return el.id.includes('_PH');
        });

        holiday_span_events.forEach(function (event, index) {
            setTimeout(() => {
                event.dispatchEvent(new Event("mouseover"));
                event.dispatchEvent(new Event("mouseout"));
            }, (total_parvas_count + index) * 75);
        });
    }
}