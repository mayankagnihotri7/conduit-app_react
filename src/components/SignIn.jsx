import React from "react";
import {Link} from 'react-router-dom';

function SignIn() {
  return (
    <div className="register-border text-align">
      <h1 className="register-head">Register here</h1>
      <div className="text-align">
        <form>
          {/* <div className="text-align"> */}
          <input type="email" name="email" placeholder="Enter E-mail..." />
          <input
            type="password"
            name="password"
            placeholder="Enter password..."
          />
          <input type="submit" value="Sign In" />
          {/* </div> */}
        </form>
      </div>
      <div className="signed-in">
        <h3>
          Not registered.? <Link to="signUp"> Sign Up </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignIn;
