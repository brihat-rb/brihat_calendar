/**
 * Solar NS to BS and BS to Solar NS Converter (part of Brihat Calendar)
 * Copyright (C) 2022  Brihat Ratna Bajracharya
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 * 
**/

/* REQUIRES: NS.js */

const BS_CALENDAR_DATA = {
    '1975': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1976': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1977': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '1978': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1979': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1980': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1981': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '1982': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1983': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1984': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1985': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '1986': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1987': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1988': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '1989': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1990': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1991': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '1992': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '1993': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1994': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1995': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '1996': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '1997': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1998': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '1999': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2000': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2001': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2002': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2003': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2004': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2005': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2006': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2007': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2008': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2009': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2010': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2011': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2012': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2013': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2014': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2015': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2016': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2017': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2018': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2019': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2020': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2021': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2022': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2023': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2024': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2025': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2026': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2027': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2028': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2029': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2030': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2031': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2032': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2033': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2034': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2035': [ 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2036': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2037': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2038': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2039': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2040': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2041': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2042': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2043': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2044': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2045': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2046': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2047': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2048': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2049': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2050': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2051': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2052': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2053': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2054': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2055': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2056': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2057': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2058': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
    '2059': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2060': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2061': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2062': [ 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365 ],
    '2063': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2064': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2065': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2066': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
    '2067': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2068': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2069': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2070': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
    '2071': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2072': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2073': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
    '2074': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2075': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2076': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2077': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2078': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2079': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
    '2080': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
    '2081': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
    '2082': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2083': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2084': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2085': [ 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2086': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2087': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2088': [ 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365 ],
    '2089': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2090': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2091': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
    '2092': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
    '2093': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2094': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
    '2095': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366 ],
    '2096': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
    '2097': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
    '2098': [ 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31, 365 ],
    '2099': [ 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365 ],
    '2100': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ]
}

// very important
const BASE_NS_YEAR_FOR_BS = 1039;
const BASE_NS_MONTH_FOR_BS = 1;
const BASE_NS_DATE_FOR_BS = 1;

const BASE_BS_YEAR_FOR_NS = 1975;
const BASE_BS_MONTH_FOR_NS = 7;
const BASE_BS_DATE_FOR_NS = 4;

const BASE_BS_OFFSET = 190;

const BS_MONTHS_ENG = ["Baisakh", "Jestha", "Ashad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
const BS_MONTHS_NEP = ["वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्र", "आश्विन", "कार्तिक", "मंसिर", "पौष", "माघ", "फाल्गुण", "चैत्र"];
const BS_MONTHS_NEP_SHORT = ["वै.", "ज्ये.", "आ.", "श्रा.", "भा.", "आ.", "का.", "मं.", "पौ.", "मा.", "फा.", "चै."];

/* * HELPER Functions * */
function get_last_date_bs(bs_year, bs_month) {
    // returns last date for given BS year and month
    return BS_CALENDAR_DATA[bs_year.toString()][bs_month - 1];
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

/* * CONVERTER FUNCITONS * */
function convert_bs_to_ns(bs_year, bs_month, bs_date) {
    // this function converts BS date to NS
    // input: bs_year, bs_month, bs_date - int
    // returns: STRING ns_year ns_month ns_date

    is_valid_date = verify_bs_date(bs_year, bs_month, bs_date)
    if (!is_valid_date) {
        alert("वि. सं. " + arabic_number_to_nepali(bs_year) + " " + BS_MONTHS_NEP[bs_month - 1] + " मा " + arabic_number_to_nepali(bs_date) + " दिन छैन");
      return;
    }

    let total_bs_days = 0
    let year = BASE_BS_YEAR_FOR_NS;

    // using num of days in each month
    // for (year = BASE_BS_YEAR_FOR_NS; year < bs_year; year++) {
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
    total_bs_days -= BASE_BS_OFFSET
    // console.log(total_bs_days)

    let res_ns_year = BASE_NS_YEAR_FOR_BS
    let res_ns_month = BASE_NS_MONTH_FOR_BS
    let res_ns_date = BASE_NS_DATE_FOR_BS

    while(total_bs_days > 0) {
        if(is_leap_year(res_ns_year + NS_AD_OFFSET)) {
            if(res_ns_date < NS_DAYS_IN_MONTH_LEAP[res_ns_month-1]) {
                res_ns_date += 1
                total_bs_days -= 1
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
                total_bs_days -= 1
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

    // console.log(total_bs_days)
    return res_ns_year + " " + res_ns_month + " " + res_ns_date;
}

function convert_ns_to_bs(ns_year, ns_month, ns_date) {
    // this function converts NS date to BS
    // input: ns_year, ns_month, ns_date - int
    // returns: STRING: bs_year, bs_month, bs_date

  	if (ns_year < BASE_NS_YEAR_FOR_BS || ns_year == BASE_NS_YEAR_FOR_BS && ns_month < BASE_NS_MONTH_FOR_BS || ns_year == BASE_NS_YEAR_FOR_BS && ns_month == BASE_NS_MONTH_FOR_BS && ns_date < BASE_NS_DATE_FOR_BS) {
  		alert("Supported date range: Solar NS " + BASE_NS_YEAR_FOR_BS + "-" + BASE_NS_MONTH_FOR_BS + "-" + BASE_NS_DATE_FOR_BS + " to Solar NS 1164-6-29");
  		return;
  	}

  	if (ns_year > 1164 || ns_year == 1164 && ns_month > 6 || ns_year == 1164 && ns_month == 6 && ns_date > 29) {
      alert("Supported date range: Solar NS " + BASE_NS_YEAR_FOR_BS + "-" + BASE_NS_MONTH_FOR_BS + "-" + BASE_NS_DATE_FOR_BS + " to Solar NS 1164-6-29");
  		return;
  	}


    let is_valid_date = verify_ns_date(ns_year, ns_month, ns_date);
    if (!is_valid_date) {
        alert(" सौ. ने. सं. " + arabic_number_to_nepali(ns_year) + " " + NS_NEP[ns_month - 1] + " मा " + arabic_number_to_nepali(ns_date) + " दिन छैन");
        return;
    }

    let total_ns_days = 0

    for (let year = BASE_NS_YEAR_FOR_BS; year < ns_year; year++) {
        if(is_leap_year(year + NS_AD_OFFSET))
            total_ns_days += 366
        else
            total_ns_days += 365
    }
    // console.log(total_ns_days)

    for (let month = 0; month < ns_month - 1; month++) {
        if(is_leap_year(ns_year))
            total_ns_days += NS_DAYS_IN_MONTH_LEAP[month]
        else
            total_ns_days += NS_DAYS_IN_MONTH[month]
    }
    // console.log(total_ns_days)

    total_ns_days += ns_date - 1
    // console.log(total_ns_days)

    let res_bs_year = BASE_BS_YEAR_FOR_NS
    let res_bs_month = BASE_BS_MONTH_FOR_NS
    let res_bs_date = BASE_BS_DATE_FOR_NS

    while(total_ns_days > 0) {
        if(res_bs_date < BS_CALENDAR_DATA[res_bs_year][res_bs_month-1]) {
            res_bs_date += 1
            total_ns_days -= 1
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
    // console.log(total_ns_days)

    return res_bs_year + " " + res_bs_month + " " + res_bs_date;
}
