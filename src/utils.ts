function getLanguageName(langCode: string) {
    return langCode ? langList[langCode] : '';
}

const langList: Record<string, string> = {
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  fr: 'French',
  de: 'German',
  ru: 'Russian',
  nl: 'Dutch',
  zh: 'Chinese',
  hu: 'Hungarian',
  he: 'Hebrew',
  ar: 'Arabic',
  pl: 'Polish',
  ro: 'Romanian',
  jp: 'Japanese',
  kr: 'Korean',
};

function getUserAge(birthdate: string) {
  const date = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - date.getFullYear();
  const monthDifference = today.getMonth() - date.getMonth();
  const dayDifference = today.getDate() - date.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const ordinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}

// convert 'yyyy/mm/dd' dates to 'dd/mm/yyyy' format
function flipDayAndYear(date: Date) {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return day + '-' + month + '-' + year;
}

const languages = Object.keys(langList).sort((a, b) => langList[a].localeCompare(langList[b]))

import { country } from './types'

async function getCountries() {
  try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries: country[] = await response.json();
      return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
}

function generateTimeslots() {
  const timeslots = []
  for (let hr = 7; hr < 21; hr++) {
    for (const min of [0,15,30,45]) {
      const hour = hr.toString().padStart(2, '0')
      const minute = min.toString().padStart(2, '0')
      const slot = `${hour}:${minute}`;
      timeslots.push(slot);
    }
  }
  return timeslots
}

const timeslots = generateTimeslots()

import $ from 'jquery'

function createDatePicker() {
  // Calculate start date (1 day from today)
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 1);

  // Calculate end date (3 months from today)
  const endDate = new Date(today);
  endDate.setMonth(today.getMonth() + 3);
  
  $('#datepicker').datepicker({
      format: 'dd-mm-yyyy', // Format of the date
      startDate: flipDayAndYear(startDate), // Start date
      endDate: flipDayAndYear(endDate),   // End date
      autoclose: true, // Close datepicker after selection
      todayHighlight: false, // Highlight today's date
      weekStart: 1, // Start the week on Monday
  });
}

function getMsgTime(timestamp: string) {
  const date = new Date(timestamp); // Parse the timestamp into a Date object
  const index = date.toLocaleTimeString()[0] == "0" ? 4 : 5 // 0 is not 00, so need to slice 1 character earlier
  return date.toLocaleTimeString().slice(0, index)
}

export {
  getLanguageName,
  langList,
  getUserAge,
  formatDate,
  flipDayAndYear,
  languages,
  getCountries,
  timeslots,
  createDatePicker,
  getMsgTime
}

/*
function getLanguageCode(langName: string) {
    for (let code in langList) {
      if (langList[code] == langName) return code;
    }
}
  
function getMsgDate(timestamp: string) {
    const date = new Date(timestamp); // Parse the timestamp into a Date object
    const day = date.getDate()
    const month = months[date.getMonth()]
    return day + " " + month
}
  
*/