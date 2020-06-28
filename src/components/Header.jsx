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
            {props.isLoggedIn ? <AuthHeader /> : <NonAuthHeader/>}
          </ul>
        </nav>
      </div>
    </header>
  );
}

const NonAuthHeader = () => {
  return(<>
    <NavLink activeClassName="active" to="/signIn">
      Sign In
    </NavLink>
    <NavLink activeClassName="active" to="/signUp">
      Sign Up
    </NavLink>
  </>)
};

const AuthHeader = () => {

  return (<>
    <NavLink activeClassName="active" to="/signIn">
      Home
    </NavLink>
    <NavLink activeClassName="active" to="/create">
      Create Article
    </NavLink>
    <NavLink activeClassName="active" to="/signUp">
      Settings
    </NavLink>
    <NavLink activeClassName="active" to="/profile">
      Profile
    </NavLink>
  </>)
};

export default Header;
