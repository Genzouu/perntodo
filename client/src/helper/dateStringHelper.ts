export const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getDayOfWeek(index: number, isSundayFirstDay?: boolean) {
   return daysOfWeek[isSundayFirstDay ? (index - 1 < 0 ? 6 : index - 1) : index];
}

export function getDateString(postgresDate: string): string[] {
   const dateSections = postgresDate.slice(0, 10).split("-"); // get each section
   return [dateSections[2], dateSections[1], dateSections[0]]; // returns ["DD", "MM", "YYYY"]
}

export function getFormattedDateString(str: string): string {
   const dateString = getDateString(str);
   let newDate = new Date(parseInt(dateString[2]), parseInt(dateString[1]) - 1, parseInt(dateString[0]));
   return getDayOfWeek(newDate.getDay(), true) + " - " + dateString.join(" ");
}
