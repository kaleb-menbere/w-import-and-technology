import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container nav-shell">
        {/* Left logo */}
        <div className="cap left-cap">
          <img src="/images/ethio_telecom_logo.svg" alt="Ethio Telecom" />
        </div>

        {/* Center navigation */}
        <nav className="green-bar">
          <a className="active" href="#">Home</a>

          <div className="dropdown">
            <a href="#" className="dropbtn">Game Category ▾</a>
            <div className="dropdown-content">
              <a href="#">Action</a>
              <a href="#">Adventure</a>
              <a href="#">Arcade</a>
              <a href="#">Sports</a>
              <a href="#">Puzzle</a>
            </div>
          </div>

          <a href="#">My Account</a>
          <a className="toggle-lang" href="#" id="lang-toggle">En | አማርኛ</a>
        </nav>

        {/* Right logo */}
        <div className="cap right-cap">
          <img className="kidopia" src="/images/kidopia-logo.png" alt="KIDOPIA" />
        </div>
      </div>
    </header>
  );
}

export default Header;
