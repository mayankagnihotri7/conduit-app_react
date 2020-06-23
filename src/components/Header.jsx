import React from "react";

function Header(props) {
  return (
    <header className="header padding">
      <div className="container">
        <nav className="flex">
          <a href="#" className="logo">
            <h2>Conduit</h2>
          </a>
          <ul className="flex navigation">
            <button className="header-btn" onClick={props.click}>
              Home
            </button>
            <button className="header-btn">
              <li>Sign up</li>
            </button>
            <button className="header-btn">
              <li>Sign In</li>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
