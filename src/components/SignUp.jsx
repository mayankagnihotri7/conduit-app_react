import React from "react";
import {Link} from 'react-router-dom';

function SignUp() {
  return (
    <div class="register-border text-align">
      <h1 class="register-head">Register here</h1>
      <form action="">
        <div class="text-align">
          <input type="text" name="username" placeholder="Enter username..." />
          <input type="email" name="email" placeholder="Enter E-mail..." />
          <input
            type="password"
            name="password"
            placeholder="Enter desired password..."
          />
          <input type="submit" value="Sign Up" />
        </div>
      </form>
      <div class="signed-in">
        <h3>
          Already registered.? <Link to="signIn"> Sign In </Link>
        </h3>
      </div>
    </div>
  );
}

export default SignUp;
