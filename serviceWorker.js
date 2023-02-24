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
  "./data/2079_lunar_data.json",
  "./data/2080_lunar_data.json",
  "./data/sunrise_sunset_json/sunrise_2019.json",
  "./data/sunrise_sunset_json/sunrise_2020.json",
  "./data/sunrise_sunset_json/sunrise_2021.json",
  "./data/sunrise_sunset_json/sunrise_2022.json",
  "./data/sunrise_sunset_json/sunrise_2023.json",
  "./data/sunrise_sunset_json/sunrise_2024.json",
  "./data/sunrise_sunset_json/sunrise_2025.json",
  "./data/sunrise_sunset_json/sunset_2019.json",
  "./data/sunrise_sunset_json/sunset_2020.json",
  "./data/sunrise_sunset_json/sunset_2021.json",
  "./data/sunrise_sunset_json/sunset_2022.json",
  "./data/sunrise_sunset_json/sunset_2023.json",
  "./data/sunrise_sunset_json/sunset_2024.json",
  "./data/sunrise_sunset_json/sunset_2025.json",
  "./data/muhoortta.json",
  "./data/public_holidays_in_nepal.json",
  "./assets/favicon.svg",
  "./assets/logo.svg",
  "./assets/watermark.svg",
  "./assets/brihat_calendar_url_qr.svg",
  "./assets/static_logo.svg",
  "./assets/brihat_calendar.png",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",
  "./css/index.css",
  "./css/index_details.css",
  "./css/index_cal_conv.css",
  "./css/public_holidays.css",
  "./css/muhoortta.css",
  "./css/parvas.css",
  "./css/settings.css",
  "./js/base/NS.js",
  "./js/base/NS_AD.js",
  "./js/base/NS_BS.js",
  "./js/base/AD_BS.js",
  "./js/calendar/index.js",
  "./js/calendar/index_cal_conv.js",
  "./js/calendar/index_details.js",
  "./js/addons/infos.js",
  "./js/addons/muhoortta.js",
  "./js/addons/parvas.js",
  "./js/addons/public_holidays.js",
  "./js/addons/suggest_edit.js",
  "./js/addons/swipe_actions.js",
  "./index.html",
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
