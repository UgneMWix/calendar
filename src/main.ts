interface Event {
    top: string;
    left: string;
    width: string;
    height: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}
main();
function main() {
    const timeLine = getElementBySelector(".time-line", HTMLElement);
    const mainCalendarHeader = getElementBySelector('.main-calendar-header', HTMLElement);
    const day = getElementBySelector(".calendar", HTMLElement);
    const currentDate = getElementBySelector(".calendar-text", HTMLElement);
    const arrowIcons = checkIfNull(document.querySelectorAll(".calendar-buttons"));

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let today = new Date();
    let todayConstant = new Date();
    const week = getWeek(todayConstant);
    const weekDaysNumbers = getWeekDays(todayConstant);
    let year = today.getFullYear();
    let month = today.getMonth();



    generateMainCalendarHeader(weekDays, mainCalendarHeader);
    generateTimeLine(timeLine);
    generateWeekViewSquares();
    generateWeekTitles(week);
    generateMiniCalendar(year, month, currentDate, day, months, weekDays);
    attachClickToArrows(arrowIcons, month, year, today, currentDate, day, months, weekDays);
    openCreationModal(week, weekDaysNumbers);
    renderFromStorage();
    clearLocalStorage();
}

function generateWeekViewSquares() {
    const gridCells = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.classList.add('calendar-square');
            cell.dataset.hour = i.toString();
            cell.dataset.day = j.toString();
            gridCells.push(cell);
        }
    }
    let container = getElementBySelector('#time-table', HTMLElement);
    container.replaceChildren(...gridCells);
}
function generateTimeLine(timeLine: Element) {
    for (let i = 0; i < 24; i++) {
        const zero = i < 10 ? '0' : '';
        const cell = createHTMLElement('div', ['calendar-time'], '');
        const paragraph = createHTMLElement('p', ['label'], `${zero}${i}:00`);
        cell.appendChild(paragraph);
        timeLine.appendChild(cell);
    }
}

