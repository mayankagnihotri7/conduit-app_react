import React from "react";

function SignUp() {
  return (
    <div class="container">
      <div class="register-border text-align">
        <h1 class="register-head">Register here</h1>
        <form action="">
          <div class="text-align">
            <input
              type="text"
              name="username"
              placeholder="Enter username..."
            />
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
            Already registered.? <a href="#"> Sign In </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
