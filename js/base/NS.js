/**
 * Basic functions (part of Brihat Calendar)
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

/* BASE Script */

const NS_ENG = ["Kachhalā", "Thinlā", "Ponhelā", "Sillā", "Chillā", "Chaulā", "Bachhalā", "Tachhalā", "Dillā", "Gunlā", "Yanlā", "Kaulā"];
const NS_NEP = ["कछला", "थिंला", "प्वँहेला", "सिल्ला", "चिल्ला", "चौला", "बछला", "तछला", "दिल्ला", "गुँला", "ञला", "कौला"];
const NS_NEP_SHORT = ["क.", "थिं.", "प्वँ.", "सि.", "चि.", "चौ.", "ब.", "त.", "दि.", "गुँ.", "ञ.", "कौ."];

const NS_DAYS_IN_MONTH = [30, 30, 30, 30, 30, 29, 31, 31, 31, 31, 31, 31];
const NS_DAYS_IN_MONTH_LEAP = [30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31];

const NS_DAYS = ["आइतबाः", "सोमबाः", "मङ्लबाः", "बुधबाः", "बिहिबाः", "सुक्रबाः", "सनिबाः"];

const NS_AD_OFFSET = 880;

function verify_ns_date(year, month, date) {
    // verify given NS date
    try {
      if (is_leap_year(year + NS_AD_OFFSET)) {
        max_date = NS_DAYS_IN_MONTH_LEAP[month-1];
      }
      else {
        max_date = NS_DAYS_IN_MONTH[month-1];
      }
    }
    catch(err) {
      return false;
    }
    if (date <= max_date) {
      return true;
    }
    return false;
}

function get_last_date_ns(ns_year, ns_month) {
    // returns last date for given NS year and month
    if (is_leap_year(ns_year + NS_AD_OFFSET)) {
        return NS_DAYS_IN_MONTH_LEAP[ns_month - 1];
    }
    else {
      return NS_DAYS_IN_MONTH[ns_month - 1];
    }
}

function get_total_days_in_ns_month(ns_month, ns_year) {
    // check how many days in a month
    let is_year_leap = is_leap_year(ns_year + NS_AD_OFFSET);
    if (is_year_leap) {
      return NS_DAYS_IN_MONTH_LEAP[ns_month - 1];
    }
    else {
      return NS_DAYS_IN_MONTH[ns_month - 1];
    }
}

function arabic_number_to_nepali(number){
    // converts given number to devanagari number
    number = number.toString();
    let nepali_number = "";
    for(let i = 0; i < number.length; i++) {
        nepali_number += NEPALI_DIGITS[parseInt(number.charAt(i))];
    }
    return nepali_number;
}

function arabic_numbertext_to_nepali(number){
  // converts given number to devanagari number
  number = number.toString();
  let nepali_number_text = "";
  for(let i = 0; i < number.length; i++) {
      if(["1","2","3","4","5","6","7","8","9","0"].includes(number[i])){
        nepali_number_text += NEPALI_DIGITS[parseInt(number.charAt(i))];
      }
      else {
        nepali_number_text += number.charAt(i);
      }
  }
  return nepali_number_text;
}

function is_leap_year(year) {
    // checks whether given AD year is leap year or not
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0
}