function generateMainCalendarHeader(weekDays: Array<string>, mainCalendarHeader: Element) {
    for (let i = 0; i < weekDays.length; i++) {
        const cell = createHTMLElement('div', ['main-calendar-day'], '');
        const paragraph = createHTMLElement('p', ['main-calendar-day-name'], weekDays[i].substring(0, 3));
        const number = document.createElement('p');
        number.classList.add('main-calendar-number');
        number.dataset.day = i.toString();
        cell.appendChild(paragraph);
        cell.appendChild(number);
        if (i === 0) {
            cell.classList.add('last-day');
        }
        mainCalendarHeader.appendChild(cell);
    }
}
function getWeek(fromDate: Date) {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
        , result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday));
    }
    return result;
}
function getWeekDays(fromDate: Date) {
    const sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
        , result = [new Date(sunday).getDate()];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
        result.push(new Date(sunday).getDate());
    }
    return result;
}
function generateWeekTitles(week: Array<Date>) {
    let elem = document.querySelectorAll('.main-calendar-number');
    for (let i = 0; i < elem.length; i++) {
        elem[i].textContent = week[i].getDate().toString();
        (week[i].getDate() == new Date().getDate())
            ? elem[i].classList.add('main-calendar-today')
            : '';
    }
}
function generateMiniCalendar(year: number, month: number, currentDate: Element, day: Element, months: Array<string>, weekDays: Array<string>) {
    day.replaceChildren();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const lastDay = new Date(year, month, lastDate).getDay();
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    currentDate.innerHTML = `${months[month]} ${year}`;
    for (let i = 0; i < weekDays.length; i++) {
        let cell = createHTMLElement('div', ['day'], weekDays[i].substring(0, 1));
        day.appendChild(cell);
    }
    for (let i = firstDay; i > 0; i--) {
        let cell = createHTMLElement('div', ['other-day'], (prevMonthLastDate - i + 1).toString());
        day.appendChild(cell);
    }
    for (let i = 1; i <= lastDate; i++) {
        let cell = createHTMLElement('div', ['day'], i.toString());
        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            cell.classList.add('current-day');
        }
        day.appendChild(cell);
    }
    for (let i = lastDay; i < 6; i++) {
        let cell = createHTMLElement('div', ['other-day'], (i - lastDay + 1).toString());
        day.appendChild(cell);
    }
}
function attachClickToArrows(arrowIcons: NodeListOf<Element>, month: number, year: number, today: Date, currentDate: Element, day: Element, months: Array<string>, weekDays: Array<string>) {
    arrowIcons.forEach(arrow => {
        arrow.addEventListener('click', () => {
            month = arrow.id === 'arrow-prev' ? month - 1 : month + 1;
            if (month < 0 || month > 11) {
                today = new Date(year, month, new Date().getDate());
                year = today.getFullYear();
                month = today.getMonth();
            }
            else {
                today = new Date();
            }
            generateMiniCalendar(year, month, currentDate, day, months, weekDays);
        });
    });
}
function openCreationModal(week: Array<Date>, weekDaysNumbers: Array<number>) {
    const timeTable = getElementBySelector('#time-table', HTMLElement);
    const modal = getElementBySelector('.modal', HTMLElement);
    const overlay = getElementBySelector('.overlay', HTMLElement);

    const button = getElementBySelector('.modal-save-button', HTMLButtonElement);
    const closeButton = getElementBySelector('.modal-close-button', HTMLButtonElement);

    timeTable.addEventListener('click', (e) => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        const dateInput = getElementBySelector('#date-input', HTMLInputElement);
        const startInput = getElementBySelector('#start-input', HTMLInputElement);
        const endInput = getElementBySelector('#end-input', HTMLInputElement);
        const timeString = ensureHtmlElement(e.target, HTMLElement).dataset.hour!.padStart(2, '0');
        const monthString = (week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getMonth() + 1).toString().padStart(2, '0');
        const dayString = week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getDate().toString().padStart(2, '0');
        dateInput.value = `${week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getFullYear()}-${monthString}-${dayString}`;
        startInput.value = `${timeString}:00`;
        endInput.value = `${timeString}:30`;

        button.addEventListener('click', onSaveHandler);
        closeButton.addEventListener('click', onCloseHandler);


    });
    const eventButton = getElementBySelector('.event-button', HTMLButtonElement);
    eventButton.addEventListener('click', (e) => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        button.addEventListener('click', onSaveHandler);
        closeButton.addEventListener('click', onCloseHandler);
    });
    function onSaveHandler(e: Event) {
        if (!validateTitleInput() || !validateTimeInput()) {
            return;
        }

        generateEvent(e.target!, weekDaysNumbers);
        saveToLocalStorage();
        renderFromStorage();
        resetAndCloseModal();
        cleanup();
    }

    function onCloseHandler() {
        resetAndCloseModal();
        cleanup();
    }

    function cleanup() {
        button.removeEventListener('click', onSaveHandler);
        closeButton.removeEventListener('click', onCloseHandler);
    }
}
function createHTMLElement(tag: string, classNames: Array<string>, textContent: string): Element {
    const element = document.createElement(tag);
    element.classList.add(...classNames);
    element.textContent = textContent;
    return element;
}

function checkIfNull<T>(value: T | null): T {
    if (value === null) {
        throw new Error('Value is null');
    }
    return value;
}
function getElementBySelector<T extends typeof HTMLElement>(selector: string, elementDefinition: T): InstanceType<T> {
    const element = document.querySelector(selector);
    if (element === null || element === undefined) {
        throw new Error(`Element with ${selector} not found`);
    }

    return ensureHtmlElement(element, elementDefinition);
}
function ensureHtmlElement<T extends typeof HTMLElement>(element: unknown, elementDefinition: T): InstanceType<T> {
    if (!(element instanceof elementDefinition)) {
        throw new Error('Element is not of the correct type');
    }

    return element as InstanceType<typeof elementDefinition>;
}

