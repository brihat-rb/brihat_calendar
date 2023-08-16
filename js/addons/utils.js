function highlight_event_in_calendar() {
    console.log("called");
    var parvas_dom = document.getElementById("parvas").childNodes;

    var parvas_span_events = [].filter.call(parvas_dom, function(el) {
    return el.id.includes('events');
  });

  parvas_span_events.forEach(event => {
      var corresponding_td = document.getElementById(event.id.slice(0, 10)).parentNode.parentNode;
        event.addEventListener("mouseover", (e) => {
            corresponding_td.style = "background-color: gold; border-color: black;";
        });

        event.addEventListener("mouseout", (e) => {
            setTimeout(() => {
                corresponding_td.style = "background-color: none; border-color: none;";
            }, 200);
        });
  });
}