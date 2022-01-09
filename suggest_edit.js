/* * REQUIRES: infos.js * */
/* https://postmail.invotes.com/accounts/manage/fe14f97c-1ff4-4f36-85cd-f1439c420d2b */

//update this with your js_form selector
var form_id_js = "javascript_form";
document.getElementById(form_id_js).style.display = "none";

var sendButton = document.getElementById("js_send");

var data_js = {
  "access_token": "g859n4ejmvwrzmgy8pgisx8l"
};

function show_suggest_form() {
  document.getElementById(form_id_js).style.display = "flex";
}

function js_onSuccess() {
  console.info("Suggestion sent successfully.");
  sendButton.value='SENT';
  document.getElementById(form_id_js).style.display = "none";
  document.getElementById("suggestion_info").innerHTML = "Suggestion sent successfully.";
}

function js_onError(error) {
  sendButton.value='SENDING ERROR';
  document.getElementById(form_id_js).style.display = "none";
  document.getElementById("suggestion_info").innerHTML = error;
  // console.log(error);
}

function js_send() {
  sendButton.value = 'SENDING...';
  sendButton.disabled = true;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      js_onSuccess();
    }
    else
      if(request.readyState == 4) {
        js_onError(request.response);
      }
  };

  var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
  var message = document.querySelector("#" + form_id_js + " [name='text']").value;
  message = document.getElementById("modal_title").textContent + "\n" + message;

  var user_info = "n/a";
  var user_info_reg = new XMLHttpRequest();
  var url = 'https://ipinfo.io/json';
  user_info_reg.open('GET', url, false);
  user_info_reg.onload = function() {
    response = JSON.parse(this.response);
    user_info = "User IP: " + response.ip + "\n";
    user_info += "Country: " + response.country + "\n";
    user_info += "GeoLocation: " + response.loc + "\n";
    user_info += "ISP: " + response.org + "\n";
  }
  user_info_reg.onerror = function() {
    console.log(this.response);
  }
  user_info_reg.send();

  var device_info = "Sent from\nBrowser: " + navigator.get_browser_info + "\n";
  device_info += "OS: " + navigator.get_os_info;
  data_js['subject'] = subject;
  data_js['text'] = message + "\n\n" + user_info + "\n" + device_info;
  var params = toParams(data_js);

  request.open("POST", "https://postmail.invotes.com/send", true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(params);
  return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
  var form_data = [];
  for ( var key in data_js ) {
      form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
  }
  return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
  e.preventDefault();
});
