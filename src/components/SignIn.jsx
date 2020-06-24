import React from "react";

function SignIn() {
  return (
    <div class="container">
      <div class="register-border text-align">
        <h1 class="register-head">Register here</h1>
        <form action="">
          <div class="text-align">
            <input type="email" name="email" placeholder="Enter E-mail..." />
            <input
              type="password"
              name="password"
              placeholder="Enter desired password..."
            />
            <input type="submit" value="Sign In" />
          </div>
        </form>
        <div class="signed-in">
          <h3>
            Not registered.? <a href="#"> Register </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
