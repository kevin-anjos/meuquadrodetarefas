export class Task {
    constructor ({ name, description, id }) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.isDone = false;
        this.creationDate = Task.getCurrentDate();
        this.finishedDate = undefined;
    };

    static getCurrentDate = () => {
        const date = new Date();

        const currentDay = String(date.getDate()).padStart(2, '0');
        const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
        const currentYear = date.getFullYear();

        const currentHour = String(date.getHours()).padStart(2, '0');
        const currentMinute = String(date.getMinutes()).padStart(2, '0');

        return `${currentDay}/${currentMonth}/${currentYear} às ${currentHour}:${currentMinute}h`;
    };
};