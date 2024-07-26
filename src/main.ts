interface interfaceEvent {
    top: string;
    left: string;
    width: string;
    height: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}
enum CssVariable {
    Top = '--event-top',
    Left = '--event-left',
    Width = '--event-width',
    Height = '--event-height'
}
enum Selector {
    TimeTable = '#time-table',
    DateInput = '#date-input',
    StartInput = '#start-input',
    EndInput = '#end-input',
    InputField = '.input-field',
    TitleAlert = '#title-alert',
    TimeAlert = '#time-alert',
    Modal = '.modal',
    Overlay = '.overlay',
    TodayButton = '.today-button',
    EventButton = '.event-button',
    Calendar = '.calendar',
    CalendarText = '.calendar-text',
    MainCalendarHeader = '.main-calendar-header',
    TimeLine = '.time-line',
    CalendarButtons = '.calendar-buttons',
    ArrowPrev = '#arrow-prev',
    ArrowNext = '#arrow-next',
    CalendarSquare = 'calendar-square',
    CalendarTime = '.calendar-time',
    MainCalendarDay = 'main-calendar-day',
    MainCalendarDayName = 'main-calendar-day-name',
    MainCalendarNumber = 'main-calendar-number',
    LastDay = '.last-day',
    MainCalendarToday = 'main-calendar-today',
    Day = 'day',
    OtherDay = 'other-day',
    CurrentDay = 'current-day',
    ModalSaveButton = '.modal-save-button',
    ModalCloseButton = '.modal-close-button',
    Hidden = 'hidden',
    Event = '.event'
}