function generateEvent(eventTarget: EventTarget, weekDaysNumbers: Array<number>) {
    const timeTable = getElementBySelector('#time-table', HTMLElement);
    const dateInput = getElementBySelector('#date-input', HTMLInputElement);
    const startInput = getElementBySelector('#start-input', HTMLInputElement);
    const endInput = getElementBySelector('#end-input', HTMLInputElement);
    const event = document.createElement('div');
    event.classList.add('event');
    const square = getElementBySelector(
        `[data-day="${weekDaysNumbers.indexOf(+(dateInput.value!.split('-')[2]))}"][data-hour="${+(startInput.value!.split(':')[0])}"]`,
        HTMLElement
    );

    let rect = square.getBoundingClientRect();
    const squareHeight = rect['height'] * parseInt(endInput.value!.split(':')[1]) / 60
        + rect['height'] * (parseInt(endInput.value!.split(':')[0]) - parseInt(startInput.value!.split(':')[0]))
        - rect['height'] * parseInt(startInput.value!.split(':')[1]) / 60;

    const squareTop = rect['top'] + rect['height'] * parseInt(startInput.value!.split(':')[1]) / 60;

    const squareLeft = rect['left'];

    event.style.setProperty('--event-top', squareTop + 'px');
    event.style.setProperty('--event-left', squareLeft + 'px');
    event.style.setProperty('--event-width', rect['width'] + 'px');
    event.style.setProperty('--event-height', squareHeight + 'px');
    event.innerText = getElementBySelector('.input-field', HTMLInputElement).value;
    timeTable.appendChild(event);
}
function validateTitleInput() {
    const title = document.querySelector('.input-field') as HTMLInputElement;
    if (title?.value === '') {
        const alert = getElementBySelector('#title-alert', HTMLElement);
        alert.classList.remove('hidden');
        return false;
    }
    return true;
}
function validateTimeInput() {
    const startInput = getElementBySelector('#start-input', HTMLInputElement);
    const endInput = getElementBySelector('#end-input', HTMLInputElement);
    const dateInput = getElementBySelector('#date-input', HTMLInputElement);
    if (startInput.value === '' || endInput.value === '' || dateInput.value === '' || startInput.value >= endInput.value) {
        const alert = getElementBySelector('#time-alert', HTMLElement);
        alert.classList.remove('hidden');
        return false;
    }
    return true;
}
function saveToLocalStorage() {
    clearLocalStorage();
    const events = document.querySelectorAll('.event');
    let eventArray: Array<{}> = [];
    events.forEach(event => {
        let instance = {
            top: (event as HTMLElement).style.getPropertyValue('--event-top'),
            left: (event as HTMLElement).style.getPropertyValue('--event-left'),
            width: (event as HTMLElement).style.getPropertyValue('--event-width'),
            height: (event as HTMLElement).style.getPropertyValue('--event-height'),
            title: event.textContent,
            date: getElementBySelector('#date-input', HTMLInputElement).value,
            startTime: getElementBySelector('#start-input', HTMLInputElement).value,
            endTime: getElementBySelector('#end-input', HTMLInputElement).value,
        };
        eventArray.push(instance);
    });
    console.log(eventArray);
    localStorage.setItem('events', JSON.stringify(eventArray));
}
function renderFromStorage() {
    document.querySelectorAll('.event').forEach(event => event.remove());

    const events = JSON.parse(localStorage.getItem('events') ?? 'null');
    if (events === null) {
        return;
    }
    events.forEach((event: Event) => {
        const timeTable = getElementBySelector('#time-table', HTMLElement);
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
    const button = getElementBySelector('.today-button', HTMLButtonElement);
    button.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}

function resetAndCloseModal() {
    const dateInput = getElementBySelector('#date-input', HTMLInputElement);
    dateInput.value = '';
    const startInput = getElementBySelector('#start-input', HTMLInputElement);
    const endInput = getElementBySelector('#end-input', HTMLInputElement);
    startInput.value = '';
    endInput.value = '';
    const modal = getElementBySelector('.modal', HTMLElement);
    const overlay = getElementBySelector('.overlay', HTMLElement);
    getElementBySelector('.input-field', HTMLInputElement).value = '';
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    getElementBySelector('#title-alert', HTMLElement).classList.add('hidden');
    getElementBySelector('#time-alert', HTMLElement).classList.add('hidden');
}