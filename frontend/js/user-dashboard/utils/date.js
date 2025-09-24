//Pegar data atual
export const getCurrentDate = () => {
    const date = new Date();

    const currentDay = String(date.getDate()).padStart(2, '0');
    const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
    const currentYear = date.getFullYear();

    const currentHour = String(date.getHours()).padStart(2, '0');
    const currentMinute = String(date.getMinutes()).padStart(2, '0');

    return `${currentDay}/${currentMonth}/${currentYear} às ${currentHour}:${currentMinute}h`;
};