main();
function main() {
    const timeLine = getElementBySelector(Selector.TimeLine, HTMLElement);
    const mainCalendarHeader = getElementBySelector(Selector.MainCalendarHeader, HTMLElement);
    const day = getElementBySelector(Selector.Calendar, HTMLElement);
    const currentDate = getElementBySelector(Selector.CalendarText, HTMLElement);
    const arrowIcons = checkIfNull(document.querySelectorAll(Selector.CalendarButtons));

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
    // clearLocalStorage();
    clearServer();
}
function generateWeekViewSquares() {
    const gridCells = [];
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('div');
            cell.classList.add(Selector.CalendarSquare);
            cell.dataset.hour = i.toString();
            cell.dataset.day = j.toString();
            gridCells.push(cell);
        }
    }
    let container = getElementBySelector(Selector.TimeTable, HTMLElement);
    container.replaceChildren(...gridCells);
}
function generateTimeLine(timeLine: Element) {
    for (let i = 0; i < 24; i++) {
        const zero = i < 10 ? '0' : '';
        const cell = createHTMLElement('div', [Selector.CalendarTime], '');
        const paragraph = createHTMLElement('p', ['label'], `${zero}${i}:00`);
        cell.appendChild(paragraph);
        timeLine.appendChild(cell);
    }
}
function generateMainCalendarHeader(weekDays: Array<string>, mainCalendarHeader: Element) {
    for (let i = 0; i < weekDays.length; i++) {
        const cell = createHTMLElement('div', [Selector.MainCalendarDay], '');
        const paragraph = createHTMLElement('p', [Selector.MainCalendarDayName], weekDays[i].substring(0, 3));
        const number = document.createElement('p');
        number.classList.add(Selector.MainCalendarNumber);
        number.dataset.day = i.toString();
        cell.appendChild(paragraph);
        cell.appendChild(number);
        if (i === 0) {
            cell.classList.add(Selector.LastDay);
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
    let elem = document.querySelectorAll('.' + Selector.MainCalendarNumber);
    for (let i = 0; i < elem.length; i++) {
        elem[i].textContent = week[i].getDate().toString();
        (week[i].getDate() == new Date().getDate())
            ? elem[i].classList.add(Selector.MainCalendarToday)
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
        let cell = createHTMLElement('div', [Selector.Day], weekDays[i].substring(0, 1));
        day.appendChild(cell);
    }
    for (let i = firstDay; i > 0; i--) {
        let cell = createHTMLElement('div', [Selector.OtherDay], (prevMonthLastDate - i + 1).toString());
        day.appendChild(cell);
    }
    for (let i = 1; i <= lastDate; i++) {
        let cell = createHTMLElement('div', [Selector.Day], i.toString());
        if (i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            cell.classList.add(Selector.CurrentDay);
        }
        day.appendChild(cell);
    }
    for (let i = lastDay; i < 6; i++) {
        let cell = createHTMLElement('div', [Selector.OtherDay], (i - lastDay + 1).toString());
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
    const timeTable = getElementBySelector(Selector.TimeTable, HTMLElement);
    const modal = getElementBySelector(Selector.Modal, HTMLElement);
    const overlay = getElementBySelector(Selector.Overlay, HTMLElement);

    const button = getElementBySelector(Selector.ModalSaveButton, HTMLButtonElement);
    const closeButton = getElementBySelector(Selector.ModalCloseButton, HTMLButtonElement);

    timeTable.addEventListener('click', (e) => {
        modal.classList.remove(Selector.Hidden);
        overlay.classList.remove(Selector.Hidden);
        const dateInput = getElementBySelector(Selector.DateInput, HTMLInputElement);
        const startInput = getElementBySelector(Selector.StartInput, HTMLInputElement);
        const endInput = getElementBySelector(Selector.EndInput, HTMLInputElement);
        const timeString = ensureHtmlElement(e.target, HTMLElement).dataset.hour!.padStart(2, '0');
        const monthString = (week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getMonth() + 1).toString().padStart(2, '0');
        const dayString = week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getDate().toString().padStart(2, '0');
        dateInput.value = `${week[parseInt(ensureHtmlElement(e.target, HTMLElement).dataset.day!)].getFullYear()}-${monthString}-${dayString}`;
        startInput.value = `${timeString}:00`;
        endInput.value = `${timeString}:30`;

        button.addEventListener('click', onSaveHandler);
        closeButton.addEventListener('click', onCloseHandler);


    });
    const eventButton = getElementBySelector(Selector.EventButton, HTMLButtonElement);
    eventButton.addEventListener('click', (e) => {
        modal.classList.remove(Selector.Hidden);
        overlay.classList.remove(Selector.Hidden);
        button.addEventListener('click', onSaveHandler);
        closeButton.addEventListener('click', onCloseHandler);
    });
    async function onSaveHandler(e: Event) {
        if (!validateTitleInput() || !validateTimeInput()) {
            return;
        }

        await saveToServer(generateEvent(e.target!, weekDaysNumbers));
        // saveToLocalStorage();
        // saveToServer();
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
    const timeTable = getElementBySelector(Selector.TimeTable, HTMLElement);
    const dateInput = getElementBySelector(Selector.DateInput, HTMLInputElement);
    const startInput = getElementBySelector(Selector.StartInput, HTMLInputElement);
    const endInput = getElementBySelector(Selector.EndInput, HTMLInputElement);
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

    event.style.setProperty(CssVariable.Top, squareTop + 'px');
    event.style.setProperty(CssVariable.Left, squareLeft + 'px');
    event.style.setProperty(CssVariable.Width, rect['width'] + 'px');
    event.style.setProperty(CssVariable.Height, squareHeight + 'px');
    event.innerText = getElementBySelector(Selector.InputField, HTMLInputElement).value;
    timeTable.appendChild(event);
    // saveToServer(event);
    return event;
}
function validateTitleInput() {
    const title = document.querySelector(Selector.InputField) as HTMLInputElement;
    if (title?.value === '') {
        const alert = getElementBySelector(Selector.TitleAlert, HTMLElement);
        alert.classList.remove(Selector.Hidden);
        return false;
    }
    return true;
}
function validateTimeInput() {
    const startInput = getElementBySelector(Selector.StartInput, HTMLInputElement);
    const endInput = getElementBySelector(Selector.EndInput, HTMLInputElement);
    const dateInput = getElementBySelector(Selector.DateInput, HTMLInputElement);
    if (startInput.value === '' || endInput.value === '' || dateInput.value === '' || startInput.value >= endInput.value) {
        const alert = getElementBySelector(Selector.TimeAlert, HTMLElement);
        alert.classList.remove(Selector.Hidden);
        return false;
    }
    return true;
}
function saveToServer(event: HTMLElement) {
    // console.log(event);
    let instance: interfaceEvent = {
        top: (event as HTMLElement).style.getPropertyValue(CssVariable.Top),
        left: (event as HTMLElement).style.getPropertyValue(CssVariable.Left),
        width: (event as HTMLElement).style.getPropertyValue(CssVariable.Width),
        height: (event as HTMLElement).style.getPropertyValue(CssVariable.Height),
        title: event?.textContent ?? '', //add the event interface,
        date: getElementBySelector(Selector.DateInput, HTMLInputElement).value,
        startTime: getElementBySelector(Selector.StartInput, HTMLInputElement).value,
        endTime: getElementBySelector(Selector.EndInput, HTMLInputElement).value,
    };
    return fetch('http://localhost:3000/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(instance)
    });
}
function saveToLocalStorage() {
    clearLocalStorage();
    // clearServer();
    const events = document.querySelectorAll(Selector.Event);
    let eventArray: Array<{}> = [];
    events.forEach(event => {
        let instance = {
            top: (event as HTMLElement).style.getPropertyValue(CssVariable.Top),
            left: (event as HTMLElement).style.getPropertyValue(CssVariable.Left),
            width: (event as HTMLElement).style.getPropertyValue(CssVariable.Width),
            height: (event as HTMLElement).style.getPropertyValue(CssVariable.Height),
            title: event.textContent,
            date: getElementBySelector(Selector.DateInput, HTMLInputElement).value,
            startTime: getElementBySelector(Selector.StartInput, HTMLInputElement).value,
            endTime: getElementBySelector(Selector.EndInput, HTMLInputElement).value,
        };
        eventArray.push(instance);
    });
    console.log(eventArray);
    localStorage.setItem('events', JSON.stringify(eventArray));
}
function renderFromStorage() {
    // console.log(document.querySelectorAll('.event'));
    document.querySelectorAll('.event').forEach(event => event.remove());

    const eventsFetch = fetch('http://localhost:3000/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    const events = eventsFetch.then(response => response.json());
    console.log(events);
    events.then((events) => {
        if (events === null) {
            return;
        }
        events.forEach((event: interfaceEvent) => {
            const timeTable = getElementBySelector(Selector.TimeTable, HTMLElement);
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.style.setProperty(CssVariable.Top, event.top);
            eventElement.style.setProperty(CssVariable.Left, event.left);
            eventElement.style.setProperty(CssVariable.Width, event.width);
            eventElement.style.setProperty(CssVariable.Height, event.height);
            eventElement.innerText = event.title;
            timeTable.appendChild(eventElement);
        });
        // console.log(events);
    });
}
function clearLocalStorage() {
    const button = getElementBySelector(Selector.TodayButton, HTMLButtonElement);
    button.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}
function clearServer() {
    const button = getElementBySelector(Selector.TodayButton, HTMLButtonElement);
    button.addEventListener('click', async () => {
        await clearData();
        renderFromStorage();
    });
}
async function clearData() {
    const response = await fetch(`http://localhost:3000/events`);
    const entries = await response.json();
    for (let entry of entries) {
        await fetch(`http://localhost:3000/events/${entry.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
function resetAndCloseModal() {
    const dateInput = getElementBySelector(Selector.DateInput, HTMLInputElement);
    dateInput.value = '';
    const startInput = getElementBySelector(Selector.StartInput, HTMLInputElement);
    const endInput = getElementBySelector(Selector.EndInput, HTMLInputElement);
    startInput.value = '';
    endInput.value = '';
    const modal = getElementBySelector(Selector.Modal, HTMLElement);
    const overlay = getElementBySelector(Selector.Overlay, HTMLElement);
    getElementBySelector(Selector.InputField, HTMLInputElement).value = '';
    modal.classList.add(Selector.Hidden);
    overlay.classList.add(Selector.Hidden);
    getElementBySelector(Selector.TitleAlert, HTMLElement).classList.add(Selector.Hidden);
    getElementBySelector(Selector.TimeAlert, HTMLElement).classList.add(Selector.Hidden);
}