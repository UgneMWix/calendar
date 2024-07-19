"use strict";
main();
function main() {
    generateWeekTitles(getWeek(new Date()));
    generateWeekViewSquares();
}
function getWeek(fromDate) {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
        , result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday));
    }
    return result;
}
function generateWeekTitles(week) {
    let elem = document.querySelectorAll('[data-day]');
    for (let i = 0; i < elem.length; i++) {
        elem[i].innerText = week[i].getDate();
    }
}
function generateWeekViewSquares() {
    const gridCells = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
            const cell = document.createElement('div');
            cell.classList.add('calendar-square');
            gridCells.push(cell);
        }
    }
    const container = document.getElementById('time-table');
    container.replaceChildren(...gridCells);
}