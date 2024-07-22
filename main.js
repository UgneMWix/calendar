"use strict";
main();
function main() {
    let today = new Date();
    const todayConstant = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    const day = document.querySelector(".calendar");
    const currentDate = document.querySelector(".calendar-text");
    const arrowIcons = document.querySelectorAll(".calendar-buttons");
    const mainCalendarHeader = document.querySelector(".main-calendar-header");
    const timeLine = document.querySelector(".time-line");
    console.log(arrowIcons);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

    generateMiniCalendar(today, year, month, currentDate, day, months, weekDays);
    attachClickToArrows(arrowIcons, month, year, today, currentDate, day, months, weekDays);
    generateMainCalendarHeader(weekDays, mainCalendarHeader);
    generateWeekTitles(getWeek(new Date()));
    generateTimeLine(timeLine);
    generateWeekViewSquares();
    openCreationModal();
    closeCreationModal();
    saveEvent();
}
function generateMiniCalendar(today, year, month, currentDate, day, months, weekDays) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const lastDay = new Date(year, month, lastDate).getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    let data = '';
    for (let i = 0; i < weekDays.length; i++) {
        data += '<div class="day-name">' + weekDays[i][0] + '</div>';
    }
    for (let i = firstDay; i > 0; i--) {
        data += `<div class="other-day">${prevMonthLastDate - i + 1}</div>`;
    }
    for (let i = 1; i <= lastDate; i++) {
        const isToday = i === new Date().getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? 'current-day'
            : '';
        data += `<div class="day ${isToday}">${i}</div>`;
    }
    for (let i = lastDay; i < 6; i++) {
        data += `<div class="other-day">${i - lastDay + 1}</div>`;
    }
    currentDate.innerHTML = `${months[month]} ${year}`;
    day.innerHTML = data;
}

function attachClickToArrows(arrowIcons, month, year, today, currentDate, day, months, weekDays) {
    arrowIcons.forEach(arrow => {
        arrow.addEventListener('click', () => {
            month = arrow.id === 'arrow-prev' ? month - 1 : month + 1;
            console.log(arrow.classList.contains('calendar-arrow-1'));
            if (month < 0 || month > 11) {
                today = new Date(year, month, new Date().getDate());
                year = today.getFullYear();
                month = today.getMonth();
            }
            else {
                today = new Date();
            }
            console.log(month);
            generateMiniCalendar(today, year, month, currentDate, day, months, weekDays);
        });
    });
}
function generateMainCalendarHeader(weekDays, mainCalendarHeader) {
    let data = '';
    for (let i = 0; i < weekDays.length; i++) {
        if (i === weekDays.length - 1) {
            data += `
            <section class="main-calendar-day last-day">
                <p class="main-calendar-day-name"> ${weekDays[i].substring(0, 3)} </p>
                <p class="main-calendar-number" data-day="${i}"></p>
            </section>`;
            continue;
        }
        data += `
        <section class="main-calendar-day">
            <p class="main-calendar-day-name"> ${weekDays[i].substring(0, 3)} </p>
            <p class="main-calendar-number" data-day="${i}"></p>
        </section>`;
    }
    mainCalendarHeader.innerHTML = data;
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
        (week[i].getDate() == new Date().getDate())
            ? elem[i].classList.add('main-calendar-today')
            : '';
    }

}
function generateWeekViewSquares() {
    const gridCells = [];
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 24; j++) {
            const cell = document.createElement('div');
            cell.classList.add('calendar-square');
            gridCells.push(cell);
            cell.innerHTML = '';
        }
    }
    const container = document.getElementById('time-table');
    container.replaceChildren(...gridCells);
};
function generateTimeLine(timeLine) {
    let data = '';
    for (let i = 0; i < 24; i++) {
        const zero = i < 10 ? '0' : '';
        data += `
        <div class="calendar-time">
            <p class="label">${zero}${i}:00 </p>
        </div>`;
    }
    timeLine.innerHTML = data;
}
function openCreationModal() {
    const modal = document.querySelector('.modal');
    const button = document.querySelector('.event-button');
    const overlay = document.querySelector('.overlay');
    button.addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    });
}
function closeCreationModal() {
    const button = document.querySelector('.modal-close-button');
    button.addEventListener('click', () => {
        const dateInput = document.getElementById('date-input');
        dateInput.value = '';
        const startInput = document.getElementById('start-input');
        const endInput = document.getElementById('end-input');
        startInput.value = '';
        endInput.value = '';
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        document.querySelector('.input-field').value = '';
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        document.getElementById('title-alert').classList.add('hidden');
        document.getElementById('time-alert').classList.add('hidden');
    });
}
function saveEvent() {
    const button = document.querySelector('.modal-save-button');
    button.addEventListener('click', () => {
        if (!validateTitleInput() || !validateTimeInput()) {
            return;
        }
        const titleAlert = document.getElementById('title-alert');
        const timeAlert = document.getElementById('time-alert');
        titleAlert.classList.add('hidden');
        timeAlert.classList.add('hidden');
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
        const title = document.querySelector('.input-field');
        title.value = '';
        const dateInput = document.getElementById('date-input');
        dateInput.value = '';
        const startInput = document.getElementById('start-input');
        const endInput = document.getElementById('end-input');
        startInput.value = '';
        endInput.value = '';
    });
}
function validateTitleInput() {
    const title = document.querySelector('.input-field');
    if (title.value.length <= 0) {
        const alert = document.getElementById('title-alert');
        alert.classList.remove('hidden');
        return false;
    }
    return true;
}
function validateTimeInput() {
    const startInput = document.getElementById('start-input');
    const endInput = document.getElementById('end-input');
    const dateInput = document.getElementById('date-input');
    if (startInput.value === '' || endInput.value === '' || dateInput.value === '' || startInput.value >= endInput.value) {
        const alert = document.getElementById('time-alert');
        alert.classList.remove('hidden');
        return false;
    }
    return true;
}