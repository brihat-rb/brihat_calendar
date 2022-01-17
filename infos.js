var info_div = document.getElementById("g_info");
function recordData (response) {
	info_div.innerHTML = "<div id='user_ip'>" + response.ip + " (" + response.country + ")"+ "</div>";
  info_div.innerHTML += "<div id='user_isp'><b>" + response.org + "</b></div>";
  info_div.innerHTML += "<div id='user_location'>" + response.loc + "</div>";
}

// https://stackoverflow.com/questions/2400935/browser-detection-in-javascript
navigator.get_browser_info = (function(){
    var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)[.(\d)]+/gi) || [];
    if (/trident/i.test(M[0])) {
        tem = /\brv[ :]+(\d+)[.\d+]+/g.exec(ua) || [];
        return 'Internet Explorer ' + (tem[0] || '');
    }
    if (/chrome/i.test(M[0])) {
        tem = ua.match(/\b(OPR|Edg?)\/(\d+)[.(\d)]+/);
        if (tem != null) {
          return tem[0].replace('OPR', 'Opera').replace('Edg', 'Edge');
        }
    }
    return M[0];
})();

// https://stackoverflow.com/questions/38241480/detect-macos-ios-windows-android-and-linux-os-with-js
navigator.get_os_info = (function() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
    // NEED TO IMPLEMENT MORE HERE
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    // os = 'iOS';
    os = userAgent.match(/(ipad|iphone|ipod).+?(?=\))/i)[0];
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    // os = 'Windows';
    os = userAgent.match(/windows.+?(?=\))/i)[0];
  } else if (/Android/.test(userAgent)) {
    // os = 'Android';
    os = userAgent.match(/android\s([0-9\.]*)/i)[0];
    document.getElementById("app_open_link").style.display = "block";
  } else if (!os && /Linux/.test(platform)) {
    os = userAgent.match(/linux.+?(?=\))/i)[0];
  }
  return os;
})();

var browser_info = navigator.get_browser_info;
var os_info = navigator.get_os_info;

user_info_div = document.getElementById("user_info");

user_info_div.innerHTML = "<div id='browser'><b>" + browser_info + "</b></div>";
user_info_div.innerHTML += "<div id='os'><b>" + os_info + "</b></div>";
