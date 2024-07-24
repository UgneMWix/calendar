// @ts-nocheck
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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const week = getWeek(todayConstant);
    const weekDaysNumbers = getWeekDays(todayConstant);

    generateMiniCalendar(today, year, month, currentDate, day, months, weekDays);
    attachClickToArrows(arrowIcons, month, year, today, currentDate, day, months, weekDays);
    generateMainCalendarHeader(weekDays, mainCalendarHeader);
    generateWeekTitles(getWeek(new Date()));
    generateTimeLine(timeLine);
    generateWeekViewSquares();
    renderFromStorage();
    openCreationModal();
    closeCreationModal();
    openCreationModalFromCalendar(week, weekDaysNumbers);
    clearLocalStorage();
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
function getWeekDays(fromDate) {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
        , result = [new Date(sunday).getDate()];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday).getDate());
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
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.classList.add('calendar-square');
            cell.dataset.hour = i;
            cell.dataset.day = j;
            gridCells.push(cell);
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
function openCreationModalFromCalendar(week, weekDaysNumbers) {
    const timeTable = document.getElementById('time-table');
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    const button = document.querySelector('.modal-save-button');
    const closeButton = document.querySelector('.modal-close-button');

    timeTable.addEventListener('click', (e) => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        const dateInput = document.getElementById('date-input');
        const startInput = document.getElementById('start-input');
        const endInput = document.getElementById('end-input');
        const timeString = e.target.dataset.hour.padStart(2, '0');
        const monthString = (week[parseInt(e.target.dataset.day)].getMonth() + 1).toString().padStart(2, '0');
        const dayString = week[parseInt(e.target.dataset.day)].getDate().toString().padStart(2, '0');
        dateInput.value = `${week[parseInt(e.target.dataset.day)].getFullYear()}-${monthString}-${dayString}`;
        startInput.value = `${timeString}:00`;
        endInput.value = `${timeString}:30`;

        button.addEventListener('click', onSaveHandler);
        closeButton.addEventListener('click', onCloseHandler);

        function onSaveHandler() {
            if (!validateTitleInput() || !validateTimeInput()) {
                return;
            }

            generateEvent(e.target, weekDaysNumbers);
            saveToLocalStorage();
            renderFromStorage();
            resetAndCloseModal();
            cleanup();
        }

        function onCloseHandler() {
            console.log('close');
            resetAndCloseModal();
            cleanup();
        }

        function cleanup() {
            button.removeEventListener('click', onSaveHandler);
            closeButton.removeEventListener('click', onCloseHandler);
        }
    });
}
function generateEvent(eventTarget, weekDaysNumbers) {
    const timeTable = document.getElementById('time-table');
    const dateInput = document.getElementById('date-input');
    const startInput = document.getElementById('start-input');
    const endInput = document.getElementById('end-input');
    const event = document.createElement('div');
    event.classList.add('event');

    const square = document.querySelector(
        `[data-day="${weekDaysNumbers.indexOf(+(dateInput.value.split('-')[2]))}"][data-hour="${+(startInput.value.split(':')[0])}"]`);

    let rect = square.getBoundingClientRect();
    const squareHeight = rect['height'] * endInput.value.split(':')[1] / 60
        + rect['height'] * (endInput.value.split(':')[0] - startInput.value.split(':')[0])
        - rect['height'] * startInput.value.split(':')[1] / 60;

    const squareTop = rect['top'] + rect['height'] * startInput.value.split(':')[1] / 60;

    const squareLeft = rect['left'];

    event.style.setProperty('--event-top', squareTop + 'px');
    event.style.setProperty('--event-left', squareLeft + 'px');
    event.style.setProperty('--event-width', rect['width'] + 'px');
    event.style.setProperty('--event-height', squareHeight + 'px');
    event.innerText = document.querySelector('.input-field').value;
    timeTable.appendChild(event);
}

function resetAndCloseModal() {
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
}

function saveToLocalStorage() {
    const events = document.querySelectorAll('.event');
    let eventArray = [];
    let instance = {};
    events.forEach(event => {
        instance = {
            top: event.style.getPropertyValue('--event-top'),
            left: event.style.getPropertyValue('--event-left'),
            width: event.style.getPropertyValue('--event-width'),
            height: event.style.getPropertyValue('--event-height'),
            title: event.innerText,
            date: document.getElementById('date-input').value,
            startTime: document.getElementById('start-input').value,
            endTime: document.getElementById('end-input').value,
        };
        eventArray.push(instance);
    });
    localStorage.setItem('events', JSON.stringify(eventArray));
    const test = localStorage.getItem('events');
    console.log(test);
}
function renderFromStorage() {
    const events = JSON.parse(localStorage.getItem('events'));
    if (events === null) {
        return;
    }
    events.forEach(event => {
        const timeTable = document.getElementById('time-table');
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.style.setProperty('--event-top', event.top);
        eventElement.style.setProperty('--event-left', event.left);
        eventElement.style.setProperty('--event-width', event.width);
        eventElement.style.setProperty('--event-height', event.height);
        eventElement.innerText = event.title;
        timeTable.appendChild(eventElement);
    });
}
function clearLocalStorage() {
    const button = document.querySelector('.today-button');
    button.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}   