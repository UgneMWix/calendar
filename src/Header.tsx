function Header() {
  return (
    <>
      <header className="page-header">
        <button className="header-buttons">
          <img src="public/menu-dashes.png" className="menu-button-image" />
        </button>
        <span className="header-title">Calendar</span>
        <button className="today-button"> Clear</button>
        <button className="header-buttons">
          <img src="public/arrow.png" alt="arrow to the left" className="arrow-image-1" />
        </button>
        <button className="header-buttons">
          <img src="public/arrow.png" alt="arrow to the right" className="arrow-image-2" />
        </button>
        <span className="mon-year-text">May 2024</span>
        <button className="week-menu-button">Week ▾</button>
      </header>
    </>
  );
}
export default Header;
