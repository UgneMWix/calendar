function SideBar() {
  return (
    <>
      <aside>
        <button className="event-button">Create Event</button>
        <section className="calendar-base">
          <header className="calendar-header">
            <p className="calendar-text"></p>
            <section className="calendar-button-group">
              <button className="calendar-buttons" id="arrow-prev">
                <img src="public/arrow.png" alt="arrow back in calendar" className="calendar-arrow-1" />
              </button>
              <button className="calendar-buttons" id="arrow-next">
                <img src="public/arrow.png" alt="arrow forward in calendar" className="calendar-arrow-2" />
              </button>
            </section>
          </header>
          <div className="calendar"></div>
        </section>
      </aside>
    </>
  );
}
export default SideBar;
