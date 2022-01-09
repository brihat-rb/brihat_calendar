/* REQUIRES: NS.js */

const BASE_NS_YEAR = 1
const BASE_NS_MONTH = 1
const BASE_NS_DATE = 1

const BASE_AD_YEAR = 880
const BASE_AD_MONTH = 10
const BASE_AD_DATE = 20

const BASE_AD_OFFSET = 293

const LEAP_DAYS_LIST = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_LIST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const AD_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const AD_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NEPALI_DIGITS = ['०','१','२','३','४','५','६','७','८','९'];

const NEPALI_DAYS = ["आइतबार", "सोमबार", "मंगलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार"];
const ENGLISH_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const ENGLISH_DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* * CONVERTER FUNCTIONS * */
function convert_ns_to_ad(ns_year, ns_month, ns_date) {
    // this function converts NS date to AD
    // input: ns_year, ns_month, ns_date - int
    // returns: STRING: ad_year ad_month ad_date

    is_valid_date = verify_ns_date(ns_year, ns_month, ns_date)
    if (!is_valid_date) {
        alert("सौ. ने. सं. " + arabic_number_to_nepali(ns_year) + " " + NS_NEP[ns_month - 1] + " मा " + arabic_number_to_nepali(ns_date) + " दिन छैन");
        return;
    }

    let total_ns_days = 0

    for (let year = BASE_NS_YEAR; year < ns_year; year++) {
        if(is_leap_year(year + NS_AD_OFFSET))
            total_ns_days += 366
        else
            total_ns_days += 365
    }

    for (let month = 0; month < ns_month - 1; month++) {
        if(is_leap_year(ns_year + NS_AD_OFFSET))
            total_ns_days += NS_DAYS_IN_MONTH_LEAP[month]
        else
            total_ns_days += NS_DAYS_IN_MONTH[month]
    }

    total_ns_days += ns_date - 1
    // console.log(total_ns_days)

    let res_ad_year = BASE_AD_YEAR
    let res_ad_month = BASE_AD_MONTH
    let res_ad_date = BASE_AD_DATE

    while(total_ns_days > 0) {
        if(is_leap_year(res_ad_year)) {
            if(res_ad_date < LEAP_DAYS_LIST[res_ad_month-1]) {
                res_ad_date += 1
                total_ns_days -= 1
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
                total_ns_days -= 1
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

    // console.log(total_ns_days)
    return res_ad_year + " " + res_ad_month + " " + res_ad_date;
}


function convert_ad_to_ns(ad_year, ad_month, ad_date) {
    // this function converts AD date to NS
    // input: ad_year, ad_month, ad_date - int
    // returns: STEING: ns_year ns_month ns_date

	if (ad_year < BASE_AD_YEAR || ad_year == BASE_AD_YEAR && ad_month < BASE_AD_MONTH || ad_year == BASE_AD_YEAR && ad_month == BASE_AD_MONTH && ad_date < BASE_AD_DATE) {
		alert("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH + "-" + BASE_AD_DATE + " to 2044-4-15");
		return;
	}

	if (ad_year > 2044 || ad_year == 2044 && ad_month > 4 || ad_year == 2044 && ad_month == 4 && ad_date > 15) {
    alert("Supported date range " + BASE_AD_YEAR + "-" + BASE_AD_MONTH + "-" + BASE_AD_DATE + " to 2044-4-15");
		return;
	}

    let total_ad_days = 0

    for (let year = BASE_AD_YEAR; year < ad_year; year++) {
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
    total_ad_days -= BASE_AD_OFFSET
    // console.log(total_ad_days)

    let res_ns_year = BASE_NS_YEAR
    let res_ns_month = BASE_NS_MONTH
    let res_ns_date = BASE_NS_DATE

    while(total_ad_days > 0) {
        if(is_leap_year(res_ns_year + NS_AD_OFFSET)) {
            if(res_ns_date < NS_DAYS_IN_MONTH_LEAP[res_ns_month-1]) {
                res_ns_date += 1
                total_ad_days -= 1
            }
            else {
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12) {
                    res_ns_year += 1
                    res_ns_month = 1
                }
            }
        }
        else {
            if(res_ns_date < NS_DAYS_IN_MONTH[res_ns_month-1]) {
                res_ns_date += 1
                total_ad_days -= 1
            }
            else {
                res_ns_month += 1
                res_ns_date = 0
                if(res_ns_month > 12) {
                    res_ns_year += 1
                    res_ns_month = 1
                }
            }
        }
    }
    // console.log(total_ns_days)

    return res_ns_year + " " + res_ns_month + " " + res_ns_date;
}
