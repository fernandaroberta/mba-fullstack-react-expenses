const today = new Date();
const month = today.getMonth() + 1;
export const currentPeriod = `${today.getFullYear()}-${month
  .toString()
  .padStart(2, "0")}`;

console.log(today.getFullYear());

export const currentYear = today.getFullYear();
export const currentMonth = month.toString().padStart(2, "0");
