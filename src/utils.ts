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

function stylizeText(plainText: string) {
  switch(plainText) {
    case "private": return 'Private'
    case "group": return 'Group'
    case "beginner": return 'Beginner'
    case "intermediate": return 'Intermediate'
    case "advanced": return 'Advanced'
    case "online": return 'Online'
    case "at-student": return `At the student's home`
    case "at-teacher": return `At the teacher's home`
    default: return ''
  }
}

function getIcon(plainText: string) {
  switch(plainText) {
    case "private": return 'bi-person-fill'
    case "group": return 'bi-people-fill'
    case "beginner": return 'bi-mortarboard-fill'
    case "intermediate": return 'bi-mortarboard-fill'
    case "advanced": return 'bi-mortarboard-fill'
    case "online": return 'bi-wifi'
    case "at-student": return `bi-house-fill`
    case "at-teacher": return `bi-house-fill`
    default: return ''
  }
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

function drawStars(stars: number) {
  let string = ``
  for (let i= 1; i < stars+1; i++) {
    string += `&#9733;`
  }
  return string
}

// convert 'yyyy/mm/dd' dates to 'dd/mm/yyyy' format
function flipDayAndYear(date: Date) {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return day + '-' + month + '-' + year;
}

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

export {
  getLanguageName,
  langList,
  getUserAge,
  stylizeText,
  getIcon,
  formatDate,
  drawStars,
  flipDayAndYear,
  getCountries
}

/*
function getLanguageCode(langName: string) {
    for (let code in langList) {
      if (langList[code] == langName) return code;
    }
}
  
function getMsgTime(timestamp: string) {
    const date = new Date(timestamp); // Parse the timestamp into a Date object
    const index = date.toLocaleTimeString()[0] == "0" ? 4 : 5 // 0 is not 00, so need to slice 1 character earlier
    return date.toLocaleTimeString().slice(0, index)
}
  
function getMsgDate(timestamp: string) {
    const date = new Date(timestamp); // Parse the timestamp into a Date object
    const day = date.getDate()
    const month = months[date.getMonth()]
    return day + " " + month
}
  
*/