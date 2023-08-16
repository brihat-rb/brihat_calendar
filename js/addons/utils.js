function highlight_event_in_calendar() {
    var parvas_dom = document.getElementById("parvas").childNodes;
    var parvas_span_events = [].filter.call(parvas_dom, function(el) {
        return el.id.includes('events');
    });

    parvas_span_events.forEach(event => {
        var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
        event.addEventListener("mouseover", (e) => {
            event.style = "color: darkgoldenrod; font-weight: bolder;";
            corresponding_td.style = "background-color: gold; border-color: black;";
        });

        event.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                event.style = "color: none; font-weight: none;";
                corresponding_td.style = "background-color: none; border-color: none;";
            }, 250);
        });
    });

    var parvas_title = parvas_dom[0];
    parvas_title.addEventListener("mouseover", (e) => {
        setTimeout(() => {
            parvas_span_events.forEach(event => {
                var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
                corresponding_td.style = "background-color: gold; border-color: black;";
            });

        }, 250);
    });
    parvas_title.addEventListener("mouseout", (e) => {
        parvas_span_events.forEach(event => {
            var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
            corresponding_td.style = "background-color: none; border-color: none;";
        });
    });
}