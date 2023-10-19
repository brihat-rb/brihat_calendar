let lang = CALENDAR_MODE == 2 ? "np" : "en";

let in_nep = lang == "np";

let year_hand = document.getElementById('clockyear');
let time_type = document.getElementById('timetype');

let hour = document.getElementById('hour');
let minute = document.getElementById('minute');
let second = document.getElementById('second');

let rev_hour = document.getElementById('rev_hour');
let rev_minute = document.getElementById('rev_minute');
let rev_second = document.getElementById('rev_second');

let digital_div = document.getElementById('digital');
let hour_span = document.getElementById('digital_hour');
let minute_span = document.getElementById('digital_minute');
let second_span = document.getElementById('digital_second');

function days_of_year(date) {
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / (24 * 60 * 60 * 1000);
}

function days_of_year_bs(ad_year, ad_month, ad_date) {
    let today_bs = convert_ad_to_bs(ad_year, ad_month, ad_date).split(" ");
    let today_date_bs_in_ad = Date.UTC(ad_year, ad_month, ad_date);
    let start_date_bs_in_ad = Date.UTC(...convert_bs_to_ad(today_bs[0], 1, 1).split(" "));
    return (today_date_bs_in_ad - start_date_bs_in_ad) / (24 * 60 * 60 * 1000);
}

function toggle_lang() {
    clearInterval(intervalID);
    clearInterval(innerIntervalID);

    lang = (lang == "np") ? "en" : "np";
    in_nep = lang == "np";

    Array.from(document.getElementsByClassName('hand')).forEach((elem) => elem.classList.add('iniani'));
    Array.from(document.getElementsByClassName('handrev')).forEach((elem) => elem.classList.add('iniani'));

    displayTime(true);

    intervalID = setTimeout(function () {
        Array.from(document.getElementsByClassName('hand')).forEach((elem) => elem.classList.remove('iniani'));
        Array.from(document.getElementsByClassName('handrev')).forEach((elem) => elem.classList.remove('iniani'));
        innerIntervalID = setInterval(function () { displayTime(true); }, 25);
    }, 1000);
}

function displayTime(skip_lang_check = false) {
    if (!skip_lang_check) {
        lang = CALENDAR_MODE == 2 ? "np" : "en";
        in_nep = lang == "np";
    }

    time_type.innerHTML = in_nep ? "LOCAL" : "UTC";

    let time_span = document.getElementsByClassName("clocktime");
    for (var i = 0; i < time_span.length; i++) {
        time_span[i].childNodes[0].innerText = in_nep ? arabic_numbertext_to_nepali(time_span[i].childNodes[0].innerText) : i + 1;
    }

    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let mmss = date.getMilliseconds();
    let year = date.getFullYear();
    let month = date.getMonth();
    let ddate = date.getDate();
    let yearly_days = days_of_year(date);
    let leap_year = is_leap_year(year);

    let utc_hh = date.getUTCHours();
    let utc_mm = date.getUTCMinutes();
    let utc_ss = date.getUTCSeconds();
    let utc_mmss = date.getUTCMilliseconds();

    let bs_date = convert_ad_to_bs(year, month, ddate).split(" ");

    hour_span.innerHTML = in_nep ? hh.toString().padStart(2, "0") : utc_hh.toString().padStart(2, "0");
    minute_span.innerHTML = in_nep ? mm.toString().padStart(2, "0") : utc_mm.toString().padStart(2, "0");
    second_span.innerHTML = in_nep ? ss.toString().padStart(2, "0") : utc_ss.toString().padStart(2, "0");

    if (in_nep) {
        hour_span.style.fontFamily = "Laila";
        minute_span.style.fontFamily = "Laila";
        second_span.style.fontFamily = "Laila";
        hour_span.innerHTML = arabic_numbertext_to_nepali(hh.toString().padStart(2, "0"));
        minute_span.innerHTML = arabic_numbertext_to_nepali(mm.toString().padStart(2, "0"));
        second_span.innerHTML = arabic_numbertext_to_nepali(ss.toString().padStart(2, "0"));
        Array.from(document.getElementsByClassName('num')).forEach((elem) => elem.childNodes[0].innerText = arabic_numbertext_to_nepali(elem.childNodes[0].innerText));
    }

    let h_rotation = in_nep ? 30 * hh + mm / 2 + ss / 120 + mmss / 120000 : 30 * utc_hh + utc_mm / 2 + utc_ss / 120 + utc_mmss / 120000;
    let m_rotation = in_nep ? 6 * mm + ss / 10 + mmss / 10000 : 6 * utc_mm + utc_ss / 10 + utc_mmss / 10000;
    let s_rotation = in_nep ? 6 * ss + (mmss * 3) / 500 : 6 * utc_ss + (utc_mmss * 3) / 500;

    let y_rotation = leap_year ? yearly_days / 366 * 360 : yearly_days / 365 * 360;
    if (in_nep) {
        y_rotation = (days_of_year_bs(year, month + 1, ddate) / BS_CALENDAR_DATA[bs_date[0]][12]) * 360;
    }
    y_rotation += (hh / (24 * 365) + mm / (24 * 60 * 365)) * 360;

    year_hand.style.transform = `rotate(${y_rotation}deg)`;

    hour.style.transform = `rotate(${h_rotation}deg)`;
    rev_hour.style.transform = `rotate(${h_rotation + 180}deg)`;
    minute.style.transform = `rotate(${m_rotation}deg)`;
    rev_minute.style.transform = `rotate(${m_rotation + 180}deg)`;
    second.style.transform = `rotate(${s_rotation}deg)`;
    rev_second.style.transform = `rotate(${s_rotation + 180}deg)`;
}

displayTime(false);

let innerIntervalID = null;

let intervalID = setTimeout(function () {
    Array.from(document.getElementsByClassName('hand')).forEach((elem) => elem.classList.remove('iniani'));
    Array.from(document.getElementsByClassName('handrev')).forEach((elem) => elem.classList.remove('iniani'));
    innerIntervalID = setInterval(function () { displayTime(false); }, 25);
}, 1000);
