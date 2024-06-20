import dayjs from "dayjs";

export let calendarRowCount = 5;

export function getMonth(year: number, month: number) {
    const displayDate = dayjs(new Date(year, month, 1));
    const firstDayOfTheMonth = displayDate.day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const totalDayCount = displayDate.daysInMonth();
    const monthRowCount = (totalDayCount - (7 - firstDayOfTheMonth)) / 7;
    let rowCount = 5;
    if (monthRowCount == 3) {
        // When the FEB 1st starts Sunday
        rowCount = 4;
    } else if (monthRowCount > 4) {
        rowCount = 6;
    }

    calendarRowCount = rowCount;

    const daysMatrix = new Array(rowCount).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        });
    });
    return daysMatrix;
}
