import React from "react";
import {Link} from 'react-router-dom';

function Header(props) {
  return (
    <header className="header padding">
      <div className="container">
        <nav className="flex">
          <button className="logo-btn" onClick={props.click}>
            Conduit
          </button>
          <ul className="flex navigation">
            {/* <button className="header-btn" onClick={props.click}>
              Home
            </button>
            <button className="header-btn">
              <li>Sign up</li>
            </button>
            <button className="header-btn">
              <li>Sign In</li>
            </button> */}
            <Link to="/">Home</Link>
            <Link to="/SignIn">Sign In</Link>
            <Link to="/SignUp">Sign Up</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
