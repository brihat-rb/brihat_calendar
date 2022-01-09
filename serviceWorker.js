const staticBrihatCalendar = "brihat-calendar-v1";
const assets = [
  "./",
  "./data/2070_lunar_data.json",
  "./data/2071_lunar_data.json",
  "./data/2072_lunar_data.json",
  "./data/2073_lunar_data.json",
  "./data/2074_lunar_data.json",
  "./data/2075_lunar_data.json",
  "./data/2076_lunar_data.json",
  "./data/2077_lunar_data.json",
  "./data/2078_lunar_data.json",
  "./data/public_holidays_in_nepal.json",
  "./favicon.svg",
  "./logo.svg",
  "./watermark.svg",
  "./brihat_calendar_url_qr.svg",
  "./static_logo.svg",
  "./brihat_calendar.png",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",
  "./index.css",
  "./index_details.css",
  "./index_cal_conv.css",
  "./public_holidays.css",
  "./NS.js",
  "./NS_AD.js",
  "./NS_BS.js",
  "./AD_BS.js",
  "./public_holidays.js",
  "./index.js",
  "./index_cal_conv.js",
  "./index_details.js",
  "./infos.js",
  "./suggest_edit.js",
  "./swipe_actions.js",
  "./brihat_calendar.html",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticBrihatCalendar).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
