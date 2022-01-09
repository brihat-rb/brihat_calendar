// very important
const BASE_BS_YEAR = 1975
const BASE_BS_MONTH = 1
const BASE_BS_DATE = 1

const BASE_AD_YEAR_FOR_BS = 1918
const BASE_AD_MONTH_FOR_BS = 4
const BASE_AD_DATE_FOR_BS = 13

const BASE_AD_OFFSET_FOR_BS = 102

const BS_MONTHS = ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];

function is_leap_year(year) {
    // checks whether given AD year is leap year or not
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}


function verify_bs_date(year, month, date) {
    // verify given nepali date
    try {
      max_date = BS_CALENDAR_DATA[year][month-1];
    }
    catch(err) {
      return false;
    }
    if (date <= max_date) {
      return true;
    }
    return false;
}


function convert_bs_to_ad(bs_year, bs_month, bs_date, message) {
    // this function converts BS date to AD
    // input: bs_year, bs_month, bs_date - int
    // returns: tuple (ad_year, ad_month, ad_date)

    is_valid_date = verify_bs_date(bs_year, bs_month, bs_date)
    if (!is_valid_date) {
      if (message == "") {
        alert(arabic_number_to_nepali(bs_year) + " " + BS_MONTHS_NEP[bs_month - 1] + " मा " + arabic_number_to_nepali(bs_date) + " दिन छैन");
      }
      else {
        alert("BS Range Invalid. Valid Range: [1975 - 2100]");
      }
      return;
    }


    let total_bs_days = 0
    let year = BASE_BS_YEAR;

    // using num of days in each month
    // for (year = BASE_BS_YEAR; year < bs_year; year++) {
    //    for (let month = 0; month < 12; month++) {
    //        total_bs_days += BS_CALENDAR_DATA[year][month]
    //    }
    // }

    // using num of days in given year (last element of value in BS_CALENDAR_DATA)
    for ( ; year < bs_year; year++) {
        total_bs_days += BS_CALENDAR_DATA[year][12]
    }
    // console.log(total_bs_days)

    for (let month = 0; month < bs_month - 1; month++) {
        total_bs_days += BS_CALENDAR_DATA[year][month]
    }
    // console.log(total_bs_days)

    total_bs_days += bs_date - 1
    // console.log(total_bs_days)

    let res_ad_year = BASE_AD_YEAR_FOR_BS
    let res_ad_month = BASE_AD_MONTH_FOR_BS
    let res_ad_date = BASE_AD_DATE_FOR_BS

    while(total_bs_days > 0) {
        if(is_leap_year(res_ad_year)) {
            if(res_ad_date < LEAP_DAYS_LIST[res_ad_month-1]) {
                res_ad_date += 1
                total_bs_days -= 1
            }
            else {
                res_ad_month += 1
                res_ad_date = 0
                if(res_ad_month > 12) {
                    res_ad_year += 1
                    res_ad_month = 1
                }
            }
        }
        else {
            if(res_ad_date < DAYS_LIST[res_ad_month-1]) {
                res_ad_date += 1
                total_bs_days -= 1
            }
            else {
                res_ad_month += 1
                res_ad_date = 0
                if(res_ad_month > 12) {
                    res_ad_year += 1
                    res_ad_month = 1
                }
            }
        }
    }

    // console.log(total_bs_days)
    return res_ad_year + " " + res_ad_month + " " + res_ad_date;
}

function convert_ad_to_bs(ad_year, ad_month, ad_date) {
    // this function converts AD date to BS
    // input: ad_year, ad_month, ad_date - int
    // returns: tuple (bs_year, bs_month, bs_date)

	if (ad_year < BASE_AD_YEAR_FOR_BS || ad_year == BASE_AD_YEAR_FOR_BS && ad_month < BASE_AD_MONTH_FOR_BS || ad_year == BASE_AD_YEAR_FOR_BS && ad_month == BASE_AD_MONTH_FOR_BS && ad_date < BASE_AD_DATE_FOR_BS) {
		alert("Supported date range " + BASE_AD_YEAR_FOR_BS + "-" + BASE_AD_MONTH_FOR_BS + "-" + BASE_AD_DATE_FOR_BS + " to 2044-4-15");
		return;
	}

	if (ad_year > 2044 || ad_year == 2044 && ad_month > 4 || ad_year == 2044 && ad_month == 4 && ad_date > 15) {
    alert("Supported date range " + BASE_AD_YEAR_FOR_BS + "-" + BASE_AD_MONTH_FOR_BS + "-" + BASE_AD_DATE_FOR_BS + " to 2044-4-15");
		return;
	}

    let total_ad_days = 0

    for (let year = BASE_AD_YEAR_FOR_BS; year < ad_year; year++) {
        if(is_leap_year(year))
            total_ad_days += 366
        else
            total_ad_days += 365
    }
    // console.log(total_ad_days)

    for (let month = 0; month < ad_month - 1; month++) {
        if(is_leap_year(ad_year))
            total_ad_days += LEAP_DAYS_LIST[month]
        else
            total_ad_days += DAYS_LIST[month]
    }
    // console.log(total_ad_days)

    total_ad_days += ad_date - 1
    total_ad_days -= BASE_AD_OFFSET_FOR_BS
    // console.log(total_ad_days)

    let res_bs_year = BASE_BS_YEAR
    let res_bs_month = BASE_BS_MONTH
    let res_bs_date = BASE_BS_DATE

    while(total_ad_days > 0) {
        if(res_bs_date < BS_CALENDAR_DATA[res_bs_year][res_bs_month-1]) {
            res_bs_date += 1
            total_ad_days -= 1
        }
        else {
            res_bs_month += 1
            res_bs_date = 0
            if(res_bs_month > 12) {
                res_bs_year += 1
                res_bs_month = 1
            }
        }
    }
    // console.log(total_ad_days)

    return res_bs_year + " " + res_bs_month + " " + res_bs_date;
}
