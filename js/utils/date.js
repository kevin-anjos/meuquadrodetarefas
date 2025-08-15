//Pegar data atual
export const getCurrentDate = () => {
    const date = new Date();

    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();

    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();

    return `${currentDay}/${currentMonth}/${currentYear} às ${currentHour}:${currentMinute}h`;
};