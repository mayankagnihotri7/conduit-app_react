import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className="header padding">
      <div className="container">
        <nav className="flex">
          <Link className="logo-btn" to="/">
            Conduit
          </Link>
          <ul className="flex navigation">
            <NavLink activeClassName="active" to="/signIn">
              Sign In
            </NavLink>
            <NavLink activeClassName="active" to="/signUp">
              Sign Up
            </NavLink>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
