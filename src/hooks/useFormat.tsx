function useFormat() {
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

    function drawStars(stars: number) {
        return Array.from({ length: stars }, (_, i) => (
          <span key={i}>&#9733;</span> // Unicode for star
        ));
    }

    return { getUserAge, formatDate, flipDayAndYear, getMsgTime, getMsgDate, drawStars };
}

export default useFormat;